import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video'
import styles from './style';
import { postStory } from '../../Services';

const Register = ({ route, navigation }) => {

    const { res } = route?.params
    const [isLoading, setIsLoading] = useState(true)


    console.log('res', res)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    const postYourStory = async () => {

        const formData = new FormData();

        // Append each key-value pair from the object to the FormData
        Object.keys(res).forEach(key => {
            formData.append(key, res[key]);
        });


        formData.append('files', res);

        console.log('firstformData', formData)

        try {
            const response = await postStory(formData)
            navigation.navigate('login')
            console.log('Upload successful:', response);
        } catch(error) {
            console.error('Upload failed:', error);
        }

    }

    if(isLoading) {
        return <ActivityIndicator color={'orange'} size={50} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />

    }
    console.log('route?.params', route?.params)
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ backgroundColor: 'black', width: 100, padding: 5, borderRadius: 5, alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'skyblue', width: 150, padding: 5, borderRadius: 5, alignItems: 'center', alignSelf: 'flex-end' }}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Audio/Music</Text>
            </TouchableOpacity>
            {res?.type?.includes('image') ?
                <Image source={{ uri: res.uri }} style={styles.textImage} />
                :
                <Video
                    source={{ uri: res.uri }}
                    style={styles.textImage}
                    controls={true}
                    resizeMode="contain" // or 'cover' or 'stretch'

                />
            }
            <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end', }}>
                <TouchableOpacity onPress={() => postYourStory()} style={{ backgroundColor: 'green', width: 100, marginRight: 20, marginBottom: 20, padding: 5, borderRadius: 5, alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500' }}>Send Story</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register