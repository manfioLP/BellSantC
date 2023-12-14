import {useSession} from "@descope/react-native-sdk";
import {Redirect, Stack} from "expo-router";

export default function AppLayout() {
	const { session } = useSession()

	if (!session) {
		return <Redirect href={"/login"}/>
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			{/*<Stack.Screen name="modal" options={{ presentation: 'modal' }} />*/}
		</Stack>
	)
}
