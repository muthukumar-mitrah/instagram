import { AppState, SafeAreaView, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './src/navigations/AuthStack'
import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import AuthContextProvider from './src/context/AuthContext'
import TrackPlayer from 'react-native-track-player'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if(nextAppState === 'inactive' || nextAppState === 'background') {
        console.log('nextAppState', nextAppState)
        TrackPlayer.stop()
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthContextProvider>
          <AuthStack />
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App