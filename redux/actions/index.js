import { getFirestore, collection, doc, getDoc  } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

import { USER_STATE_CHANGE } from '../constants/index'

export function fetchUser () {
    const db = getFirestore();
    const auth = getAuth();
    return ((dispatch)=>{
        getDoc(doc(db, 'users', auth.currentUser.uid))
        .then((snapshot) => {
            if(snapshot.exists){
                dispatch({ type: USER_STATE_CHANGE, currentUser : snapshot.data() })
            }else{
                console.log('does not exist')
            }
        })
    })
}
