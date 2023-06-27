import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FIRESTORE_DB } from '../config/firebaseConfig';
import { Entypo, Ionicons } from "@expo/vector-icons";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";

export interface Expense {
    done: boolean;
    id: string;
    title: string;
}

const Expenses = () => {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [expense, setExpense] = useState('');

    const addExpense = async () => {
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'expenses'), {
                title: expense,
                done: false
            });
            setExpense('');
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    useEffect(() => {
        const expenseRef = collection(FIRESTORE_DB, 'expenses');

        const subscriber = onSnapshot(expenseRef, {
            next: (snapshot: any) => {
                const expenses: any[] = [];
                snapshot.docs.forEach((doc: any) => {
                    expenses.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setExpenses(expenses);
            }
        });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const renderExpense = ({ item }: any) => {
        const ref = doc(FIRESTORE_DB, `expenses/${item.id}`);

        const toggleDone = async () => {
            await updateDoc(ref, { done: !item.done });
        };

        const deleteItem = async () => {
            await deleteDoc(ref);
        };

        return (
            <View style={styles.expenseContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.expense}>
                    {item.done && <Ionicons name="md-checkmark-circle" size={32} color="green" />}
                    {!item.done && <Entypo name="circle" size={32} color="black" />}
                    <Text style={styles.expenseText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" size={24} color="red" onPress={deleteItem} />
            </View>
        );
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
                <Button
                    onPress={addExpense} 
                    title="Add Expense" 
                    disabled={expense === ''} 
                />
            </View>

            {expenses.length > 0 && (
                <View>
                    <FlatList
                        data={expenses}
                        renderItem={renderExpense}
                        keyExtractor={(expense) => expense.id}
                    // removeClippedSubviews={true}
                    />
                </View>
            )}
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
        backgroundColor: '#fff',
        marginLeft: 4
    },
    button: {
        padding: 4,
        marginLeft: 4
    },
    expense: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    expenseText: {
        flex: 1,
        paddingHorizontal: 4
    },
    expenseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 4
    }
});

export default Expenses;
