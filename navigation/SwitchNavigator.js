import 'react-native-gesture-handler';

import {  createAppContainer,createSwitchNavigator } from 'react-navigation';
import StackNav from "./StackNavigator.js";
import DrawerNav from "./DrawerNavigator.js";

const AppNavigator = createSwitchNavigator({
    Auth:StackNav,
    Drawer:DrawerNav
},{
    initialRouteName:'Auth'
});

const SwicthNav = createAppContainer(AppNavigator);
export default SwicthNav;
