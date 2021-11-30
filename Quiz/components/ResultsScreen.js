import * as React from 'react';
import { Button, View,StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


const CONTENT = {
    tableHead: ['Name', 'Points', 'test', 'Date'],
    tableTitle: ['Yay', 'Boo', 'Meh', "Ded"],
    tableData: [
        ['18/20', 'Test1', '21-11-2021'],
        ['10/20', 'Test1', '21-11-2021'],
        ['0/20', 'Test1', '21-11-2021'],
        ['1/20', 'Test1', '21-11-2021'],
    ],
};
export default function ResultsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row
                    data={CONTENT.tableHead}
                    flexArr={[1, 1, 1, 2]}
                    style={styles.head}
                    textStyle={styles.text}
                />
                <TableWrapper style={styles.wrapper}>
                    <Col
                        data={CONTENT.tableTitle}
                        style={styles.title}
                        heightArr={[28, 28]}
                        textStyle={styles.text}
                    />
                    <Rows
                        data={CONTENT.tableData}
                        flexArr={[1, 1, 2]}
                        style={styles.row}
                        textStyle={styles.text}
                    />
                </TableWrapper>
            </Table>
            <Button
                onPress={() => navigation.navigate('Home')}
                title="Go back home"
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 100, backgroundColor: '#fff', justifyContent:'space-between' },
    head: { height: 40, backgroundColor: 'orange' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#2ecc71' },
    row: { height: 28 },
    text: { textAlign: 'center' },
});