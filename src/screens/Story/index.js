import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { horizontalScale, verticalScale } from '../../styles/metrics'

const ViewStory = ({ navigation, route }) => {
    console.log('route', route?.params)

    useEffect(() => {

    }, [])



    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ backgroundColor: 'black', width: 100, margin: 20, padding: 5, borderRadius: 5, alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500' }}>Back</Text>
            </TouchableOpacity>
            <Image source={{ uri: route.params?.uri }} style={{
                width: horizontalScale(300),
                height: verticalScale(600),
                alignSelf: 'center',
                marginVertical: verticalScale(10)
            }} />
        </View>
    )
}

export default ViewStory