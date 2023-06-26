import { View, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'

export interface Expense {
    done: boolean;
    id: string;
    title: string;
}

const Expenses = () => {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [expense, setExpense] = useState('');

    const addExpense = async () => {
        // TODO
        alert(expense);
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new expense"
                    onChangeText={(text: string) => setExpense(text)}
                    value={expense}
                />
                <Button onPress={addExpense} title="Add Expense" disabled={expense === ''} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    form: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    button: {
        padding: 4,
        marginLeft: 4
    }
});

export default Expenses