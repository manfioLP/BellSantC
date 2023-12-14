import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import {getMachineHealth} from './machineHealth';
import {getHistoryData} from './historyData';
import {connectDatabase} from "./database";
import authenticate from "./middleware/auth";

const app = express();
const port = 3001;

dotenv.config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post('/machine-health', authenticate, async (req: Request, res: Response) => {
  const result = await getMachineHealth(req);
  if (result.error) {
    res.status(result.status || 400).json(result.error);
  } else {
    res.json(result);
  }
});

app.get('/machine-history', authenticate, async (req: Request, res: Response) => {
  const result = await getHistoryData(req);
  if (result.error) {
    res.status(result.status || 400).json(result.error);
  } else {
    res.json(result);
  }
})

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`API is listening at http://localhost:${port}`);
  });
})
