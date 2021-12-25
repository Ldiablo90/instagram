import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import  { getStorage, getBytes, ref, getDownloadURL} from "firebase/storage";


export default function Save(props) {
    const [caption, setcaption] = useState('')

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${getAuth().currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(uri)
        const blob = await response.blob();
        const ref = ref(getStorage(), childPath)
        const task = getBytes(ref,bolb)
        console.log(task);
        const taskProgress = snapshot => {
            console.log(`reansferred: ${snapshot.bytesTrasnferred}`)
        }
        const taskCompleted = () => {
            getDownloadURL(ref).then((snapshot) =>{
                console.log(snapshot)
            })
        }
        const taskErro = snapshot => {
            console.log(snapshot)
        }
        task.on('state_changed', taskProgress, taskErro, taskCompleted)
    }
    return (
        <View style={{flex:1}}>
            <Image source={{uri: props.route.params.image}}/>
            <TextInput
                placeholder='Write a Caption . . .'
                onChangeText={(caption) => setcaption(caption)}    
            />
            <Button title='Save' onPress={() => uploadImage()}/>
        </View>
    )
}
