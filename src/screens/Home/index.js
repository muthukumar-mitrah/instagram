import { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { background, cameraIcon, closeImg, galleryIcon, instagramText, storyIcon, typoImg, userImg } from '../../assets'
import { useAuth } from '../../context/AuthContext'
import styles from './style'

const Login = ({ navigation }) => {
    const { getAllStories, stories } = useAuth()
    const [isVisible, setIsVisible] = useState(false)

    const openGallery = async () => {
        const options = {
            mediaType: 'mixed',
            quality: 1
        }
        setIsVisible(false)
        const result = await launchImageLibrary(options);
        console.log('gallery result', result)
        if(result?.assets[0].uri) {
            navigation.navigate('register', { res: result.assets[0] })
        }
    }

    const openCamera = async () => {
        setIsVisible(false)
        const result = await launchCamera({});
        console.log('camera result', result)
        if(result?.assets[0].uri) {
            navigation.navigate('register', { res: result.assets[0] })
        }
    }

    useEffect(() => {
        getAllStories()
    }, [])

    const style = isVisible ? { backgroundColor: '#00000066' } : {}
    console.log('isVisible', isVisible)

    return (
        <ImageBackground source={background} style={styles.container}>
            {/* <View style={[{ flex: 1 }, style]}> */}
                <Image source={instagramText} style={styles.textImage} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 30 }} onPress={() => setIsVisible(true)}>
                        <Image source={storyIcon} style={{ width: 50, height: 50 }} />
                        <Text style={styles.storyText}>Story</Text>
                    </TouchableOpacity>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {stories?.length ?
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('view')} style={{ borderWidth: 4, borderColor: 'lightgreen', borderRadius: 50, padding: 5, marginTop: 15, marginHorizontal: 15 }}>
                                    <Image source={userImg} style={styles.storyIcon} />
                                </TouchableOpacity>
                                <Text style={{ color: '#fff' }}>{'r_m_kumar_45'}</Text>
                            </View>
                            :
                            <></>
                        }
                    </ScrollView>
                </View>

                <Modal transparent={true} visible={isVisible}>
                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => setIsVisible(false)}>
                                <Image source={closeImg} style={styles.modalIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.wrapper} onPress={openCamera}>
                                <Image source={cameraIcon} style={styles.modalIcon} />
                                <Text style={styles.modalText}>Open Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.wrapper} onPress={openGallery}>
                                <Image source={galleryIcon} style={styles.modalIcon} />
                                <Text style={styles.modalText}>Open Gallery</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.wrapper} onPress={() => { navigation.navigate('text'); setIsVisible(false) }}>
                                <Image source={typoImg} style={styles.modalIcon} />
                                <Text style={styles.modalText}>Type a Story</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </Modal>
            {/* </View> */}
        </ImageBackground>
    )
}

export default Login