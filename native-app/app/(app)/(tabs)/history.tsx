import {Text, View} from "../../../components/Themed";
import {Platform, ScrollView, StyleSheet, TextInput} from "react-native";
import React, {useCallback, useEffect} from "react";
// import {useSession} from "@descope/react-native-sdk";
import {formatDate} from "../../../utils";
import axios from "axios";
import {useMachineData} from "../../useMachineData";
import {useSessionData} from "../../useSessionData";

let apiUrl: string =
	'https://fancy-dolphin-65b07b.netlify.app/api/machine-history';

if (__DEV__) {
	apiUrl = `http://${
		Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'
	}:3001/machine-history`;
}

export default function HistoryScreen() {
	// const { session  } = useSession()
	const { sessionData  } = useSessionData()
	const { historyData, setHistory } = useMachineData();

	useEffect(() => {
		getHistory();
	}, [sessionData])

	const getHistory = useCallback(async () => {
		try {
			if (!sessionData) {
				return;
			}
			const headers = { Authorization: `Bearer ${sessionData?.sessionJwt}` };
			const response = await axios.get(apiUrl, { headers });

			if (response.data.history.length > 0) {
				await setHistory(response.data.history);
			}
		} catch (error) {
			console.error(error);
			console.log("There was an error retrieving history.", error);
		}
	}, [sessionData]);

	return (
		<View style={styles.container}>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<Text style={styles.label}>History (WIP)</Text>
			<Text>Add historical data of machines scores and factory scores</Text>
			<ScrollView style={styles.scrollView}>
				{historyData?.map((item, index) => (
					<View key={index} style={styles.item}>
						<Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
						<Text style={styles.factoryScore}>Factory Score: {item.factoryScore}</Text>
						<View style={styles.scores}>
							{Object.entries(item.machineScores).map(([machine, score], idx) => (
								<Text key={idx} style={styles.score}>
									{machine}: {score}
								</Text>
							))}
						</View>
					</View>
				))}
			</ScrollView>


		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollView: {
		padding: 10,
		minWidth: '80%',
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
	item: {
		marginBottom: 10,
		padding: 10,
		backgroundColor: '#f9f9f9',
		borderRadius: 5,
	},
	timestamp: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	factoryScore: {
		fontSize: 15,
		fontWeight: '500',
		marginTop: 5,
	},
	scores: {
		marginTop: 10,
	},
	score: {
		fontSize: 14
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
