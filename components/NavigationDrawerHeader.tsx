import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

const NavigationDrawerHeader = (props: any) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image
                    source={require('../assets/drawerWhite.png')}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default NavigationDrawerHeader
