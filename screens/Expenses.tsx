import { Entypo, Ionicons } from '@expo/vector-icons';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS } from '../assets/AppStyles';
import { FIRESTORE_DB } from '../config/firebaseConfig';

export interface Expense {
  done?: boolean;
  id?: string;
  name?: string;
  amount?: string;
  category?: string;
  expenseDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense>({
    name: '',
    category: '',
    amount: '',
  });

  const addExpense = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'expenses'), {
        name: expense.name,
        expenseDate: new Date(),
        amount: expense.amount,
        category: expense.category,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setExpense({
        name: '',
        category: '',
        amount: '',
      });
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
            ...doc.data(),
          });
        });

        setExpenses(expenses);
      },
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderExpense = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `expenses/${item.id}`);

    const toggleDone = async () => {
      await updateDoc(ref, { done: !item.done });
    };

    const deleteExpense = async () => {
      await deleteDoc(ref);
    };

    return (
      <View style={styles.expenseContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.expense}>
          {item.done && (
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          )}
          {!item.done && <Entypo name="circle" size={32} color="black" />}
          <Text style={styles.expenseText}>{item.name}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={deleteExpense}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Expense name e.g., Transport"
          onChangeText={(name: string) => setExpense({ ...expense, name })}
          value={expense.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Category e.g., Food"
          onChangeText={(category: string) =>
            setExpense({ ...expense, category })
          }
          value={expense.category}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount e.g., 10,000"
          onChangeText={(amount: string) => setExpense({ ...expense, amount })}
          value={expense.amount}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button}>
          <Button
            onPress={addExpense}
            title="Add"
            disabled={expense.name === ''}
          />
        </TouchableOpacity>
      </View>

      {expenses.length > 0 && (
        <View>
          <Text>Expenses</Text>
          <FlatList
            data={expenses}
            renderItem={renderExpense}
            keyExtractor={(expense: any) => expense.id}
            // removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    margin: 8,
    width: '100%',
    marginBottom: 12,
    borderColor: '#ccc',
  },
  button: {
    padding: 10,
    marginLeft: 4,
    width: '100%',
    color: COLORS.TE_PAPA_GREEN_COLOR,
  },
  expense: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  expenseText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  expenseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4,
  },
});

export default Expenses;
