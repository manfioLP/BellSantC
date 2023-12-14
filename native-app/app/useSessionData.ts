import {useCallback, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDescope} from "@descope/react-native-sdk";

export const useSessionData = () => {
	const { isJwtExpired, refresh } = useDescope()
	const [sessionData, setSessionData] = useState(undefined);

	useEffect(() => {
		loadSessionData();
	}, []);

	const loadSessionData = useCallback(async () => {
		try {
			const storedSessionData = await AsyncStorage.getItem('sessionData');
			if (storedSessionData) {
				const parsedSessionData = JSON.parse(storedSessionData);
				setSessionData(parsedSessionData);
			} else {
				setSessionData(undefined);
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	const clearSessionData = useCallback(async () => {
		try {
			await AsyncStorage.removeItem('sessionData');
			setSessionData(undefined);
		} catch (error) {
			console.error(error);
		}
	}, [])

	const saveSession = useCallback(async (newSessionData) => {
		setSessionData(newSessionData);
		try {
			await AsyncStorage.setItem('sessionData', JSON.stringify(newSessionData));
		} catch (err) {
			console.error("error retrieving session data from local storage")
		}
	},[])

	return {
		sessionData,
		saveSession,
		clearSessionData,
		loadSessionData
	}
}
