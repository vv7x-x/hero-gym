import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MyQRScreen from './screens/MyQRScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import PaymentsScreen from './screens/PaymentsScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ title: 'نادي هيرو الرياضي' }}
                />
                <Stack.Screen 
                    name="MyQR" 
                    component={MyQRScreen} 
                    options={{ title: 'باركود الحضور' }}
                />
                <Stack.Screen 
                    name="Attendance" 
                    component={AttendanceScreen} 
                    options={{ title: 'سجل الحضور' }}
                />
                <Stack.Screen 
                    name="Workouts" 
                    component={WorkoutsScreen} 
                    options={{ title: 'برامج التمارين' }}
                />
                <Stack.Screen 
                    name="Payments" 
                    component={PaymentsScreen} 
                    options={{ title: 'الاشتراكات' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;