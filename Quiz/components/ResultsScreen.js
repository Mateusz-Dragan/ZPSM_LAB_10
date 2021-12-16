import * as React from 'react';
import {SafeAreaView, ScrollView, Button, View, StyleSheet, RefreshControl, Text, FlatList} from 'react-native';
import {useEffect, useState} from "react";



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function ResultsScreen({ navigation }) {
    const renderItem = ({ item }) => (
        <Scores nick={item.nick} score={item.score} total={item.total} type={item.type} date={item.createdOn} />
    );
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch('http://tgryl.pl/quiz/results')
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => {
                console.error(error);
            });
    });
    const Scores = ({nick,score,total,type,date})=> (
        <View style={{ flexDirection: "row", alignItems:'center', justifyContent:'center'}}>
            <Text style={styles.title}>{nick}</Text>
            <Text style={styles.title}>{score}</Text>
            <Text style={styles.title}>{total}</Text>
            <Text style={styles.title}>{type}</Text>
            <Text style={styles.title}>{date}</Text>
        </View>

    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: "row", alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.title}>Score</Text>
                    <Text style={styles.title}>Total</Text>
                    <Text style={styles.title}>Type</Text>
                    <Text style={styles.title}>Date</Text>
                </View>
                <FlatList nestedScrollEnabled={true} refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />}
                    data={data}
                    renderItem={renderItem}
                />
            <View style={{padding:50}}>
            <Button
                onPress={() => navigation.navigate('Home')}
                title="Go back home"
            /></View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1},
    title: {
        fontSize: 14,
        borderWidth: 2, width:81, height: 50,
        textAlign:'center',
        textAlignVertical:'center'
    },
    text: { textAlign: 'center' },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 20,
    },
});