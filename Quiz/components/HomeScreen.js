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
    FlatList
} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen({ navigation }) {
    const [name1, setName] = useState('');
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [check, setCheck] = useState(true)

    const renderItem = ({ item }) => (
        <Tests name={item.name} description={item.description} tags={item.tags} level={item.level} numberOfTasks={item.numberOfTasks} id={item.id}/>
    );

    useEffect(() => {
        getData();
        fetch('http://tgryl.pl/quiz/tests')
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => {
                console.error(error);
            });
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

    const SendData = (id)=>{
        // fetch('https://tgryl.pl/quiz/test/'+id).then((response) => response.json()).then((json) => {
        //      setData2(json);
        // }).catch((error) => {
        //     console.error(error);
        // });
        // console.log(data2)
        navigation.navigate('Test2',{testId:id, nick1:name1,dat:data2})
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