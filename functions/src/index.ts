import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

const auth = admin.auth();

main.use('/api/v1', app);
main.use(bodyParser.json());

app.use(cors());

export const webApi = functions.https.onRequest(main);

app.get('/warm', (req, res) => {
    res.send('Calentando para la pelea');
})

app.post('/addUser', async (req, res) => {
    try {
        await auth.createUser({
            email: req.body.email,
            password: req.body.password,
            displayName: `${req.body.firstName} ${req.body.lastName}`,
            photoURL: req.body.photoUrl
        })
        return res.send('Utilisateur enregistre');
    } catch (error) {
        return res.send(error);
    }
})