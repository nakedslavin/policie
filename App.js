import { createStackNavigator } from 'react-navigation'
import Home from './components/Home'
import Detail from './components/Detail'

export default createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Detail: {
      screen: Detail
    }
  },
  { 
      initialRouteName: 'Home',
      headerMode:'none',
      mode:'stack'
  }
)