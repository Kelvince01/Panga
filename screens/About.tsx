import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const About = () => {
  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center">
        <Text style={styles.header}>About Panga</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 4,
    color: 'blue',
  },
});

export default About;
