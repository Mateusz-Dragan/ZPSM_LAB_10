import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

export default function TestScreen1({navigation}) {
    return (
        <View style={styles.container}>
            <View style={{paddingVertical: 50, flexDirection: "row", justifyContent: 'space-around'}}>
                <Text style={styles.text}> Question 1 of 10</Text>
                <Text style={styles.text}> Time: 60 sec</Text>
            </View>
            <View style={styles.questionContainer}>
                <Text style={styles.text}>What is your name?</Text>
            </View>
            <View style={{paddingVertical:75}}>
            <View style={styles.buttonRowContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Mateusz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Paweł</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRowContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Leon</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Dragan</Text>
                </TouchableOpacity>
            </View>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {flex: 1},
    questionContainer: {alignItems: 'center'},
    buttonRowContainer: {alignItems: 'center', flexDirection: "row", paddingVertical:25, justifyContent:"space-evenly"},
    button:{borderWidth: 2, width:125, height: 50,borderRadius: 6,alignItems:"center", justifyContent:"center"},
    text: {fontSize: 20, color: 'black'},

});