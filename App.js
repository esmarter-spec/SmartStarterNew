// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ChildInfoScreen from './screens/ChildInfoScreen'; // 👈 add child info
import Category1Screen from './screens/Category1Screen';
import Category2Screen from './screens/Category2Screen';
import Category3Screen from './screens/Category3Screen';
import Category4Screen from './screens/Category4Screen';
import AlphabetsScreen from './screens/AlphabetsScreen';
import NumbersScreen from './screens/NumbersScreen';
import SettingScreen from './screens/SettingScreen';
import KidsPScreen from './screens/KidsPScreen';
import AnimalsScreen from './screens/AnimalsScreen';
import ShapesScreen from './screens/ShapesScreen';
import AboutUsAScreen from './screens/AboutUsAScreen';
import LearnScreenA from './screens/LearnScreenA';
import LearnScreenN from './screens/LearnScreenN';
import LearnScreenAn from './screens/LearnScreenAn';
import LearnScreenS from './screens/LearnScreenS';
import PlayScreenA from './screens/PlayScreenA';
import AddCategoryScreen from './screens/AddCategoryScreen';
import CategoryAdd from './screens/CategoryAdd';
import AddFlashcardsScreen from './screens/AddFlashcardsScreen';
import FlashcardsAdd from './screens/FlashcardsAdd';
import SettingsP from './screens/SettingsP';
import ProfileScreen from './screens/ProfileScreen';
import EditProfile from './screens/EditProfile';
import AboutusP from './screens/AboutusP';
import PlayScreenN from './screens/PlayScreenN';
import PlayScreenAn from './screens/PlayScreenAn';
import PlayScreenS from './screens/PlayScreenS';
import ForgotP from './screens/ForgotP';
import AdminScreen from './screens/AdminScreen';





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Start screen */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* Signup screen */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Login screen */}
        <Stack.Screen name="Login" component={LoginScreen} />


        {/* Child Info screen */}
        <Stack.Screen name="ChildInfo" component={ChildInfoScreen} />
        
        {/* Category 1 screen */}
        <Stack.Screen name="Category1" component={Category1Screen} />
        <Stack.Screen name="Category2" component={Category2Screen} />
        <Stack.Screen name="Category3" component={Category3Screen} />
        <Stack.Screen name="Category4" component={Category4Screen} />
        <Stack.Screen name="Alphabets" component={AlphabetsScreen} />
        <Stack.Screen name="Learn" component={LearnScreenA} />
        <Stack.Screen name="Numbers" component={NumbersScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="KidsP" component={KidsPScreen} />
        <Stack.Screen name="Animals" component={AnimalsScreen} />
        <Stack.Screen name="Shapes" component={ShapesScreen} />
        <Stack.Screen name="AboutUsA" component={AboutUsAScreen} />
        <Stack.Screen name="NumberScreen" component={LearnScreenN} />
        <Stack.Screen name="AnimalsScreen" component={LearnScreenAn} />
        <Stack.Screen name="ShapesScreen" component={LearnScreenS} />
        <Stack.Screen name="PlayA" component={PlayScreenA} />
        <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
        <Stack.Screen name="CategoryAdd" component={CategoryAdd} />
        <Stack.Screen name="AddFlashcards" component={AddFlashcardsScreen} />
        <Stack.Screen name="FlashcardsAdd" component={FlashcardsAdd} />
        <Stack.Screen name="SettingsP" component={SettingsP} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AboutusP" component={AboutusP} />
        <Stack.Screen name="PlayN" component={PlayScreenN} />
        <Stack.Screen name="PlayAn" component={PlayScreenAn} />
        <Stack.Screen name="PlayS" component={PlayScreenS} />
        <Stack.Screen name="ForgotP" component={ForgotP} />
        <Stack.Screen name="AdminDashboard" component={AdminScreen} />

        
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
