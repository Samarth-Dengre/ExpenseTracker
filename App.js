import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import ManageExpenseScreen from "./screens/ManageExpenseScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenseContext";
export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();
  const ExpensesOverview = () => {
    return (
      <BottomTab.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => {
                  navigation.navigate("ManageExpenses");
                }}
              />
            );
          },
        })}
      >
        <BottomTab.Screen
          name="Recent"
          component={RecentExpensesScreen}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="hourglass" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="AllExpenses"
          component={AllExpensesScreen}
          options={{
            title: "All Expenses",
            tabBarLabel: "All",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="calendar" size={size} color={color} />;
            },
          }}
        />
      </BottomTab.Navigator>
    );
  };
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenseScreen}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
