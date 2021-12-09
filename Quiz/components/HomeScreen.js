import * as React from 'react';
import {StyleSheet, TouchableOpacity, Button, View, ScrollView, Text, SafeAreaView, Alert} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen({ navigation }) {
    const [name, setName] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = () =>{
        try{
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        setName(user.Name);
                    }
                })
        }
        catch (error) {
            console.log(error);
        }
    }


    return (

        <View style={styles.container}>
            <Text style={{fontSize:30, color:'black'}}> Welcome to the quiz {name}</Text>
            <TouchableOpacity style={styles.testContainer} onPress={() => navigation.navigate('Test1')}>
                <Text style={styles.testTitle}>Title test #1</Text>
                <Text style={styles.testDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.testContainer} onPress={() => navigation.navigate('Test2')}>
                <Text style={styles.testTitle}>Title test #2</Text>
                <Text style={styles.testDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.testContainer} onPress={() => navigation.navigate('Test3')}>
                <Text style={styles.testTitle}>Title test #3</Text>
                <Text style={styles.testDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            </TouchableOpacity>

            <View>
            <Button style={styles.buttonContainer}
                onPress={() => navigation.navigate('Results')}
                title="Go to results"
            />
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {flex: 1, paddingVertical: 50, justifyContent: "space-between", alignItems: 'center'},
    testContainer:{flex: 0.3, borderColor: 'black',paddingVertical: 10, borderWidth: 3,width: 250, height:100,justifyContent: "space-between",},
    buttonContainer:{},
    testTitle:{fontSize:20,color:'black'},
    testDescription:{fontSize:15, color:'black'}
})