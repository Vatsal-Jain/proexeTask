import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email) == false) {
      alert('please enter correct email');
      return;
    }
    if (password.length < 8) {
      alert('enter atleast 8 digit password');
      return;
    }
    
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User signed in!')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      if (error.code === 'auth/user-not-found') {
        alert('There is no account associated with this mail address,Please create an account');
      }
      if (error.code === 'auth/wrong-password') {
        alert('wrong password, please enter correct password');
      }
  
    
    });

  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="enter email"
        style={styles.input}
        placeholderTextColor="#66676e"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="enter password"
        style={styles.input}
        placeholderTextColor="#66676e"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}
      disabled={email && password ? false : true}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.footerText}>
      <Text style={styles.dont}>Dont Have an Account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
      <Text style={styles.bold}>Sign Up</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#28304f',
    width: '50%',
    padding: 15,
    marginTop: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#c1d9e3',
    color: '#66676e',
    borderColor: '#fff',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    margin: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bold:{
fontWeight:'bold',
color:'#000'
  },
  footerText:{
marginTop:50,
flexDirection:'row'
  },
  dont:{
    color:'grey'
  }
  
});
