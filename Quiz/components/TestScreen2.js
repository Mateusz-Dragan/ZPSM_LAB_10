import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Button} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from 'lodash'


export default function TestScreen2({route, navigation}) {
    const {testId, nick1} = route.params;

    let timer = null;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [check, setCheck] = useState(true);
    const [score, setScore] = useState(0);
    const [component, showComponent] = useState(1)
    const [seconds, setSeconds] = useState(30);
    const [ttimer, setTimer] = useState(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(null)

    useEffect(() => {
        //console.log(component)
        console.log(id)
        //console.log(dat)

        if (loading === true && id !== null) {
            fetch('https://tgryl.pl/quiz/test/' + testId)
                .then((response) => response.json())
                .then((json) => {
                    json.tasks = _.shuffle(json.tasks)
                    for (let i = 0; i < json.tasks.length; i++) {
                        json.tasks[i].answers = _.shuffle(json.tasks[i].answers)
                    }
                    setData(json);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (ttimer === true) {
            if (seconds > 0) {
                timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            } else {

                const nextQuestion = currentQuestion + 1;
                if (nextQuestion < data.tasks.length) {
                    setCurrentQuestion(nextQuestion);
                }
                if (nextQuestion === data.tasks) {
                    setTimer(false)
                    showComponent(3);
                } else {
                    setShowScore(true);
                }
                setSeconds(data.tasks[currentQuestion].duration);
            }
        }
    });

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < data.tasks.length) {
            setCurrentQuestion(nextQuestion);
        }
        if (nextQuestion === data.tasks.length) {
            setCheck(false);
            showComponent(3);
        } else {
            setShowScore(true);
        }
        clearTimeout(timer)
        setSeconds(data.tasks[currentQuestion].duration)
    };

    function renderQuiz() {
        if (loading === false && Object.keys(data).length !== 0) {
            return (
                <View style={styles.container}>
                    <View style={{paddingVertical: 15, flexDirection: "row", justifyContent: 'space-around'}}>
                        <Text style={styles.text}> Question {currentQuestion + 1} of {data.tasks.length}</Text>
                        <Text style={styles.text}> Time: {seconds} sec</Text>
                    </View>
                    <View style={{padding: 35, flexDirection: "row", justifyContent: 'flex-end'}}>
                        <Text style={styles.text}> Score: {score}</Text>
                    </View>
                    <View style={styles.questionContainer}>
                        <Text style={styles.text}>{data.tasks[currentQuestion].question}</Text>
                    </View>
                    <View style={{paddingVertical: 75}}>
                        {data.tasks[currentQuestion].answers.length === 3 ?<View style={styles.buttonRowContainer}>
                            <View style={{paddingVertical:25, paddingHorizontal:25}}>
                            <TouchableOpacity style={styles.button}
                                              onPress={() => handleAnswerOptionClick(data.tasks[currentQuestion].answers[0].isCorrect)}>
                                <Text style={styles.text}>{data.tasks[currentQuestion].answers[0].content}</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{paddingVertical:25, paddingHorizontal:25}}>
                            <TouchableOpacity style={styles.button}
                                              onPress={() => handleAnswerOptionClick(data.tasks[currentQuestion].answers[1].isCorrect)}>
                                <Text style={styles.text}>{data.tasks[currentQuestion].answers[1].content}</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{paddingVertical:25, paddingHorizontal:25}}>
                            <TouchableOpacity style={styles.button}
                                              onPress={() => handleAnswerOptionClick(data.tasks[currentQuestion].answers[2].isCorrect)}>
                                <Text style={styles.text}>{data.tasks[currentQuestion].answers[2].content}</Text>
                            </TouchableOpacity>
                            </View>
                        </View>:<View style={styles.buttonRowContainer}>
                            <View style={{paddingVertical:25, paddingHorizontal:25}}>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => handleAnswerOptionClick(data.tasks[currentQuestion].answers[0].isCorrect)}>
                                    <Text style={styles.text}>{data.tasks[currentQuestion].answers[0].content}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingVertical:25, paddingHorizontal:25}}>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => handleAnswerOptionClick(data.tasks[currentQuestion].answers[1].isCorrect)}>
                                    <Text style={styles.text}>{data.tasks[currentQuestion].answers[1].content}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingVertical:25, paddingHorizontal:25}}>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => handleAnswerOptionClick(data.tasks[currentQuestion].answers[2].isCorrect)}>
                                    <Text style={styles.text}>{data.tasks[currentQuestion].answers[2].content}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingVertical:25, paddingHorizontal:25}}>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => handleAnswerOptionClick(data.tasks[currentQuestion].answers[3].isCorrect)}>
                                    <Text style={styles.text}>{data.tasks[currentQuestion].answers[3].content}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                    </View>
                </View>)
        }
    }

    function Start() {
        const StartQuiz = () => {
            setTimer(true);
            setId(testId);
            showComponent(2)
        }
        return (
            <View>
                <Button
                    onPress={StartQuiz}
                    title="StartQuiz">
                </Button>
            </View>
        )
    }


    function Result() {
        const SendResults = () => {
            try {
                fetch('http://tgryl.pl/quiz/result', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nick: nick1,
                        score: score,
                        total: data.tasks.length,
                        type: data.name
                    })
                });
            } catch (error) {
                console.error(error);
            }
            navigation.navigate('Results')
        }
        const ChangeQuiz = () => {
            setId(null)
            setTimer(false)
            setLoading(true)
            setScore(0)
            showComponent(1)
            clearTimeout(timer)
            setSeconds(30)
            setCurrentQuestion(0)
            navigation.navigate('Home')
        }

        return (
            <View style={{justifyContent: 'center', paddingVertical: 50, padding: 20}}>
                <Text style={styles.textFinal}>
                    Final score: {score}/{data.tasks.length}
                </Text>
                <Button
                    onPress={SendResults}
                    title="Go to scoreboard"
                />
                <Button
                    onPress={ChangeQuiz}
                    title="Do a new quiz"
                />
            </View>
        );
    }

    function renderElement() {
        if (component === 1) {
            return Start();
        } else if (component === 2) {
            return renderQuiz();
        } else if (component === 3) {
            return Result();
        }
    }

    return (
        <View style={{flex: 1}}>
            {renderElement()}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {flex: 1},
    questionContainer: {alignItems: 'center'},
    buttonRowContainer: {
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: "row",
        paddingVertical: 25,
        flexWrap:"wrap",
    },
    button: {borderWidth: 2, width: 150, height: 50, borderRadius: 6, alignItems: "center", justifyContent: "center"},
    text: {fontSize: 20, color: 'black'},
    textFinal: {fontSize: 20, color: 'black', textAlign: "center"}

});
