import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";



export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password: '',
            name:''
        }
        this.onSignUp = this.onSignUp.bind(this)
    };
    
    onSignUp(){
        const { email, password, name } = this.state;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(function (result) {
                var db = getFirestore();
                setDoc(doc(db, "users",auth.currentUser.uid),{ name, email })
             })
            .catch((err)=> { console.log("out",err) })
    }
    render() {
        return (
            <View>
                <TextInput 
                    placeholder='name'
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput 
                    placeholder='email'
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput 
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button
                    onPress={() => this.onSignUp()}
                    title='Sign Up'
                />
            </View>
        )
    }
}

export default Register
