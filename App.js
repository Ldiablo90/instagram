import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native'
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from "./components/auth/Landing"
import RagisterScreen from "./components/auth/Register"

const firebaseConfig = {
  apiKey: "AIzaSyD1MyUVpZat8OlUm4ul3UEVEvPOHqgWjNE",
  authDomain: "instagram-dev-react-64c9d.firebaseapp.com",
  projectId: "instagram-dev-react-64c9d",
  storageBucket: "instagram-dev-react-64c9d.appspot.com",
  messagingSenderId: "814968229243",
  appId: "1:814968229243:web:bb6f77e622e93825f6c1de",
  measurementId: "G-GW14GX3NNT"
};

if(firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }
  componentDidMount(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex:1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }else if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lading">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown:false }}/>
            <Stack.Screen name="Register" component={RagisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return(
      <View style={{ flex:1, justifyContent: 'center' }}>
        <Text>User is logged in</Text>
      </View>
    )
  }
}

export default App
