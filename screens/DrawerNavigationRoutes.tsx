import React from 'react';

// Import Navigators from React Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../assets/AppStyles';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import Expenses from './Expenses';
import Home from './Home';
import Settings from './Settings';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }: any) => {
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

const settingScreenStack = ({ navigation }: any) => {
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

const expenseScreenStack = ({ navigation }: any) => {
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
                name="homeScreenStack"
                options={{ drawerLabel: 'Home' }}
                component={homeScreenStack}
            />
            <Drawer.Screen
                name="expenseScreenStack"
                options={{ drawerLabel: 'Expenses' }}
                component={expenseScreenStack}
            />
            <Drawer.Screen
                name="settingScreenStack"
                options={{ drawerLabel: 'Settings' }}
                component={settingScreenStack}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigationRoutes