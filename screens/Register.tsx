// Import React and Component
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createRef, useState } from 'react';
import {
  Image,
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

const Register = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const emailInputRef: any = createRef();
  // const ageInputRef: any = createRef();
  // const addressInputRef: any = createRef();
  const passwordInputRef: any = createRef();

  const [value, setValue] = useState({
    email: '',
    password: '',
    /*name: '',
        age: '',
        address: '',*/
    error: '',
  });

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    //Show Loader
    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        value.email,
        value.password,
      );
      setLoading(false);
      console.log(response);
      // navigation.navigate('Sign In');

      if (response) {
        setIsRegistrationSuccess(true);
      }

      console.log('Registration Successful. Please Login to proceed');
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  if (isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.WHITE_COLOR,
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE_COLOR }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
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

        {/* {errorText != '' ? (
                  <Text style={styles.errorTextStyle}>
                      {errorText}
                  </Text>
                ) : null} */}

        {!!value.error && (
          <View style={styles.errorTextStyle}>
            <Text>{value.error}</Text>
          </View>
        )}

        <KeyboardAvoidingView enabled>
          {/*<View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>*/}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={value.email}
              onChangeText={(email: string) => setValue({ ...value, email })}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={value.password}
              onChangeText={(password: string) =>
                setValue({ ...value, password })
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          {/*<View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserAge) => setUserAge(UserAge)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Age"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            ref={ageInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                addressInputRef.current &&
                                addressInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserAddress) =>
                                setUserAddress(UserAddress)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Address"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={addressInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>*/}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={signUp}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  errorTextStyle: {
    color: COLORS.WHITE_COLOR,
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#D54826FF',
  },
  successTextStyle: {
    color: COLORS.TE_PAPA_GREEN_COLOR,
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
