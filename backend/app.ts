import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import {getMachineHealth} from './machineHealth';
import {connectDatabase} from "./database";

const app = express();
const port = 3001;

dotenv.config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post('/machine-health', async (req: Request, res: Response) => {
  const result = await getMachineHealth(req);
  if (result.error) {
    res.status(result.status || 400).json(result.error);
  } else {
    res.json(result);
  }
});

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`API is listening at http://localhost:${port}`);
  });
})
