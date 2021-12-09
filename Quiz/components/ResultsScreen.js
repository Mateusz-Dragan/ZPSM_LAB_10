import * as React from 'react';
import {SafeAreaView, ScrollView, Button, View, StyleSheet, RefreshControl, Text, FlatList} from 'react-native';

const DATA= [
    {
        nick: "ded",
        score: 1,
        total: 10,
        type: "Test1",
        date:'21-11-2021'
    },
    {
        nick: "Boo",
        score: 9,
        total: 10,
        type: "Test1",
        date:'21-11-2021'
    },
    {
        nick: "me",
        score: 10,
        total: 10,
        type: "Test1",
        date:'08-12-2021'
    }
];

const Scores = ({nick,score,total,type,date})=> (
        <View style={{ flexDirection: "row", alignItems:'center', justifyContent:'center'}}>
            <Text style={styles.title}>{nick}</Text>
            <Text style={styles.title}>{score}</Text>
            <Text style={styles.title}>{total}</Text>
            <Text style={styles.title}>{type}</Text>
            <Text style={styles.title}>{date}</Text>
        </View>

);

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function ResultsScreen({ navigation }) {
    const renderItem = ({ item }) => (
        <Scores nick={item.nick} score={item.score} total={item.total} type={item.type} date={item.date} />
    );

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.scrollView} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <View style={{ flexDirection: "row", alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.title}>Score</Text>
                    <Text style={styles.title}>Total</Text>
                    <Text style={styles.title}>Type</Text>
                    <Text style={styles.title}>Date</Text>
                </View>
                <FlatList nestedScrollEnabled={true}
                    data={DATA}
                    renderItem={renderItem}
                />
            <View style={{padding:50}}>
            <Button
                onPress={() => navigation.navigate('Home')}
                title="Go back home"
            /></View>
        </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1},
    scrollView: {
        flex: 1, paddingTop: 100, backgroundColor: '#fff', justifyContent:'space-between'
    },
    title: {
        fontSize: 14,
        borderWidth: 2, width:79, height: 30,
        textAlign:'center'
    },
    text: { textAlign: 'center' },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 20,
    },
});