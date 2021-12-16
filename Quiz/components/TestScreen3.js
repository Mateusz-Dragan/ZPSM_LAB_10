import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Button} from 'react-native';
import {useState} from "react";

const d = {
    "tags": ["tv", "tasiemiec", "serial"],
    "tasks": [{
        "question": "Kiedy okazało się, że Massimo jest ojcem Ridgea?",
        "answers": [{
            "content": "podczas choroby Steffy, kiedy potrzebowała nerki",
            "isCorrect": false
        }, {
            "content": "podczas wyjazdu do Portofino",
            "isCorrect": false
        }, {
            "content": "podczas narodzin Ridge'a, jednak Stephanie trzymała to wszystko w tajemnicy",
            "isCorrect": false
        }, {"content": "podczas wypadku, gdy Ridge'potrzebował krwi", "isCorrect": true}],
        "duration": 30
    }, {
        "question": "Jak ma na imię brat Tylor?",
        "answers": [{"content": "Jack", "isCorrect": false}, {
            "content": "Nick",
            "isCorrect": false
        }, {"content": "Oscar", "isCorrect": false}, {"content": "Zach", "isCorrect": true}],
        "duration": 30
    }, {
        "question": "Kim była Carmen Arena?",
        "answers": [{"content": "tancerką", "isCorrect": false}, {
            "content": "sprzątaczką",
            "isCorrect": false
        }, {"content": "kelnerką", "isCorrect": true}, {"content": "piosenkarką", "isCorrect": false}],
        "duration": 30
    }, {
        "question": "Gdzie toczy się akacja serialu?",
        "answers": [{"content": "w Nowym Jorku", "isCorrect": false}, {
            "content": "w Miami",
            "isCorrect": false
        }, {"content": "w Los Angeles", "isCorrect": true}, {"content": "w Londynie", "isCorrect": false}],
        "duration": 30
    }, {
        "question": "Kto nie jest dzieckiem Brook?",
        "answers": [{"content": "Bridget", "isCorrect": false}, {
            "content": "Ridge Junior",
            "isCorrect": false
        }, {"content": "Thomas", "isCorrect": true}, {"content": "Rick", "isCorrect": false}],
        "duration": 30
    }],
    "name": "Moda na sukces",
    "description": "Quiz z najważniejszych wydarzeń serialu.",
    "level": "średni",
    "id": "61316f7f99149c1a92250e46"
}

export default function TestScreen3({route,navigation}) {
    const {dat,  nick1} = route.params;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [seconds, setSeconds] = useState(60);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    React.useEffect(() => {

            fetch('http://tgryl.pl/quiz/test/61316f7f99149c1a92250e46')
                .then((response) => response.json())
                .then((json) => {
                    setData(json);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
    });

    function renderQuiz() {

        if (loading === false) {
            return (
                <View style={styles.container}>
                    <View style={{paddingVertical: 15, flexDirection: "row", justifyContent: 'space-around'}}>
                        <Text
                            style={styles.text}> Question {currentQuestion + 1} of {data.tasks[0].question}</Text>
                        <Text style={styles.text}> Time: {seconds} sec</Text>
                    </View>
                </View>)
        }
    }

    return (
        <View style={{flex: 1}}>
            {
                renderQuiz()}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {flex: 1},
    questionContainer: {alignItems: 'center'},
    buttonRowContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 25,
        justifyContent: "space-evenly"
    },
    button: {borderWidth: 2, width: 125, height: 50, borderRadius: 6, alignItems: "center", justifyContent: "center"},
    text: {fontSize: 20, color: 'black'},
    textFinal: {fontSize: 20, color: 'black', textAlign: "center"}

});