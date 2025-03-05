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
import ProgressReportScreen from "./src/screens/ProgressScreenFolder/ProgressReportScreen";
import Manage from "./src/screens/Educator/Manage";
import EnglishAnimations from "./src/screens/LessonScreenFolder/EnglishAnimations";
import CountingAnimations from "./src/screens/LessonScreenFolder/CountingAnimations";
import SectionScreen from "./src/screens/Educator/SectionScreen";
import StudentsScreen from "./src/screens/Educator/StudentsScreen";

import TestScreen from "./src/screens/TestScreenFolder/TestScreen";
import EnglishTestScreen from "./src/screens/TestScreenFolder/englishTest/EnglishTestScreen";
import FreeFallEnglishScreen from "./src/screens/TestScreenFolder/englishTest/FreeFallEnglishScreen";
import AlphabetTestScreen from "./src/screens/TestScreenFolder/englishTest/AlphabetTestScreen";
import LetterPracticeScreen from "./src/screens/TestScreenFolder/englishTest/LetterPracticeScreen";

import AlifbeTestScreen from "./src/screens/TestScreenFolder/urduTest/AlifbeTestScreen";
import FreeFallUrduScreen from "./src/screens/TestScreenFolder/urduTest/FreeFallUrduScreen";
import HurfPracticeScreen from "./src/screens/TestScreenFolder/urduTest/HurfPracticeScreen";
import UrduTestScreen from "./src/screens/TestScreenFolder/urduTest/UrduTestScreen";

import CoutingTestScreen from "./src/screens/TestScreenFolder/coutintTest/CoutingTestScreen";
import FreeFallCountingScreen from "./src/screens/TestScreenFolder/coutintTest/FreeFallCountingScreen";
import NumberPracticeScreen from "./src/screens/TestScreenFolder/coutintTest/NumberPracticeScreen";
import NumberTestScreen from "./src/screens/TestScreenFolder/coutintTest/NumberTestScreen";

import CountingReportScreen from "./src/screens/ProgressScreenFolder/CountingReportScreen";
import EnglishReportScreen from "./src/screens/ProgressScreenFolder/EnglishReportScreen";
import UrduReportScreen from "./src/screens/ProgressScreenFolder/UrduReportScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFFFFF",
            height: 50,
          },
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => null,
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

        <Stack.Screen name="EnglishAnimations" component={EnglishAnimations} />
        <Stack.Screen
          name="CountingAnimations"
          component={CountingAnimations}
        />

        <Stack.Screen name="Manage" component={Manage} />
        <Stack.Screen name="SectionScreen" component={SectionScreen} />
        <Stack.Screen name="StudentsScreen" component={StudentsScreen} />
        <Stack.Screen name="EnglishTest" component={EnglishTestScreen} />
        <Stack.Screen
          name="FreeFallEnglish"
          component={FreeFallEnglishScreen}
        />
        <Stack.Screen
          name="AlphabetTestScreen"
          component={AlphabetTestScreen}
        />
        <Stack.Screen
          name="LetterPracticeScreen"
          component={LetterPracticeScreen}
        />

        <Stack.Screen name="AlifbeTestScreen" component={AlifbeTestScreen} />
        <Stack.Screen
          name="FreeFallUrduScreen"
          component={FreeFallUrduScreen}
        />
        <Stack.Screen
          name="HurfPracticeScreen"
          component={HurfPracticeScreen}
        />
        <Stack.Screen name="UrduTestScreen" component={UrduTestScreen} />

        <Stack.Screen name="CoutingTestScreen" component={CoutingTestScreen} />
        <Stack.Screen
          name="FreeFallCountingScreen"
          component={FreeFallCountingScreen}
        />
        <Stack.Screen
          name="NumberPracticeScreen"
          component={NumberPracticeScreen}
        />
        <Stack.Screen name="NumberTestScreen" component={NumberTestScreen} />

        <Stack.Screen
          name="CountingReportScreen"
          component={CountingReportScreen}
        />
        <Stack.Screen
          name="EnglishReportScreen"
          component={EnglishReportScreen}
        />
        <Stack.Screen name="UrduReportScreen" component={UrduReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
