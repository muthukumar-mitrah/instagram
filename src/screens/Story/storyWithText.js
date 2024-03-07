import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React from 'react'

const StoryByText = () => {
    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={{ flex: 1, fontSize: 28, alignSelf: 'center' }}
                multiline={true}
                placeholder='Type a Story'
            />
            <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end', }}>
                <TouchableOpacity onPress={() => {}} style={{ backgroundColor: 'green', width: 100, marginRight: 20, marginBottom: 20, padding: 5, borderRadius: 5, alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500' }}>Send Story</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default StoryByText;