import * as React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./components/HomeScreen"
import TestScreen1 from "./components/TestScreen1"
import TestScreen2 from "./components/TestScreen2"
import TestScreen3 from "./components/TestScreen3"
import ResultsScreen from "./components/ResultsScreen"
import {useState} from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {black} from "react-native-paper/lib/typescript/styles/colors";


const Drawer = createDrawerNavigator();

export default function Navigation() {
    const[showComponent, setShowComponent] = useState(true);
    function WelcomeScreen(){
        const [name, setName] = useState('');




        const setData = async () => {
            if (name.length == 0) {
                Alert.alert('Warning!', 'Please write a name.')
            } else {
                try {
                    var user = {
                        Name: name
                    }
                    await AsyncStorage.setItem('UserData', JSON.stringify(user));
                    setShowComponent(false);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return (
            <View style={styles.container}>
                <Text style={{fontSize:40, color:'black'}}>Welcome!!!!!!!!!!</Text>
                <TextInput style={styles.input} placeholder={"Put in your name"} onChangeText={(value)=>setName(value)}/>

                <Button style={styles.buttonContainer}
                        onPress={setData}
                        title="Enter"
                />
            </View>
        );
    }


    return (
        <View style={{flex:1}}>
            {showComponent ? <WelcomeScreen/>:<NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" >
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Results" component={ResultsScreen}/>
                    <Drawer.Screen name="Test1" component={TestScreen1}/>
                    <Drawer.Screen name="Test2" component={TestScreen2}/>
                    <Drawer.Screen name="Test3" component={TestScreen3}/>

                </Drawer.Navigator>
            </NavigationContainer>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, paddingVertical: 50, justifyContent: "space-around", alignItems: 'center'},
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    }
})