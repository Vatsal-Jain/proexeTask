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
 const [loading,setLoading] = useState(false)
  
  const fetchDataFromRedux = useSelector(state => state.usersList);

  const getData = () => {
    if(fetchDataFromRedux.length < 12){
    fetch("https://reqres.in/api/users?page=1", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json =>{
      const resp = json.data;
      resp.forEach((item) => {
       
        dispatch(fetchData(item))
      })
     
    
       //   dispatch(fetchData(json.data));
          //setData(json.data)
       
     
  
 
})
    }}



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


  const handleEndReached = () =>{
    setLoading(true)
    if(fetchDataFromRedux.length < 12){
    fetch("https://reqres.in/api/users?page=2", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json =>{
        const resp = json.data;
        resp.forEach((item) => {
          dispatch(fetchData(item))
        })
      })

}else{
  console.log("cannot perform pagination end of data")
}
setLoading(false)
  }



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
     

      <FlatList 
      data={fetchDataFromRedux}
      ItemSeparatorComponent={() => <View style={{marginBottom:10}}/>}
      contentContainerStyle={{width:'90%',alignSelf:'center'}}
      keyExtractor={(item) => item.id}
      onEndReached={handleEndReached}

      onEndReachedThreshold={1}
      renderItem={({item}) => {
        if(item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ){
                 return(
          <View style={styles.listView} >
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
        )
              }
             
      }}
      />
      {loading && <ActivityIndicator />} 

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
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
  
    
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
