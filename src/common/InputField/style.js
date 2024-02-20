import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputWrapper: {
        borderColor: '#231F20',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 10
    },
    input: {
        color: '#231F20',
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        flex: 1,
        width: '100%'
    },
    label: {
        color: '#231F20'
    },
    icon: {
        marginRight: 10,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    error: {
        borderColor: 'red'
    },
    errorText: {
        color: 'red'
    }
})