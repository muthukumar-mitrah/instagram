import { StyleSheet } from 'react-native'
import { horizontalScale, moderateScale, verticalScale } from '../../styles/metrics'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    storyText: { color: '#fff', fontSize: 26, fontWeight: 'bold', fontFamily: 'cursive' },
    textImage: {
        width: horizontalScale(200),
        height: verticalScale(60),
        alignSelf: 'center',
        marginVertical: verticalScale(10)
    },
    storyIcon: { width: 50, height: 50 },
    modal: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    modalContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 10 },
    wrapper: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    modalIcon: { width: 30, height: 30, marginRight: 8 },
    modalText: { fontSize: 18, color: '#000', fontWeight: '500' }
})

export default styles