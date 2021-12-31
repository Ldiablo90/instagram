import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation }) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [carmera, setCarmera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStaus = await ImagePicker.requestCameraPermissionsAsync()
            setHasGalleryPermission(galleryStaus.status === 'granted')

        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const takePicture = async () => {
        if (carmera) {
            const data = await carmera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    
    if (hasCameraPermission === null || hasGalleryPermission === false) {
        return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={ref => setCarmera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'}>

                </Camera>
            </View>

            <Button
                title='Flip Image'
                onPress={() => {
                    setType(type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                }} >
            </Button>
            <Button title='Take Picture' onPress={() => takePicture()} />
            <Button title='Pick Image From Gallery' onPress={() => pickImage()} />
            <Button title='Save' onPress={() => navigation.navigate('Save', {image})} />
            {image && <Image source={{ uri: image }} style={{ flex: 1 }} style={{ flex: 1 }} />}
        </View>
    );
}
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
});


// import React from 'react'
// import { View, Text } from 'react-native'

// export default function Add() {
//     return (
//         <View>
//             <Text>Add</Text>
//         </View>
//     )
// }
