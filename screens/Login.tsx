// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { createRef, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS } from '../assets/AppStyles';
import Loader from '../components/Loader';
import { FIREBASE_AUTH } from '../config/firebaseConfig';
// import { Icon } from "react-native-elements";
// import firebase from "firebase/compat";
// import auth = firebase.auth;

const Login = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const passwordInputRef: any = createRef();
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
  });

  const signIn = async () => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        value.email,
        value.password,
      );
      console.log(response);
      if (response) {
        setLoading(false);
        await AsyncStorage.setItem('user_id', response.user.email!);
      }
      navigation.replace('DrawerNavigationRoutes');
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/icon.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>

            {!!value.error && (
              <View style={styles.errorTextStyle}>
                <Text style={styles.errorTextStyle}>{value.error}</Text>
              </View>
            )}

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={value.email}
                onChangeText={(email: string) => setValue({ ...value, email })}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
              {/*  inlineImageLeft={
                                    <Icon
                                  name='key'
                                  size={16}
                                />*/}
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={value.password}
                onChangeText={(password: string) =>
                  setValue({ ...value, password })
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {/* {errorText != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errorText}
                            </Text>
                        ) : null} */}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={signIn}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_COLOR,
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.TE_PAPA_GREEN_COLOR,
    borderWidth: 0,
    color: COLORS.WHITE_COLOR,
    borderColor: COLORS.TE_PAPA_GREEN_COLOR,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: COLORS.WHITE_COLOR,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.TE_PAPA_GREEN_COLOR,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.TE_PAPA_GREEN_COLOR,
  },
  registerTextStyle: {
    color: COLORS.TEAK_COLOR,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.WHITE_COLOR,
    backgroundColor: '#D54826FF',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
  },
});
