import React ,{useState,useEffect} from 'react'
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';



const RootNavigation = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
   
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;
      if (!user) {
        return (
         <AuthStack />
        );
      }
      return(
        <AppStack />
      )
 
}

export default RootNavigation

