import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const About = () => {
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.header}>About Panga</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 4,
        color: "blue"
    }
});

export default About