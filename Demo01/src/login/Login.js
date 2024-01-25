import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Bạn chưa nhập đầy đủ thông tin!');
    } else {
      try {
        const existingUserItems = await AsyncStorage.getItem('userItems');
        if (!existingUserItems) {
          Alert.alert('');
          return;
        }

        const userItems = JSON.parse(existingUserItems);
        const existingUser = userItems.find(
          (item) => item.email === email && item.password === password
        );

        if (existingUser) {
          Alert.alert('Đăng nhập thành công!');
          // Navigate to the home screen or any other screen
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Tài khoảng hoặc mật khẩu không đúng');
        }
      } catch (error) {
        console.log('Error retrieving account:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.text}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật Khẩu"
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.row}>
                        <Text style={styles.text1}>Đăng ký tài khoản mới?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.link}>Đăng Ký</Text>
                        </TouchableOpacity>
                    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 5,
    marginLeft: 105,
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'darkgreen',
    marginBottom:20,
    fontSize: 35,
    marginTop: 16,
  },
  text1: {
    color: 'gray',
    fontSize: 17,
    marginTop:20,
  },
  link: {
    color: 'red',
    fontSize: 20,
    marginLeft: 35,
  },

  input: {
    color: 'gray',
    backgroundColor: '#ffff',
    margin: 10,
    borderRadius: 10,
    height: 70,
    width: '70%',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#006400',
    paddingVertical: 17,
    paddingHorizontal: 20,
    width: '70%',
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;