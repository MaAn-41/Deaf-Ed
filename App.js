import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import StudentDashboard from "./src/screens/Student/StudentDashboard";
import EducatorDashboard from "./src/screens/Educator/EducatorDashboard";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import LessonScreen from "./src/screens/LessonScreenFolder/LessonScreen";
import EnglishLessonScreen from "./src/screens/LessonScreenFolder/EnglishLessonScreen";
import CountingLessonScreen from "./src/screens/LessonScreenFolder/CountingLessonScreen";
import UrduLessonScreen from "./src/screens/LessonScreenFolder/UrduLessonScreen";
import FoundationalWordsScreen from "./src/screens/LessonScreenFolder/FoundationalWordsScreen";
import TestScreen from "./src/screens/TestScreenFolder/TestScreen";
import ProgressReportScreen from "./src/screens/ProgressScreenFolder/ProgressReportScreen";
import ManageStudentScreen from "./src/screens/Educator/ManageStudent";
import AddStudentScreen from "./src/screens/Educator/AddStudentScreen";
import RemoveStudentScreen from "./src/screens/Educator/RemoveStudentScreen";
import ViewStudentsScreen from "./src/screens/Educator/ViewStudentsScreen";
import EnglishAnimations from "./src/screens/LessonScreenFolder/EnglishAnimations";
import CountingAnimations from "./src/screens/LessonScreenFolder/CountingAnimations";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="EducatorDashboard" component={EducatorDashboard} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="LessonScreen" component={LessonScreen} />
        <Stack.Screen
          name="EnglishLessonScreen"
          component={EnglishLessonScreen}
        />
        <Stack.Screen
          name="CountingLessonScreen"
          component={CountingLessonScreen}
        />
        <Stack.Screen name="UrduLessonScreen" component={UrduLessonScreen} />
        <Stack.Screen
          name="FoundationalWordsScreen"
          component={FoundationalWordsScreen}
        />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen
          name="ProgressReportScreen"
          component={ProgressReportScreen}
        />
        <Stack.Screen
          name="ManageStudentScreen"
          component={ManageStudentScreen}
        />
        <Stack.Screen name="AddStudentScreen" component={AddStudentScreen} />
        <Stack.Screen
          name="RemoveStudentScreen"
          component={RemoveStudentScreen}
        />
        <Stack.Screen
          name="ViewStudentsScreen"
          component={ViewStudentsScreen}
        />
        <Stack.Screen name="EnglishAnimations" component={EnglishAnimations} />
        <Stack.Screen
          name="CountingAnimations"
          component={CountingAnimations}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
