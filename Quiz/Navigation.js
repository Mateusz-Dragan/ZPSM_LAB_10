import * as React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage'
import HomeScreen from "./components/HomeScreen"
import TestScreen1 from "./components/TestScreen1"
import TestScreen2 from "./components/TestScreen2"
import ResultsScreen from "./components/ResultsScreen"
import InternetCheck from "./components/InternetCheck";
import {useEffect, useState} from "react";
import {
    Alert,
    Button,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash"
const Drawer = createDrawerNavigator();


export default function Navigation() {
    const [showComponent, setShowComponent] = useState(true);
    const [name, setName] = useState('')
    const [data, setData] = useState([]);
    const [detailsData, setDetailsData] = useState([]);
    const [dbData, setdbData] = useState([]);
    const [dbDetailsData, setdbDetailsData] = useState([]);
    const [DB, setDB] = useState(false);
    const [net, setNet] = useState(false);
    const [loading, setLoading] = useState(true);

    let db
    useEffect(() => {
        if (DB === false) {
            getTestTitles();
            setDB(true)
        }
        getData()
        if (loading === true) {
            getTests();
            SaveTests(db);
        }
    });

    async function getTestTitles() {
        db = await SQLite.openDatabase(
            {
                name: 'db.db',
                createFromLocation: 1,
            }
        );
        db.transaction(async tx => {
            var [tx, results] = await tx.executeSql("SELECT * FROM Test");
            var row = results.rows.item(0);
                setdbData(JSON.parse(row.data))
        });
        let holder=[3]
        db.transaction(async tx => {
            var [tx, results] = await tx.executeSql("SELECT * FROM Test_Details");
            for(let i = 0; i<4;i++){
                var row = results.rows.item(i);
                holder[i]=JSON.parse(row.data)
            }
            setdbDetailsData(holder);

        });
    }
    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        setName(user.Name);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    async function SaveTests (db) {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO Test (data) VALUES (?);', [JSON.stringify(data)]);
        });
        for(let i=0;i<data.length; i++)
        {
            fetch('https://tgryl.pl/quiz/test/' + data[i].id)
                .then((response) => response.json())
                .then((json) => {
                    setDetailsData(json);
                    db.transaction((tx) => {
                        tx.executeSql('INSERT INTO Test_Details (test_details) VALUES (?);', [JSON.stringify(detailsData)]);
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const getTests = () => {
        fetch('http://tgryl.pl/quiz/tests')
            .then((response) => response.json())
            .then((json) => {
                json = _.shuffle(json)
                setData(json);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function WelcomeScreen() {
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
                <Text style={{
                    fontFamily: 'PlayfairDisplay-VariableFont_wght',
                    fontSize: 40,
                    color: 'black'
                }}>Welcome!!!!!!!!!!</Text>
                <TextInput style={styles.input} placeholder={"Put in your name"}
                           onChangeText={(value) => setName(value)}/>

                <Button style={styles.buttonContainer}
                        onPress={setData}
                        title="Enter"
                />
            </View>
        );
    }

    function NavigationScreen() {
        const RandomQuiz = (props) => {

            const randomElement = data[Math.floor(Math.random() * data.length)].id;
            props.navigation.navigate("Test2", {testId: randomElement, nick1: name})
        }
        const SaveTest = async (db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Test (data) VALUES (?);', [JSON.stringify(data)]);
            });
            for(let i=0;i<data.length; i++)
            {
                fetch('https://tgryl.pl/quiz/test/' + data[i].id)
                    .then((response) => response.json())
                    .then((json) => {
                        setDetailsData(json);
                        db.transaction((tx) => {
                            tx.executeSql('INSERT INTO Test_Details (test_details) VALUES (?);', [JSON.stringify(detailsData)]);
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
        function AllTests(props){
            return data.map(function(item,i){
                return(<TouchableOpacity key={i} style={styles.drawerButtons} onPress={() => props.navigation.navigate("Test2", {
                    testId: item.id,
                    nick1: name
                })}>
                    <Text style={{fontSize:25}}>{item.name}</Text>
                </TouchableOpacity>)
            })
        }
        if (loading === false) {
            return (<NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <TouchableOpacity style={styles.drawerButtons} onPress={() => props.navigation.navigate("Home")}>
                                <Text style={{fontSize:25}}>
                                    Home
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerButtons} onPress={() => props.navigation.navigate("Results")}>
                                <Text style={{fontSize:25}}>
                                    Results
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerButtons} onPress={() => props.navigation.navigate("Test1")}>
                                <Text style={{fontSize:25}}>
                                    Test 1
                                </Text>
                            </TouchableOpacity>
                            {AllTests(props)}

                            <TouchableOpacity style={styles.drawerButtons} onPress={() => RandomQuiz(props)}>
                                <Text style={{fontSize:25}}>
                                    Random Test
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerButtons} onPress={() => SaveTest(db )}>
                                <Text style={{fontSize:25}}>
                                    Download Tests
                                </Text>
                            </TouchableOpacity>
                        </DrawerContentScrollView>
                    );
                }}>
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Results" component={ResultsScreen}/>
                    <Drawer.Screen name="Test1" component={TestScreen1}/>
                    <Drawer.Screen name="Test2" component={TestScreen2}/>
                </Drawer.Navigator>
            </NavigationContainer>)
        }
    }


    return (
        <View style={{flex: 1}}>
            {showComponent ? <WelcomeScreen/> : <NavigationScreen/>}
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
    },
    drawerButtons:{
          borderWidth:2, alignItems: "center", justifyContent: "center"
    }
})
