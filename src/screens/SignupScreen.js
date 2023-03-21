import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import auth from '@react-native-firebase/auth';
  
  const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')
    const handleSignup = () => {
      var re = /\S+@\S+\.\S+/;
      if (re.test(email) == false) {
        alert('please enter correct email');
        return;
      }
      if (password.length < 8) {
        alert('enter atleast 8 digit password');
        return;
      }
      if(password != confirmPassword){
        alert("passwords do not match")
        return;
      }
try{
      auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
    alert(`user created with email = ${email} and password = ${password}`)
    navigation.navigate("login")
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });


}
catch{
    console.log("there was some issue")
}
      
    };
    return (
      <View style={styles.container}>
       
        <TextInput
          placeholder="enter your email"
          style={styles.input}
          placeholderTextColor="#66676e"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="set password"
          style={styles.input}
          placeholderTextColor="#66676e"
          value={password}
          onChangeText={text => setPassword(text)}
        />
          <TextInput
          placeholder="confirm password"
          style={styles.input}
          placeholderTextColor="#66676e"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create My Account</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default SignUpScreen;
  
  const styles = StyleSheet.create({
    loginButton: {
      backgroundColor: '#28304f',
      padding: 20,
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
  });