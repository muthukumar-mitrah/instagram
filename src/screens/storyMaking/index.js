import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer from 'react-native-track-player';
import Video from 'react-native-video'
import { postStory } from '../../Services';
import { useAuth } from '../../context/AuthContext';
import styles from './style';

const StoryMaking = ({ route, navigation }) => {

    const { res } = route?.params
    const [isLoading, setIsLoading] = useState(true)
    const [combinedUri, setCombinedUri] = useState({})
    const [audioFile, setAudioFile] = useState({})
    const { getAllStories } = useAuth()
    const [apiLoading, setApiLoading] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        TrackPlayer.setupPlayer()
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => { TrackPlayer.stop(); },
        );

        return () => backHandler.remove();
    }, []);

    const postYourStory = async () => {
        const userId = Math.floor(Math.random() * 100) + 1;
        const formData = new FormData();

        formData.append('file', {
            uri: res.uri,
            type: res.type,
            name: res.fileName
        })

        if(Object.keys(audioFile).length) {
            formData.append('media', {
                uri: audioFile.uri,
                type: audioFile.type,
                name: audioFile.name
            })
        }

        formData.append("userId", userId);
        formData.append("photoUrl", combinedUri.photoUrl || res.uri);
        formData.append("musicUrl", combinedUri.musicUrl || '');

        try {
            setApiLoading(true)
            const response = await postStory(formData)
            navigation.navigate('login')
            TrackPlayer.stop()
            getAllStories()
            console.log('Upload successful:', response);
        } catch(error) {
            console.error('Upload failed:', error);
        } finally {
            setApiLoading(false)
        }
    }

    const playAudio = async (uri) => {
        TrackPlayer.setupPlayer()
        await TrackPlayer.add({
            id: '1',
            url: uri,
            title: 'Hip Hop',
            artist: 'Muthukumar',
        });
        await TrackPlayer.play()
    };

    const pickAudio = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
            });
            console.log('Selected audio file:', result);

            if(result.length) {
                await TrackPlayer.reset()
                setCombinedUri({ photoUrl: res.uri, musicUrl: result[0].uri })
                playAudio(result[0].uri)
                setAudioFile(result[0])
            }
        } catch(error) {
            if(DocumentPicker.isCancel(error)) {
                console.log('Audio picker cancelled');
            } else {
                console.error('Error picking audio file:', error);
            }
        }
    }

    if(isLoading) {
        return <ActivityIndicator color={'orange'} size={50} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TouchableOpacity onPress={() => { navigation.navigate('login'); TrackPlayer.stop() }} style={{ backgroundColor: 'black', width: 100, padding: 5, borderRadius: 5, alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickAudio()} style={{ backgroundColor: 'skyblue', width: 150, padding: 5, borderRadius: 5, alignItems: 'center', alignSelf: 'flex-end' }}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Audio/Music</Text>
            </TouchableOpacity>
            {res?.type?.includes('image') ?
                <Image
                    source={{ uri: res.uri }}
                    style={styles.textImage}
                    resizeMode='stretch'
                />
                :
                <Video
                    source={{ uri: res.uri }}
                    style={styles.textImage}
                    controls={true}
                    resizeMode="contain"
                />
            }
            <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end', }}>
                <TouchableOpacity onPress={() => postYourStory()}
                    style={{
                        backgroundColor: 'green',
                        width: 100,
                        marginRight: 20,
                        marginBottom: 20,
                        padding: 5,
                        borderRadius: 5,
                        alignItems: 'center',
                        marginVertical: 10,
                        height: 40
                    }}
                    disabled={apiLoading}
                >
                    {apiLoading ?
                        <ActivityIndicator color={'white'} size={30} />
                        : <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500' }}>Send Story</Text>

                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StoryMaking;