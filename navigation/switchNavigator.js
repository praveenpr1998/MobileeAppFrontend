import 'react-native-gesture-handler';

import {  createAppContainer,createSwitchNavigator } from 'react-navigation';
import StackNav from "./stackNavigator.js";
import DrawerNav from "./drawerNavigator.js";

const AppNavigator = createSwitchNavigator({
    Auth:StackNav,
    Drawer:DrawerNav
},{
    initialRouteName:'Auth'
});


const SwicthNav = createAppContainer(AppNavigator);
export default SwicthNav;