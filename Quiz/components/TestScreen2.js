import * as React from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from "react";

const questions = [{
    question: "What is your name?",
    answers: [{
        content: "Mateusz",
        isCorrect: true
    },
        {
            content: "Paweł",
            isCorrect: false
        },
        {
            content: "Leon",
            isCorrect: false
        },
        {
            content: "Dragan",
            isCorrect: false
        }]
}, {
    question: "What color is the sun?",
    answers: [{
        content: "Red",
        isCorrect: false
    },
        {
            content: "Purple",
            isCorrect: false
        },
        {
            content: "Yellow",
            isCorrect: true
        },
        {
            content: "black",
            isCorrect: false
        }]
}, {
    question: "In what language does a dog speak?",
    answers: [{
        content: "Meow",
        isCorrect: false
    },
        {
            content: "Woof",
            isCorrect: true
        },
        {
            content: "Ka-kaw",
            isCorrect: false
        },
        {
            content: "Brrr!!!",
            isCorrect: false
        }]
}, {
    question: "What is your name?",
    answers: [{
        content: "Mateusz",
        isCorrect: true
    },
        {
            content: "Paweł",
            isCorrect: false
        },
        {
            content: "Leon",
            isCorrect: false
        },
        {
            content: "Dragan",
            isCorrect: false
        }]
}]

export default function TestScreen2({ navigation }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [component, showComponent] = useState(true)

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        }
        if (nextQuestion === questions.length) {
            showComponent(false);
        } else {
            setShowScore(true);
        }
    };

    function renderQuiz() {
        return (
            <View style={styles.container}>
                <View style={{paddingVertical: 15, flexDirection: "row", justifyContent: 'space-around'}}>
                    <Text style={styles.text}> Question {currentQuestion + 1} of {questions.length}</Text>
                    <Text style={styles.text}> Time: 60 sec</Text>
                </View>
                <View style={{padding: 35, flexDirection: "row", justifyContent: 'flex-end'}}>
                    <Text style={styles.text}> Score: {score}</Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.text}>{questions[currentQuestion].question}</Text>
                </View>
                <View style={{paddingVertical: 75}}>
                    <View style={styles.buttonRowContainer}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => handleAnswerOptionClick(questions[currentQuestion].answers[0].isCorrect)}>
                            <Text style={styles.text}>{questions[currentQuestion].answers[0].content}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => handleAnswerOptionClick(questions[currentQuestion].answers[1].isCorrect)}>
                            <Text style={styles.text}>{questions[currentQuestion].answers[1].content}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRowContainer}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => handleAnswerOptionClick(questions[currentQuestion].answers[2].isCorrect)}>
                            <Text style={styles.text}>{questions[currentQuestion].answers[2].content}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => handleAnswerOptionClick(questions[currentQuestion].answers[3].isCorrect)}>
                            <Text style={styles.text}>{questions[currentQuestion].answers[3].content}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>)
    }

    function Result() {
        return (
            <View style={{justifyContent: 'center', paddingVertical: 50, padding: 20}}>
                <Text style={styles.textFinal}>
                    Final score: {score}/{questions.length}
                </Text>
                <Button
                    onPress={() => navigation.navigate('Results')}
                    title="Go to scoreboard"
                />
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            {component ?
                renderQuiz() : Result()}
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