import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Screens — Auth
import SplashScreen  from '../screens/SplashScreen';
import Landing      from '../screens/Landing';
import Onboarding   from '../screens/Onboarding';
import Login        from '../screens/Login';
import SignupRider  from '../screens/SignupRider';
import SignupDriver from '../screens/SignupDriver';
import AdminLogin   from '../screens/admin/AdminLogin';

// Rider
import RiderHome     from '../screens/rider/Home';
import RiderHistory  from '../screens/rider/History';
import RiderProfile  from '../screens/rider/Profile';
import RiderTracking from '../screens/rider/Tracking';
import RiderRate     from '../screens/rider/Rate';

// Driver
import DriverDashboard from '../screens/driver/Dashboard';
import DriverEarnings  from '../screens/driver/Earnings';
import DriverProfile   from '../screens/driver/Profile';

// Admin
import AdminOverview from '../screens/admin/Overview';
import AdminUsers    from '../screens/admin/Users';
import AdminRides    from '../screens/admin/Rides';
import AdminSafety   from '../screens/admin/Safety';
import AdminAI       from '../screens/admin/AI';

const Stack = createStackNavigator();
const Tab   = createBottomTabNavigator();

const screenOpts = {
  headerShown: false,
  cardStyle: { backgroundColor: '#FAFAFA' },
};

const tabBarOpts = {
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#EBEBEB',
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 12,
  },
  tabBarActiveTintColor: '#111111',
  tabBarInactiveTintColor: '#AAAAAA',
  tabBarLabelStyle: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  headerShown: false,
};

function RiderTabs() {
  return (
    <Tab.Navigator screenOptions={tabBarOpts}>
      <Tab.Screen name="Home"    component={RiderHome}
        options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home"    size={size} color={color} /> }} />
      <Tab.Screen name="History" component={RiderHistory}
        options={{ tabBarLabel: 'Rides', tabBarIcon: ({ color, size }) => <Ionicons name="time"    size={size} color={color} /> }} />
      <Tab.Screen name="Profile" component={RiderProfile}
        options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

function DriverTabs() {
  return (
    <Tab.Navigator screenOptions={tabBarOpts}>
      <Tab.Screen name="Dashboard" component={DriverDashboard}
        options={{ tabBarLabel: 'Dashboard', tabBarIcon: ({ color, size }) => <Ionicons name="grid"        size={size} color={color} /> }} />
      <Tab.Screen name="Earnings"  component={DriverEarnings}
        options={{ tabBarLabel: 'Earnings',  tabBarIcon: ({ color, size }) => <Ionicons name="wallet"      size={size} color={color} /> }} />
      <Tab.Screen name="DProfile"  component={DriverProfile}
        options={{ tabBarLabel: 'Profile',   tabBarIcon: ({ color, size }) => <Ionicons name="person"      size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator screenOptions={tabBarOpts}>
      <Tab.Screen name="Overview" component={AdminOverview}
        options={{ tabBarLabel: 'Overview', tabBarIcon: ({ color, size }) => <Ionicons name="grid"        size={size} color={color} /> }} />
      <Tab.Screen name="Users"    component={AdminUsers}
        options={{ tabBarLabel: 'Users',    tabBarIcon: ({ color, size }) => <Ionicons name="people"      size={size} color={color} /> }} />
      <Tab.Screen name="Rides"    component={AdminRides}
        options={{ tabBarLabel: 'Rides',    tabBarIcon: ({ color, size }) => <Ionicons name="map"         size={size} color={color} /> }} />
      <Tab.Screen name="Safety"   component={AdminSafety}
        options={{ tabBarLabel: 'Safety',   tabBarIcon: ({ color, size }) => <Ionicons name="shield"      size={size} color={color} /> }} />
      <Tab.Screen name="AI"       component={AdminAI}
        options={{ tabBarLabel: 'AI',       tabBarIcon: ({ color, size }) => <Ionicons name="sparkles"    size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      {/* Splash — always first */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="Landing"     component={Landing} />
      <Stack.Screen name="Onboarding"  component={Onboarding} />
      <Stack.Screen name="Login"       component={Login} />
      <Stack.Screen name="SignupRider" component={SignupRider} />
      <Stack.Screen name="SignupDriver"component={SignupDriver} />
      <Stack.Screen name="AdminLogin"  component={AdminLogin} />

      <Stack.Screen name="RiderApp"    component={RiderTabs} />
      <Stack.Screen name="RiderTracking" component={RiderTracking} />
      <Stack.Screen name="RiderRate"   component={RiderRate} />

      <Stack.Screen name="DriverApp"   component={DriverTabs} />
      <Stack.Screen name="AdminApp"    component={AdminTabs} />
    </Stack.Navigator>
  );
}
