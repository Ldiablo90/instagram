import React from 'react'
import { View, Text } from 'react-native'

export default function Feed() {
    return (
        <View>
            <Text>Feed</Text>
        </View>
    )
}

// import React from 'react'
// import { View, Text, Image, FlatList, StyleSheet } from 'react-native'

// import { connect } from 'react-redux';

// function Profile(props) {
//     const { currentUser, posts } = props;

//     return (
//         <View style={styles.container}>
//             <Text>{currentUser.naem}</Text>
//             <Text>{currentUser.email}</Text>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         marginTop: 40
//     }
// })

// const mapStateToProps = (store) => ({
//     currentUser: store.userState.currentUser,
//     posts: store.userState.posts
// })

// export default  connect(mapStateToProps, null)(Profile)