import * as React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage'
import HomeScreen from "./components/HomeScreen"
import TestScreen1 from "./components/TestScreen1"
import TestScreen2 from "./components/TestScreen2"
import ResultsScreen from "./components/ResultsScreen"
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

SQLite.DEBUG(true);
SQLite.enablePromise(true);
const Drawer = createDrawerNavigator();


export default function Navigation() {
    const [showComponent, setShowComponent] = useState(true);
    const [name, setName] = useState('')
    const [data, setData] = useState([]);
    const [dbData, setdbData] = useState([]);
    const [DB, setDB] = useState(false);
    const [loading, setLoading] = useState(true);
    let db
    useEffect(() => {
        if (DB === false) {
            example()
            setDB(true)
        }
        console.log(dbData)
        getData()
        if (loading === true) {
            getTests();
        }
    });
    async function example() {
        db = await SQLite.openDatabase(
            {
                name: 'db.db',
                createFromLocation: 1,
            }
        );
        db.transaction(async tx => {
            var [tx, results] = await tx.executeSql("SELECT * FROM Test");
            for(let i=0; i<results.rows.length;i++){var row = results.rows.item(i); //get the first row assumed existed.
                setdbData(JSON.parse(row.data))
            }
        });
    }

    function getAllTests(){
        const query = 'SELECT * FROM Test';
        return db.executeSql(query).then(([results])=>{
            return JSON.parse(results.row.item(0).data || '{}')
        })
    }

    // const getDB = () => db ? db : db = SQLite.openDatabase(
    //     {
    //         name: 'md.db',
    //         createFromLocation: 1,
    //     },
    //
    //     () => {
    //     },
    //     error => {
    //         console.log(error)
    //     }
    // );
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
        const Print = (db) => {
            db.transaction( (tx) => {
                var [tx, results] = tx.executeSql("SELECT * FROM Test");
                for(let i=0; i<results.rows.length;i++){var row = results.rows.item(i); //get the first row assumed existed.
                    console.log(row);}
            })
        };

        const SaveStuff = (db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Test (data) VALUES (?);', [JSON.stringify(data)]);
            });
        }
        if (loading === false) {
            return (<NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
                                <Text>
                                    {dbData[0].name}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Results")}>
                                <Text>
                                    Results
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Test1")}>
                                <Text>
                                    Test 1
                                </Text>
                            </TouchableOpacity>
                            <FlatList
                                scrollEnabled={false}
                                data={data}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => props.navigation.navigate("Test2", {
                                        testId: item.id,
                                        nick1: name
                                    })}>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>)}
                            />
                            <TouchableOpacity onPress={() => RandomQuiz(props)}>
                                <Text>
                                    Random Test
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => SaveStuff(db )}>
                                <Text>
                                    Download Tests
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Print(db)}>
                                <Text>
                                    Show Tests
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
    }
})
