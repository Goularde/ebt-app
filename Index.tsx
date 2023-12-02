import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import AddBillScreen from "./screens/AddBillScreen";
import LogInScreen from "./screens/LogInScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "./context/UserContext";

export default function App() {
  const Tab = createBottomTabNavigator();
  const { user } = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <StatusBar translucent style={"dark"} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Add Bill") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              }
              //@ts-ignore
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FE6D73",
            tabBarInactiveTintColor: "gray",
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen
            name="Add Bill"
            component={AddBillScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <>
      <StatusBar translucent style={"dark"} />
      <LogInScreen />
    </>
  );
}
