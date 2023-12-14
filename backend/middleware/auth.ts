import { Request, Response, NextFunction } from 'express';
import {validateToken} from "../auth";

export interface AuthRequest extends Request {
	userId?: string
}

export default async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
	const { authorization } = req.headers;
	if (!authorization) {
		return {error: 'Missing authorization header'};
	}

	const authInfo = await validateToken(authorization.replace('Bearer ', ''))
	if ("error" in authInfo) {
		console.error("Invalid auth token")
		return res.status(authInfo.status || 400).json(authInfo.error);
	}

	req.userId = authInfo.token.sub;
	next();
}
