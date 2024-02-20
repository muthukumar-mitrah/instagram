import { SafeAreaView, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './src/navigations/AuthStack'
import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App