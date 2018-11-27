import { createStackNavigator , createAppContainer} from 'react-navigation';
//import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/login.js';
import Quiz from '../screens/quiz.js';

const AppStackNavigator = createStackNavigator({
    Login : {screen : LoginScreen} ,    
    AfterLogin : {screen : Quiz}
})

// const TabNavigator = createBottomTabNavigator({
//     Login : {screen:LoginScreen} ,    
//     AfterLogin : {screen:AfterLoginScreen}
//   });

const Navigator = createAppContainer(AppStackNavigator);


export default Navigator;

 