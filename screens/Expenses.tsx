import { View, TextInput, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_DB } from '../config/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        const todoRef = collection(FIRESTORE_DB, 'expenses');

        const subscriber = onSnapshot(todoRef, {
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

        // // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const renderTodo = ({ item }: any) => {
        const ref = doc(FIRESTORE_DB, `expenses/${item.id}`);

        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done });
        };

        const deleteItem = async () => {
            deleteDoc(ref);
        };

        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done && <Ionicons name="md-checkmark-circle" size={32} color="green" />}
                    {!item.done && <Entypo name="circle" size={32} color="black" />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" size={24} color="red" onPress={deleteItem} />
            </View>
        ); `
    };`


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

                {expenses.length > 0 && (
                    <View>
                        <FlatList
                            data={expenses}
                            renderItem={renderTodo}
                            keyExtractor={(todo) => todo.id}
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
            backgroundColor: '#fff'
        },
        button: {
            padding: 4,
            marginLeft: 4
        },
        todo: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center'
        },
        todoText: {
            flex: 1,
            paddingHorizontal: 4
        },
        todoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
            marginVertical: 4
        }
    });

    export default Expenses