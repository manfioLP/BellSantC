import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Image } from 'react-native';
import { useFlow, useDescope, useSession } from '@descope/react-native-sdk'
import { router } from 'expo-router';

import { Text, View } from '../components/Themed';

export default function LoginScreen() {

    const flow = useFlow()
    const { session, clearSession, manageSession } = useSession()
    const { logout } = useDescope()
    const startFlow = async () => {
        try {
            const resp = await flow.start('https://auth.descope.io/login/P2ZJqCUkHt7nQingZ8Ykg3Zvqtu5', '<URL_FOR_APP_LINK>')
            await manageSession(resp.data)
            router.replace("/")
        } catch (e) {
            // handle errors
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/square-logo.png")} style={styles.logo}/>
            <Text style={styles.title}>Welcome</Text>
            <Button title={'Login'} onPress={startFlow} />
            <View
                style={styles.separator}
                lightColor='#eee'
                darkColor='rgba(255,255,255,0.1)'
            />

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
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});
