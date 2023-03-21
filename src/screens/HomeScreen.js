import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../redux/slices/userSlice';

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const fetchDataFromRedux = useSelector(state => state.usersList);

  const getData = () => {
    fetch('https://reqres.in/api/users?page=2', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => dispatch(fetchData(json.data)));
  };

  useEffect(() => {
    getData();
  }, []);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="search"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />

        <Icon name="search" size={25} color={'#000'} />
      </View>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>

        {fetchDataFromRedux[0] ? fetchDataFromRedux[0]
          .filter(val => {
            if (searchTerm === '') {
              return val;
            } else if (
              val.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.last_name.toLowerCase().includes(searchTerm.toLowerCase()) 
            ) 
            
            {
              return val;
            }
          })
          .map(item => {
            return (
              <View style={styles.listView} key={item.id}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.textName}>
                    {item.first_name} {item.last_name} 
                  </Text>
                  <Text style={styles.emailName}>{item.email}</Text>
                </View>
                <Image
                  source={{uri: item.avatar}}
                  style={{width: 100, height: 100}}
                />
              </View>
            );
          }):
          <ActivityIndicator size={'large'} color={'blue'}/>
          }
      </ScrollView>

      <TouchableOpacity style={styles.loginButton} onPress={signOut}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#28304f',
    width: '60%',
    padding: 20,
    marginTop: 30,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listView: {
    backgroundColor: '#c1d9e3',
    padding: 10,
    width: '90%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: '#ede7e6',
    marginVertical: 10,
    alignSelf:'center',
    width: '90%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emailName: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'normal',
  },
});
