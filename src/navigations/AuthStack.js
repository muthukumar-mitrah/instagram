import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import StoryMaking from '../screens/storyMaking'
import ViewStory from '../screens/Story'
import SongListScreen from '../screens/Story/songlist'
import StoryByText from '../screens/Story/storyWithText'

const Stack = createNativeStackNavigator()

const AuthStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login' component={Home} />
            <Stack.Screen name='register' component={StoryMaking} />
            <Stack.Screen name='view' component={ViewStory} />
            <Stack.Screen name='song' component={SongListScreen} />
            <Stack.Screen name='text' component={StoryByText} />
        </Stack.Navigator>
    )
}

export default AuthStack