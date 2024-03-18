import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text, BackHandler, ToastAndroid } from 'react-native'
import { emojiImg } from '../../assets';
import { horizontalScale, verticalScale } from '../../styles/metrics';
import EmojiPicker from 'rn-emoji-keyboard';
import { useAuth } from '../../context/AuthContext';
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer from 'react-native-track-player';
import { postStory } from '../../Services';

const StoryByText = ({ navigation }) => {
    const [text, setText] = useState('')
    const [musicUrl, setMusicUrl] = useState('')
    const { getAllStories } = useAuth()

    const postYourStory = async () => {

        if(!text) {
            ToastAndroid.show('Please type story then posting it', ToastAndroid.SHORT)
            return
        }

        const userId = Math.floor(Math.random() * 100) + 1;
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("text", text);
        formData.append("musicUrl", musicUrl || '');

        try {
            const response = await postStory(formData)
            navigation.navigate('login')
            TrackPlayer.stop()
            getAllStories()
            console.log('Upload successful:', response);
        } catch(error) {
            console.error('Upload failed:', error);
        }
    }
    console.log('text', text)
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
                setMusicUrl(result[0].uri)
                playAudio(result[0].uri)
            }
        } catch(error) {
            if(DocumentPicker.isCancel(error)) {
                console.log('Audio picker cancelled');
            } else {
                console.error('Error picking audio file:', error);
            }
        }
    }

    useEffect(() => {
        TrackPlayer.setupPlayer()
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => { TrackPlayer.stop(); },
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('login'); TrackPlayer.stop() }} style={{ backgroundColor: 'black', width: 100, padding: 5, borderRadius: 5, alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, color: '#fff' }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickAudio()} style={{ backgroundColor: 'skyblue', width: 150, padding: 5, borderRadius: 5, alignItems: 'center', marginRight: 20 }}>
                    <Text style={{ fontSize: 18, color: '#fff' }}>Audio/Music</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={{ flex: 1, fontSize: 28, alignSelf: 'center', }}
                multiline={true}
                placeholder='Type a Story'
                inlineImageLeft='search_icon'
                onChangeText={(text) => setText(text)}
            />
            <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end', }}>
                <TouchableOpacity onPress={() => postYourStory()} style={{ backgroundColor: 'green', width: 100, marginRight: 20, marginBottom: 20, padding: 5, borderRadius: 5, alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500' }}>Send Story</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default StoryByText;