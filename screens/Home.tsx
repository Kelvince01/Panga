import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useAuthentication } from "../utils/hooks/useAuthentication";

const Home = () => {
  const { user } = useAuthentication(); 

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                  <Text>Welcome {user?.email}!</Text>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginBottom: 16,
                        }}>
                        Example of Splash, Login and Sign Up in React Native
                        {'\n\n'}
                        This is the Home Screen
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'grey',
                    }}>
                    Splash, Login and Register Example{'\n'}React Native
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: 'grey',
                    }}>
                    www.panga.com
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Home
