import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native'
import firebase from 'firebase';
require('firebase/firestore')
import { connect } from 'react-redux';

function Profile(props) {

    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const { currentUser, posts } = props;
        
        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        } else {
            firebase.firestore()
                .collection('users')
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser( snapshot.data())
                    }
                })
                .catch((err) => { console.log(`dose not exist ${err}`) })
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .orderBy('creation', 'asc')
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    setUserPosts( posts )
                })
                .catch((err) => { console.log(`dose not exist ${err}`) })
        }
        if(props.following.findIndex((e) => e.id === props.route.params.uid ) > -1 ){
            setFollowing(true);
            console.log('over -1')
        }else{
            setFollowing(false);
            console.log('not over -1')
        }
        props.following.forEach(element => {
            console.log(element)
            console.log(props.route.params.uid)
        });

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnFollow = () => {
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
            .doc(props.route.params.uid)
            .delete()
    }

    if (user === null) {
        return <View></View>
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
                {
                    props.route.params.uid !== firebase.auth().currentUser.uid? (
                        <View>
                            {following? 
                            (
                                <Button
                                    title='UnFollowing'
                                    onPress={()=>onUnFollow()}
                                />
                            ):
                            (
                                <Button
                                    title='Follow'
                                    onPress={()=>onFollow()}
                                />
                            )}
                        </View>
                    ): null
                }
            </View>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.conatainerImage}
                        >
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
    following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile)