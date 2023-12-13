import DescopeClient, {AuthenticationInfo} from '@descope/node-sdk';

// Descope client type is off
let descopeClient : any;

export interface ErrorObject {
	error: string
	status?: number
}

export const getDescopeClient = () => {
	try {
		descopeClient = DescopeClient({ projectId: process.env.DESCOPE_PROJECT_ID || "" });
	} catch (error) {
		console.error("failed to initialize Descope Client: " + error)
	}
	if (!descopeClient) {
		const { DescopeClient } = require('./descopeClient')
		descopeClient = new DescopeClient()
	}
	return descopeClient
}

export const validateToken = async (token: string) : Promise<AuthenticationInfo | ErrorObject> => {
	const descopeClient = getDescopeClient()

	try {
		return await descopeClient.validateSession(token)
	} catch (err: any) {
		return { error: err.message, status: 401 }
	}
}
