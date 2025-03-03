from flask import Flask, Response, jsonify, request
import cv2
import mediapipe as mp
import numpy as np
import tensorflow as tf
import time
import pickle
from collections import deque
import threading

app = Flask(__name__)

model = tf.keras.models.load_model("english_lstm_model.keras")

with open("english_label_encoder.pickle", "rb") as f:
    label_encoder = pickle.load(f)

labels_dict = {i: label for i, label in enumerate(label_encoder.classes_)}

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

frame_sequence = deque(maxlen=10)
last_recognized_char = ("", 0.0)
last_update_time = time.time()

def generate_frames():
    cap = cv2.VideoCapture(0) 
    try:
        while True:
            data_aux = []
            x_, y_ = [], []
            ret, frame = cap.read()
            if not ret:
                break

            H, W, _ = frame.shape
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(frame_rgb)

            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                    for i in range(len(hand_landmarks.landmark)):
                        x = hand_landmarks.landmark[i].x
                        y = hand_landmarks.landmark[i].y
                        x_.append(x)
                        y_.append(y)

                    for i in range(len(hand_landmarks.landmark)):
                        x = hand_landmarks.landmark[i].x
                        y = hand_landmarks.landmark[i].y
                        data_aux.append(x - min(x_))
                        data_aux.append(y - min(y_))

                frame_sequence.append(data_aux)

                if len(data_aux) > 0:
                    data_aux = data_aux[:84] + [0.0] * max(0, 84 - len(data_aux))
                    input_data = np.array(data_aux, dtype=np.float32).reshape(1, 1, 84)

                    prediction = model.predict(input_data)
                    predicted_label = np.argmax(prediction)
                    predicted_character = labels_dict[predicted_label]
                    accuracy = round(float(np.max(prediction)) * 100, 2)

                    global last_recognized_char, last_update_time
                    if time.time() - last_update_time >= 5:  # Update every 5 sec
                        last_recognized_char = (predicted_character, accuracy)
                        last_update_time = time.time()

            cv2.putText(frame, f"Gesture: {last_recognized_char[0]} ({last_recognized_char[1]}%)",
                        (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2, cv2.LINE_AA)

            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    finally:
        cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/recognized_gesture')
def recognized_gesture():
    return jsonify({"gesture": last_recognized_char[0], "accuracy": last_recognized_char[1]})


@app.route('/test_gesture-english', methods=['POST'])
def test_gesture():
    """Starts a 10-second gesture recognition test and returns accuracy & correctness."""
    data = request.get_json()
    target_letter = data.get("letter")  

    if not target_letter:
        return jsonify({"error": "No letter provided"}), 400

    cap = cv2.VideoCapture(0)
    start_time = time.time()
    end_time = start_time + 10  
    detected_gestures = []
    
    while time.time() < end_time:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)
        
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                data_aux = []
                x_, y_ = [], []
                
                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    x_.append(x)
                    y_.append(y)
                
                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    data_aux.append(x - min(x_))
                    data_aux.append(y - min(y_))

                if len(data_aux) > 0:
                    data_aux = data_aux[:84] + [0.0] * max(0, 84 - len(data_aux))
                    input_data = np.array(data_aux, dtype=np.float32).reshape(1, 1, 84)

                    prediction = model.predict(input_data)
                    predicted_label = np.argmax(prediction)
                    predicted_character = labels_dict[predicted_label]
                    detected_gestures.append(predicted_character)

    cap.release()

    if not detected_gestures:
        return jsonify({"error": "No gesture detected"}), 400

    most_common_gesture = max(set(detected_gestures), key=detected_gestures.count)
    accuracy = (detected_gestures.count(most_common_gesture) / len(detected_gestures)) * 100

    result = {
        "expected": target_letter,
        "recognized": most_common_gesture,
        "accuracy": round(accuracy, 2),
        "status": "Correct" if most_common_gesture.lower() == target_letter.lower() else "Incorrect"
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(host="192.168.1.117", port=5001, debug=False)
