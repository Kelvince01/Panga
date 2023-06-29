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
import DatePicker from 'react-native-datepicker';

import { FIRESTORE_DB } from '../config/firebaseConfig';

export interface Budget {
  id?: string;
  name?: string;
  amount?: string;
  achieved?: boolean;
  budgetDate?: Date;
  achieveDate?: string;
}

const Budgets = () => {
  const [budget, setBudget] = useState<Budget>({
    id: '',
    name: '',
    amount: '0',
    achieved: false,
    budgetDate: new Date(),
    achieveDate: new Date('10/10/2024').toDateString(),
  });
  const [budgets, setBudgets] = useState<any[]>();

  const addBudget = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'budgets'), {
        name: budget.name,
        amount: budget.amount,
        achieved: false,
        budgetDate: new Date(),
        achievedDate: budget.achieveDate,
      });
      setBudget({});
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {
    const budgetRef = collection(FIRESTORE_DB, 'budgets');

    const subscriber = onSnapshot(budgetRef, {
      next: (snapshot: any) => {
        const budgets: any[] = [];
        snapshot.docs.forEach((doc: any) => {
          budgets.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setBudgets(budgets);
      },
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderBudget = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `budgets/${item.id}`);

    const toggleAchieved = async () => {
      await updateDoc(ref, { achieved: !item.achieved });
    };

    const deleteBudget = async () => {
      await deleteDoc(ref);
    };

    return (
      <View style={styles.budgetContainer}>
        <TouchableOpacity onPress={toggleAchieved} style={styles.budget}>
          {item.achieved && (
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          )}
          {!item.achieved && <Entypo name="circle" size={32} color="black" />}
          <Text style={styles.budgetText}>{item.name}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={deleteBudget}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name e.g., Buy new phone"
          onChangeText={(name: string) => setBudget({ ...budget, name })}
          value={budget.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount e.g., 35000"
          onChangeText={(amount: string) => setBudget({ ...budget, amount })}
          value={budget.amount}
        />

        <DatePicker
          style={styles.achieveDateStyles}
          date={budget.achieveDate}
          mode="date"
          placeholder="Achieve date e.g., 23-05-2024"
          format="YYYY-MM-DD"
          minDate="2023-05-01"
          maxDate="2030-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          /*customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}*/
          onDateChange={(achieveDate: string) => {
            setBudget({ ...budget, achieveDate });
          }}
        />

        <Button
          onPress={addBudget}
          title="Add Budget"
          disabled={budget.name === ''}
        />
      </View>

      {budgets!.length > 0 && (
        <View>
          <FlatList
            data={budgets}
            renderItem={renderBudget}
            keyExtractor={budget => budget.id}
            // removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
};

export default Budgets;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    marginLeft: 4,
  },
  button: {
    padding: 4,
    marginLeft: 4,
  },
  budget: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  budgetText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4,
  },
  achieveDateStyles: { width: 200 },
});
