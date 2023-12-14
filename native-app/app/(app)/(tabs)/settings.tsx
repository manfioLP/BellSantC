import {Text, View} from "../../../components/Themed";
import {Button, Platform, SafeAreaView, StyleSheet, TextInput} from "react-native";
import React, {useCallback} from "react";
import {useDescope, useSession} from "@descope/react-native-sdk";
import {useSessionData} from "../../useSessionData";
import {Redirect} from "expo-router";

export default function SettingsScreen() {
	const [loggedOut, setLoggedOut] = React.useState(false)
	const { session, clearSession } = useSession()
	const { sessionData, clearSessionData } = useSessionData()
	const { logout } = useDescope()

	const handleLogout = useCallback(() => {
		logout().then((l) => {
			console.log("clearing session...")
			clearSession()
			clearSessionData()
			setLoggedOut(true)
		}).catch((e) => {
			console.error("error logging out", e)
		})
	}, [])

	return (
		<View style={styles.container}>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<Text style={styles.label}>Info</Text>
			<TextInput
				style={styles.input}
				editable={false}
				value={sessionData?.user?.email || "N/A"}
				placeholder="User Email"
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				editable={false}
				value={sessionData?.user?.name || "N/A"}
				placeholder="User Name"
			/>

			<SafeAreaView style={styles.container}>
				<Button title="Logout" onPress={handleLogout} />
			</SafeAreaView>

			{loggedOut && <Redirect href={"/login"}/>}
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
	label: {
		fontSize: 18,
		marginBottom: 10,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: '80%',
	},
});
