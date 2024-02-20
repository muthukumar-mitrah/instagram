import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/login'
import Register from '../screens/register'
import ViewStory from '../screens/Story'

const Stack = createNativeStackNavigator()

const AuthStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='register' component={Register} />
            <Stack.Screen name='view' component={ViewStory} />
        </Stack.Navigator>
    )
}

export default AuthStack