import { View, Text, ImageBackground, Image, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { background, cameraIcon, galleryIcon, instagramText, storyIcon, userImg } from '../../assets'
import styles from './style'
import { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getStories } from '../../Services';

const Login = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [stories, setStories] = useState([])

    const openGallery = async () => {
        setIsVisible(false)
        const result = await launchImageLibrary({ videoQuality: 'high', mediaType: 'mixed' });
        console.log('gallery result', result)
        if(result?.assets[0].uri) {
            navigation.navigate('register', { res: result.assets[0] })
        }
    }

    const openCamera = async () => {
        const result = await launchCamera();
        console.log('camera result', result)
    }

    const getFiles = async () => {
        try {
            const res = await getStories()
            console.log('res', res)
            setStories(res)
        } catch(error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        getFiles()
    }, [navigation])

    // useFocusEffect(() => {
    //     // getFiles()
    // },[])


    return (
        <ImageBackground source={background} style={styles.container}>
            <Image source={instagramText} style={styles.textImage} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 30 }} onPress={() => setIsVisible(v => !v)}>
                    <Image source={storyIcon} style={styles.storyIcon} />
                    <Text style={styles.storyText}>Story</Text>
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {stories.map((val, idx) => {
                        return (
                            <View key={idx} style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('view', { ...val })} style={{ borderWidth: 4, borderColor: 'lightgreen', borderRadius: 50, padding: 5, marginTop: 15, marginHorizontal: 15 }}>
                                    <Image source={userImg} style={styles.storyIcon} />
                                </TouchableOpacity>
                                <Text style={{ color: '#fff' }}>user name</Text>
                            </View>
                        )
                    })
                    }
                </ScrollView>
            </View>



            <Modal transparent={true} visible={isVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.wrapper} onPress={openCamera}>
                            <Image source={cameraIcon} style={styles.modalIcon} />
                            <Text style={styles.modalText}>Open Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.wrapper} onPress={openGallery}>
                            <Image source={galleryIcon} style={styles.modalIcon} />
                            <Text style={styles.modalText}>Open Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

export default Login