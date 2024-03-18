import { View, Text, Image, TouchableOpacity, Alert, Dimensions, BackHandler } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import TrackPlayer from 'react-native-track-player'
import { useAuth } from '../../context/AuthContext'
import { deleteStories } from '../../Services'
import Video from 'react-native-video'
import { userImg } from '../../assets'
import { useEffect } from 'react'

const ViewStory = ({ navigation, route }) => {
    const { getAllStories, stories } = useAuth()

    const handleDeleteStory = async (id) => {
        try {
            const deleteStory = await deleteStories(id)
            console.log('deleteStory response:', deleteStory)
            TrackPlayer.stop()
            navigation.goBack()
            getAllStories()
        } catch(error) {
            console.error('deleteStory error:', error)
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => { TrackPlayer.stop() },
        );

        return async () => {
            backHandler.remove();
        }
    }, []);

    const timeSince = (date) => {
        let seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        interval = seconds / 3600;

        if(interval > 1) {
            return Math.floor(interval) + " hrs";
        }
        interval = seconds / 60;
        if(interval > 1) {
            return Math.floor(interval) + " mins";
        }
        return Math.floor(seconds) + " sec";
    }

    const playAudio = async (uri) => {
        
        await TrackPlayer.reset()
        TrackPlayer.setupPlayer()
        await TrackPlayer.add({
            id: '1',
            url: uri,
            title: 'Hip Hop',
            artist: 'Muthukumar',
        });
        await TrackPlayer.play()
    };

    const handleDelete = (id) => {
        Alert.alert('Are you sure want to delete this story?', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => handleDeleteStory(id) },
        ])
    }

    console.log('stories.length', stories.length)

    let count = 0

    return (
        <View style={{ flex: 1 }}>
            <SwiperFlatList
                autoplay
                autoplayDelay={30}
                autoplayLoop
                index={0}
                showPagination={stories.length === 1 ? false : true}
                onChangeIndex={async (idx) => {
                    if(stories[idx.index]?.musicUrl) {
                        console.log('tories[idx.index].musicUrl', stories[idx.index].musicUrl)
                        playAudio(stories[idx.index].musicUrl)
                    } else {
                        await TrackPlayer.reset()
                        TrackPlayer.stop()
                    }
                }}
                paginationStyleItem={{ width: 100, height: 2 }}
                data={stories}
                style={{ flex: 1 }}
                role=''
                renderItem={({ item, index }) => {
                    const isVideo = (item.photoUrl?.includes('.mp4')) ? true : false

                    if(index === 0 && stories[index]?.musicUrl && !count) {
                        count = count + 1
                        playAudio(stories[index].musicUrl)
                    }

                    return (
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('login');
                                    TrackPlayer.stop()
                                }}
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={userImg} style={{ width: 40, height: 40, marginRight: 10 }} />
                                    <View>
                                        <Text style={{ color: '#000000', fontWeight: '500', }}>r_m_kumar_45</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>{`${timeSince(new Date(item?.time))} ago`}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleDelete(item._id)}
                                    style={{ backgroundColor: 'red', width: 80, padding: 5, borderRadius: 5, alignItems: 'center', }}
                                >
                                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>Delete</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                            {item?.text ?
                                <View style={{
                                    width: Dimensions.get('window').width,
                                    height: Dimensions.get('window').height,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#DCDCDC'
                                }}>
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>
                                        {item.text}
                                    </Text>
                                </View>
                                : isVideo ?
                                    <Video
                                        source={{ uri: item.photoUrl }}
                                        style={{
                                            width: Dimensions.get('window').width,
                                            height: Dimensions.get('window').height
                                        }}
                                        resizeMode="contain"
                                    />
                                    :
                                    <Image
                                        source={{ uri: item.photoUrl }}
                                        style={{
                                            width: Dimensions.get('window').width,
                                            height: Dimensions.get('window').height
                                        }}
                                    />
                            }
                        </View >
                    )
                }}
            />
        </View>
    )
}

export default ViewStory