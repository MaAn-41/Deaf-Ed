import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen'; // Ensure this is correct and consistent
import StudentDashboard from './src/screens/StudentDashboard';
import EducatorDashboard from './src/screens/EducatorDashboard';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'; // Import ForgotPasswordScreen
import LessonScreen from './src/screens/LessonScreen';
import EnglishLessonScreen from './src/screens/EnglishLessonScreen';
import CountingLessonScreen from './src/screens/CountingLessonScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="EducatorDashboard" component={EducatorDashboard} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="LessonScreen" component={LessonScreen} />
        <Stack.Screen name="EnglishLessonScreen" component={EnglishLessonScreen} />
        <Stack.Screen name="CountingLessonScreen" component={CountingLessonScreen} />


        </Stack.Navigator>
    </NavigationContainer>
  );
}
