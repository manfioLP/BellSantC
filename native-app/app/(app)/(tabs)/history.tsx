import {Text, View} from "../../../components/Themed";
import {Button, Platform, SafeAreaView, StyleSheet, TextInput} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useCallback} from "react";
import {useDescope, useSession} from "@descope/react-native-sdk";

export default function SettingsScreen() {
	const { session, clearSession } = useSession()

	return (
		<View style={styles.container}>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<Text style={styles.label}>History (WIP)</Text>
			<Text>Add historical data of machines scores and factory scores</Text>


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
