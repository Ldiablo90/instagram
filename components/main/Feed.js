import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native'
import firebase from 'firebase';
require('firebase/firestore')
import { connect } from 'react-redux';

function Feed(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = [];
        if (props.usersLoaded == props.following.length) {
            console.log(props)
            props.following.forEach((follow) => {
                const user = props.users.find(el => el.uid === follow);
                if (user != undefined) {
                    posts = [...posts, ...user.posts]
                }
            })
            props.sort((x, y) => {
                return x.creation - y.creation;
            })
            setPosts(posts);
        }else{console.log('not same',props)}
    }, [props.usersLoaded])

    return (
        <View style={styles.container}>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.conatainerImage}
                        >
                            <Text
                                style={styles.container}>
                                {item.user.naem}
                            </Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    conatainerImage: {
        flex: 1 / 3
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following,
    users: store.usersState.users,
    usersLoade: store.usersState.usersLoaded
})

export default connect(mapStateToProps, null)(Feed)