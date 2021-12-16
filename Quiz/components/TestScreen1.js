import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Button} from 'react-native';
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
        }],
    time: 60
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
        }],
    time: 60
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
        }],
    time: 60
}, {
    question: "How many Harry Potter books are there?",
    answers: [{
        content: "2",
        isCorrect: false
    },
        {
            content: "7",
            isCorrect: true
        },
        {
            content: "8",
            isCorrect: false
        },
        {
            content: "5",
            isCorrect: false
        }],
    time: 60
}, {
    question: "How many fingers are there on a human hand?",
    answers: [{
        content: "2",
        isCorrect: false
    },
        {
            content: "7",
            isCorrect: false
        },
        {
            content: "8",
            isCorrect: false
        },
        {
            content: "5",
            isCorrect: true
        }],
    time: 60
}, {
    question: "To which of the following animal groups do humans belong to?",
    answers: [{
        content: "Fish",
        isCorrect: false
    },
        {
            content: "Mammals",
            isCorrect: true
        },
        {
            content: "Reptiles",
            isCorrect: false
        },
        {
            content: "Birds",
            isCorrect: false
        }],
    time: 60
}, {
    question: "Which of these is a bird?",
    answers: [{
        content: "T-Rex",
        isCorrect: false
    },
        {
            content: "Megalodon",
            isCorrect: false
        },
        {
            content: "Super Man",
            isCorrect: false
        },
        {
            content: "Seagull",
            isCorrect: true
        }],
    time: 60
}, {
    question: "How many lives does a cat have?",
    answers: [{
        content: "1",
        isCorrect: true
    },
        {
            content: "9",
            isCorrect: false
        },
        {
            content: "4",
            isCorrect: false
        },
        {
            content: "2",
            isCorrect: false
        }],
    time: 60
}, {
    question: "How many tips do you get?",
    answers: [{
        content: "2",
        isCorrect: false
    },
        {
            content: "7",
            isCorrect: false
        },
        {
            content: "0",
            isCorrect: true
        },
        {
            content: "5",
            isCorrect: false
        }],
    time: 60
}, {
    question: "Which bear is the best bear?",
    answers: [{
        content: "Polar Bear",
        isCorrect: false
    },
        {
            content: "Black Bear",
            isCorrect: true
        },
        {
            content: "Grizzly Bear",
            isCorrect: false
        },
        {
            content: "Panda",
            isCorrect: false
        }],
    time: 60
}]

export default function TestScreen1({navigation}) {
    let timer = null
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [component, showComponent] = useState(true)
    const [seconds, setSeconds] = React.useState(60);

    React.useEffect(() => {
        if (seconds > 0) {
            timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {

            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            }
            if (nextQuestion === questions.length) {
                showComponent(false);
            } else {
                setShowScore(true);
            }
            setSeconds(questions[currentQuestion].time);
        }
    });
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
        clearTimeout(timer)
        setSeconds(questions[currentQuestion].time)
    };

    function renderQuiz() {
        return (
            <View style={styles.container}>
                <View style={{paddingVertical: 15, flexDirection: "row", justifyContent: 'space-around'}}>
                    <Text style={styles.text}> Question {currentQuestion + 1} of {questions.length}</Text>
                    <Text style={styles.text}> Time: {seconds} sec</Text>
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
        const SendResults = () => {
            try {
                fetch('http://tgryl.pl/quiz/result', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nick: 'Ok',
                        score: score,
                        total: questions.length,
                        type: "Matematyka"
                    })
                });
            } catch (error) {
                console.error(error);
            }
            navigation.navigate('Results')
        }

        return (
            <View style={{justifyContent: 'center', paddingVertical: 50, padding: 20}}>
                <Text style={styles.textFinal}>
                    Final score: {score}/{questions.length}
                </Text>
                <Button
                    onPress={SendResults}
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