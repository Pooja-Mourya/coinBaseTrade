import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, DrawerActions} from '@react-navigation/drawer';
import {Alert, AppState, ToastAndroid, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './src/screens/home/Home';
import Trending from './src/screens/trending/Trending';
import TopUp from './src/screens/Option/Option';
import Graph from './src/screens/Finance/Finance';
import Splash from './src/screens/Splash';
import SignIn from './src/screens/SignIn';
import Register from './src/screens/user/Register';
import UserList from './src/screens/user/list/UserList';
import Funds from './src/screens/user/funds/Funds';
import Withdraw from './src/screens/user/withdraw/Withdraw';
import Complains from './src/screens/user/complains/Complains';
import UsersCoins from './src/screens/user/allUsersCoins/UsersCoins';
import GenerateReport from './src/screens/user/report/GenerateReport';
import CustomTabNavigation from './src/navigation/CustomTabNavigation';
import CustomDrawerNavigation from './src/navigation/CustomDrawerNavigation';
import {useDispatch, useSelector} from 'react-redux';
import BTC from './src/screens/Option/btc/BTC';
import ETH from './src/screens/Option/etc/ETH';
import UserProfile from './src/screens/profile/UserProfile';
import WithdrawList from './src/screens/Finance/withdraw/WithdrawList';
import UserTransaction from './src/screens/Finance/balance/UserTransaction';
import Portfolio from './src/screens/trending/Portfolio';
import SellCoin from './src/screens/trending/SellCoin';
import BuyCoin from './src/screens/trending/BuyCoin';
import Notification from './src/screens/Notification';
import BankPay from './src/screens/Finance/deposit/BankPay';
import QRPay from './src/screens/Finance/deposit/QRPay';
import UPIPay from './src/screens/Finance/deposit/UPIPay';
import Online from './src/screens/Finance/deposit/Online';
import UserSupport from './src/screens/userSupport/UserSupport';
import Convert from './src/screens/convert/Convert';
import NetInfo from '@react-native-community/netinfo';
import {NotificationCount} from './src/redux/AuthSlice';
import apiService from './src/redux/apiService';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabNavigation {...props} />}
      screenOptions={({route}) => ({
        tabBarBadge: 5,
        tabBarBadgeStyle: {
          color: 'white',
          backgroundColor: 'red',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trending" component={Trending} />
      <Tab.Screen name="Option" component={TopUp} />
      <Tab.Screen name="Finance" component={Graph} />
      <Tab.Screen name="Notification" component={Notification} />
    </Tab.Navigator>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerNavigation {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}>
      <Drawer.Screen name="Dashboard" component={MyTabs} />
      <Drawer.Screen name="UserProfile" component={UserProfile} />
      <Drawer.Screen name="User Support" component={UserSupport} />
      {/* <Drawer.Screen name="Blog" component={UserProfile} />
      <Drawer.Screen name="Community" component={UserProfile} /> */}
      <Drawer.Screen name="Convert" component={Convert} />
    </Drawer.Navigator>
  );
}

function StackNavigation({token}) {
  const navigation = useNavigation();
  useEffect(() => {
    if (token) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeTabs'}],
        }),
      );
    }
  }, [token, navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerTitleStyle: {fontWeight: 'bold'},
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />

      {/* option  */}
      <Stack.Screen name="BTC" component={BTC} options={{headerShown: false}} />
      <Stack.Screen name="ETH" component={ETH} options={{headerShown: false}} />

      {/* finance  */}
      <Stack.Screen
        name="WithdrawList"
        component={WithdrawList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserTransaction"
        component={UserTransaction}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Online"
        component={Online}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UPIPay"
        component={UPIPay}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QRPay"
        component={QRPay}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BankPay"
        component={BankPay}
        options={{headerShown: false}}
      />
      {/* trending */}
      <Stack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuyCoin"
        component={BuyCoin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SellCoin"
        component={SellCoin}
        options={{headerShown: false}}
      />
      {/* user  */}
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Funds"
        component={Funds}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Withdraw"
        component={Withdraw}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Complains"
        component={Complains}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UsersCoins"
        component={UsersCoins}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GenerateReport"
        component={GenerateReport}
        options={{headerShown: false}}
      />

      {/* HomeTabs */}
      <Stack.Screen
        name="HomeTabs"
        component={DrawerNavigation}
        options={{
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Icon name="menu" size={30} style={{marginLeft: 10}} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [token, setToken] = useState();
  const jsonValue = useSelector(state => state.auth.userData);
  const [appState, setAppState] = useState(AppState.currentState);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.auth.profileData);

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  {
    !isConnected && Alert.alert('Network Alert', 'You are offline!');
  }
  useEffect(() => {
    if (jsonValue) {
      setToken(jsonValue);
    }
  }, [jsonValue]);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        setAppState(nextAppState);
        if (nextAppState === 'active') {
          // clearTokenAfterInactivity();
        } else if (nextAppState === 'background') {
          setLastInteractionTime(Date.now());
        }
      },
    );

    return () => {
      appStateListener.remove();
    };
  }, [lastInteractionTime, token]);

  useEffect(() => {
    if (!profileData?.user?._id) {
      return;
    }
    const fetchNotification = async () => {
      try {
        const res = await apiService({
          endpoint: `/notification/getById/${profileData?.user?._id}`,
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        dispatch(NotificationCount(res.notifications.length));
      } catch (error) {
        console.log('notification error : ', error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };
    fetchNotification();
  }, [profileData?.user?._id, token]);
  return (
    <NavigationContainer>
      <StackNavigation token={token} />
    </NavigationContainer>
  );
}
