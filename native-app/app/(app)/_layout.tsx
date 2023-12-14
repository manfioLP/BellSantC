import {useSession} from "@descope/react-native-sdk";
import {Redirect, Stack, useFocusEffect} from "expo-router";
import {useSessionData} from "../useSessionData";
import {useEffect, useState} from "react";

export default function AppLayout() {
	const { session } = useSession()
	const { sessionData, loadSessionData } = useSessionData()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		loadSessionData().then(() => {
			setIsLoading(false)
		})
	}, [])

	if (isLoading) {
		return null
	}

	if (!session && !sessionData) {
		return <Redirect href={"/login"}/>
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			{/*<Stack.Screen name="modal" options={{ presentation: 'modal' }} />*/}
		</Stack>
	)
}
