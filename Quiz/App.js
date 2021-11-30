import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./components/HomeScreen"
import TestScreen1 from "./components/TestScreen1"
import TestScreen2 from "./components/TestScreen2"
import TestScreen3 from "./components/TestScreen3"
import ResultsScreen from "./components/ResultsScreen"


const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen}/>
                <Drawer.Screen name="Results" component={ResultsScreen}/>
                <Drawer.Screen name="Test1" component={TestScreen1}/>
                <Drawer.Screen name="Test2" component={TestScreen2}/>
                <Drawer.Screen name="Test3" component={TestScreen3}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}