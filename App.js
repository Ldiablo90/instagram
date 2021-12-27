import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import LandingScreen from "./components/auth/Landing"
import RagisterScreen from "./components/auth/Register"
import LoginScreen from "./components/auth/Login"
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import rootReducer from './redux/reducers'

const firebaseConfig = {
  apiKey: "AIzaSyD1MyUVpZat8OlUm4ul3UEVEvPOHqgWjNE",
  authDomain: "instagram-dev-react-64c9d.firebaseapp.com",
  projectId: "instagram-dev-react-64c9d",
  storageBucket: "instagram-dev-react-64c9d.appspot.com",
  messagingSenderId: "814968229243",
  appId: "1:814968229243:web:bb6f77e622e93825f6c1de",
  measurementId: "G-GW14GX3NNT"
};

const store = createStore(rootReducer, applyMiddleware(thunk))
console.log(firebase);
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  console.log('initializeApp')
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    } else if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lading">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RagisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
