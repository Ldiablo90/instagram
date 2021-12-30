import firebase from 'firebase';
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE,USERS_POSTS_STATE_CHANGE } from '../constants/index'

export function fetchUser() {

    return (dispatch) => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                console.log(snapshot)
            })
            .catch((err) => { console.log(`dose not exist ${err}`) })
    }
}

export function fetchUserPosts() {
    return (dispatch) => {
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection('userPosts')
            .orderBy('creation', 'asc')
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc =>{
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data}
                });
                dispatch({type: USER_POSTS_STATE_CHANGE, posts})
            })
            .catch((err) => { console.log(`dose not exist ${err}`) })
    }
}

export function fetchUserFollowing() {
    return (dispatch) => {
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc =>{
                    const id = doc.id;
                    return { id } 
                });
                dispatch({type: USER_FOLLOWING_STATE_CHANGE, following});
                following.forEach((follow)=>{
                    dispatch(fetchUsersData(follow.id))
                })
                
            })
    }
}

export function fetchUsersData(uid){
    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if(!found) {
            firebase.firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    let user = snapshot.data();
                    user.uid = snapshot.id;
                    dispatch({ type: USERS_DATA_STATE_CHANGE, user })
                    dispatch(fetchUsersFollowingPosts(user.uid));
                }
            })
            .catch((err) => { console.log(`dose not exist ${err}`) })
        }
    })
}

export function fetchUsersFollowingPosts(uid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection('posts')
            .doc(uid)
            .collection('userPosts')
            .orderBy('creation', 'asc')
            .get()
            .then((snapshot) => {
                const user = getState().usersState.users.find(el => el.uid === uid);
                let posts = snapshot.docs.map(doc =>{
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data, user }
                });
                dispatch({type: USERS_POSTS_STATE_CHANGE, posts, uid })
            })
            .catch((err) => { console.log(`dose not exist ${err}`) })
        }
    )
}
