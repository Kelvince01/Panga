// Import React and Component
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { COLORS } from '../assets/AppStyles';
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Firebase from "../config/firebaseConfig";

const CustomSidebarMenu = (props: any) => {
    const { user } = useAuthentication();

    function signOut() {
        Firebase.signOut().then(r => null);
    }

    return (
        <View style={stylesSidebar.sideMenuContainer}>
            <View style={stylesSidebar.profileHeader}>
                <View style={stylesSidebar.profileHeaderPicCircle}>
                    <Text style={{ fontSize: 25, color: COLORS.TE_PAPA_GREEN_COLOR }}>
                        {'About Panga'.charAt(6)}
                    </Text>
                </View>
                <Text style={stylesSidebar.profileHeaderText}>
                    About Panga
                </Text>
            </View>
            <View style={stylesSidebar.profileHeaderLine} />

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label={({ color }) =>
                        <Text style={{ color: '#d8d8d8' }}>
                            Logout
                        </Text>
                    }
                    onPress={() => {
                        props.navigation.toggleDrawer();
                        Alert.alert(
                            'Logout',
                            'Are you sure? You want to logout?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => {
                                        return null;
                                    },
                                },
                                {
                                    text: 'Confirm',
                                    onPress: () => {
                                        AsyncStorage.clear().then(r => null);
                                        signOut();
                                        props.navigation.replace('Auth');
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    }}
                />
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomSidebarMenu

const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.TE_PAPA_GREEN_COLOR,
        paddingTop: 40,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.TE_PAPA_GREEN_COLOR,
        padding: 15,
        textAlign: 'center',
    },
    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        color: 'white',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: '#e2e2e2',
        marginTop: 15,
    },
});
