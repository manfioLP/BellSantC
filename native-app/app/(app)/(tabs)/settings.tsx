import {Text, View} from "../components/Themed";
import {Button, Platform, SafeAreaView, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useCallback} from "react";
import {useDescope, useSession} from "@descope/react-native-sdk";

export default function SettingsScreen() {
	const { clearSession } = useSession()
	const { logout } = useDescope()

	const handleLogout = useCallback(() => {
		logout().then((l) => {
			console.log("logged out", l)
			clearSession()
				.then((c) => console.log("cleared session", c))
				.catch((e) => console.log("error clearing session", e))
		}).catch((e) => {
			console.log("error logging out", e)
		})
	}, [logout])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings</Text>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<SafeAreaView style={styles.container}>
				<Button title="Logout" onPress={handleLogout} />
			</SafeAreaView>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
