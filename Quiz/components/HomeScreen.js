import * as React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Button,
    View,
    ScrollView,
    Text,
    SafeAreaView,
    Alert,
    FlatList, RefreshControl
} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import NetInfo from "@react-native-community/netinfo";
import SQLite from "react-native-sqlite-storage";


export default function HomeScreen({ navigation }) {
    const [name1, setName] = useState('');
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(true)
    const [net,setNet] = useState(false);
    const [dbData, setdbData] = useState([]);
    const [DB, setDB] = useState(false);
    let db
    const renderItem = ({ item }) => (
        <Tests name={item.name} description={item.description} tags={item.tags} level={item.level} numberOfTasks={item.numberOfTasks} id={item.id}/>
    );

    useEffect(() => {
        NetInfo.fetch().then((res) => {
            console.log('isConnected', res.isConnected);
            setNet(res.isConnected.toString());
            console.log('isWifiEnabled', res.isWifiEnabled)
            console.log('connectionType', res.type)
        })
        if (DB === false) {
            getTestTitles();
            setDB(true)
        }
        getData();
        getTests();
        if(net===false){
            setData(dbData)
        }
    }, []);

    const getTests = ()=> {
        fetch('http://tgryl.pl/quiz/tests')
            .then((response) => response.json())
            .then((json) => {
                setRefresh(false);
                json = _.shuffle(json)
                setData(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    async function getTestTitles() {
        db = await SQLite.openDatabase(
            {
                name: 'db.db',
                createFromLocation: 1,
            }
        );


        db.transaction(async tx => {
            var [tx, results] = await tx.executeSql("SELECT * FROM Test");
            var row = results.rows.item(0); //get the first row assumed existed.
            setdbData(JSON.parse(row.data))

        });
    }

    const handleRefresh = () => {
        setRefresh(true);
        getTests();
    };

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

    const SendData = (id)=>{
        navigation.navigate('Test2',{testId:id, nick1:name1})
    }


    const Tests = ({id,name,description,tags,level,numberOfTasks})=> (
        <View style={styles.test}>
            <TouchableOpacity style={styles.testContainer} onPress={() => SendData(id)}>
                <Text style={styles.testTitle}>{name}</Text>
                <Text style={styles.testDescription}>{description} </Text>
            </TouchableOpacity>
        </View>

    );

    return (

        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: "row", alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:30, color:'black'}}> Welcome to the quiz {name1}</Text>
        </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh}/>}
                />

            <View style={{flexDirection: "row", alignItems:'center', justifyContent:'center'}}>
            <Button style={styles.buttonContainer}
                onPress={() => navigation.navigate('Results')}
                title="Go to results"
            />
        </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {flex: 1},
    testContainer:{flex: 0.7, borderColor: 'black',paddingVertical: 30, borderWidth: 3,width: 250,
                    height:150,justifyContent: "space-between", alignItems:'center'},
    test:{flexDirection: "row", alignItems:'center', justifyContent:'center', paddingVertical:20},
    buttonContainer:{},
    testTitle:{fontSize:22,color:'black', fontFamily:'Roboto-Bold'},
    testDescription:{fontSize:15, color:'black'}
})
