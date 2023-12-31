// Import Navigators from React Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { COLORS } from '../assets/AppStyles';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import About from './About';
import Budgets from './Budgets';
import Expenses from './Expenses';
import Home from './Home';
import Settings from './Settings';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: COLORS.TE_PAPA_GREEN_COLOR, //Set Header color
          },
          headerTintColor: COLORS.WHITE_COLOR, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SettingScreenStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: COLORS.TE_PAPA_GREEN_COLOR, //Set Header color
        },
        headerTintColor: COLORS.WHITE_COLOR, //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={Settings}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const ExpenseScreenStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="ExpensesScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: COLORS.TE_PAPA_GREEN_COLOR, //Set Header color
        },
        headerTintColor: COLORS.WHITE_COLOR, //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ExpensesScreen"
        component={Expenses}
        options={{
          title: 'Expenses', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const BudgetScreenStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="BudgetsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: COLORS.TE_PAPA_GREEN_COLOR, //Set Header color
        },
        headerTintColor: COLORS.WHITE_COLOR, //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="BudgetsScreen"
        component={Budgets}
        options={{
          title: 'Budgets', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const NotificationScreenStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: COLORS.TE_PAPA_GREEN_COLOR, //Set Header color
        },
        headerTintColor: COLORS.WHITE_COLOR, //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="NotificationsScreen"
        // component={NotificationsScreen}
        component={About}
        options={{
          title: 'Notifications', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigationRoutes = () => {
  return (
    // drawerContentOptions={{
    //     activeTintColor: '#cee1f2',
    //     color: '#cee1f2',
    //     itemStyle: { marginVertical: 5, color: 'white' },
    //     labelStyle: {
    //         color: '#d8d8d8',
    //     },
    // }}
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{ drawerLabel: 'Home' }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="ExpenseScreenStack"
        options={{ drawerLabel: 'Expenses' }}
        component={ExpenseScreenStack}
      />
      <Drawer.Screen
        name="BudgetScreenStack"
        options={{ drawerLabel: 'Budgets' }}
        component={BudgetScreenStack}
      />
      {/* <Drawer.Screen
        name="SettingScreenStack"
        options={{ drawerLabel: 'Settings' }}
        component={SettingScreenStack}
      /> */}
      <Drawer.Screen
        name="NotificationScreenStack"
        options={{ drawerLabel: 'Notifications' }}
        component={NotificationScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigationRoutes;
