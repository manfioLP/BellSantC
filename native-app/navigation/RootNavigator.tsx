
import { RootStack } from "./index";
import { useSession } from "@descope/react-native-sdk";
import LoginScreen from "../app/login";
import ModalScreen from "../app/modal";
import TabLayout from "../app/(tabs)/_layout";
import {Redirect, Stack} from "expo-router";
import {cache} from "@babel/traverse";
function RootNavigator() {
    const { session, clearSession, manageSession } = useSession()

    console.log("session", session)
    if (!session) {
        return <Redirect href={"/login"}/>
    }

    return (<Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>)
    // return (
    //     <Stack>
    //         {session ? (
    //             <>
    //                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //                 <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    //             </>
    //         ) : (
    //             <Stack.Screen name="login" options={{ headerShown: false }}/>
    //         )}
    //     </Stack>
    // )
    // return (
    //     <RootStack.Navigator>
    //         {session ? (
    //             <>
    //                 <RootStack.Screen component={TabLayout} name="(tabs)" options={{ headerShown: false }} />
    //                 <RootStack.Screen component={ModalScreen} name="modal" options={{ presentation: 'modal' }} />
    //             </>
    //         ) : (
    //             <RootStack.Screen component={LoginScreen} name="login" options={{ headerShown: false }}/>
    //         )}
    //     </RootStack.Navigator>
    // )
}

export default RootNavigator;
