import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin


const serviceAccount ={
  "type": "service_account",
  "project_id": "ai-todo-e0fc5",
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCs+E5fii/+B+D0\nLjT1OxXDif1aKrH/Z8F/RkPZhOgNQTVI3Mbf1zgpFNra/k8axVYDP3rc5RM8/qn8\nEwUOlrezUOyzChl3NPnLu0s9e1BzgOkjQaxBdSTu1JEu0eJdyD8jMiExiIDQEzUB\nIsD8eIfV24aMQB22rbFrxxQ1GnVeHREXNwR3+HH0nz7QlNn3Vy3p2oK4bgujgPev\n/z69V6jNi9bCsmbG/kt0cogTM+Z28wqDGj1rwBuPuptMEaLUT120FXcQBZLPqnb8\nUuHajw8X3DXzYjHcfvtwQjpMk60W8a52iE7njkJGOBfn50Z160nuqMHF0NAoRgDk\njF97c5QtAgMBAAECggEAQOhY+K8xfUFVoCvqwY+vhhY1FW3qJ662xN0IPwsJzVeH\n+FSo6Hyp3Xiu+/jslF4y/bsHjvcDdiMWhLpabnQOcWLPwAvtLHebuWEKRgMNWJqq\nYgmV62ZbOqhX5trp+ElZsApyvFS+Cdb7T/bLtrJAPvdHEUBKJjAd4RTut1K7cloU\n5rytTMM7NP5kgdQNKJ3DnAWa8v84cZNM3HOYis0RsQdIxjeSt6sptlSaDCjBh89q\nRdX1XQrnifpeQNqfiKBOTTfAaxm126kLGlgRt7P6MKt35iSkFvoUvG/fpo7XPxV1\nGiNPOmS0k+IusJJzMLamcSFdeV3EbhrPd5XqJUfjnQKBgQDtd1yj9POLcdgRmiAj\nchrfwJXVtvgNRecOFqap/NV8OpcG7Z5j71ljjdjVegNt0ZGzHd7JOSDYYwJu0lnp\nXtvO9UVGmkbHBNNE57tZ5LzSGzPnsNy37nShPBPA6kwsH1zK6MUm7gGQcBaUC9ZW\noahPsuXaL0URxGNwigilmSzrHwKBgQC6eEqB4++nr/g92utu3Xo37cajZuOUc5Ff\nR9XL7a3g2sV+EjhB7n6DBHuRl6vuRwoxRfsJvXigdy3nAsJz28cyywiMyHUjnPeU\n+gvF4MwbsNP6V8BG5W4WpBkHnUZprpKbdkY3yjVBZc4Lx1GSWbZwCibe8MseYI/Y\nJL7ldLSjMwKBgQCHadWOOZTYI+dOwlEpZVwl1DCdWmVBTGdiBVCtBtzGprKQ5Ne5\nrTeQKcdIlPd3nFY1igcNQGKWgn9UqudSySEXd441oKxTuVCwrmSL8oAqYBDNQnHb\nAUPI3fV1wSYG0yubGfmzJW4G66Q0cDud0zmjmSSxstr0MsVx24TqydpviQKBgHyk\ncbFXSle9gWLfVeY6dzqxXsjUuqT9hxu4acmxqzuVINP/m8k+gSRUt8B/MLbKl56O\nF5rQIrSoVW+IYbCOJR3np2RrjhlrD/duGLaBaA3OajN5upXpQGgz8mMrluiHf4oZ\nSiB6spRvV4Z6CiWYgCFuN8NoE23Pv/cLwOqh0ykPAoGALEtjEfCip6WfHHb9rHue\naJAnhkC5QFkESjOY89D3htCIdXaWVyqw2J1kWqH0tl316aF0Dl8N1yEG3Z9rCm11\n/OD0miarQtj3Bdzg3gtJ5b+1wGhnxkwyiger6p7r3OPbx9feenqFGr2Z9jNoTGOc\nQ4aCm5NjLtny4x9N1wFMAJ4=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@ai-todo-e0fc5.iam.gserviceaccount.com",
  "client_id": process.env.CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40ai-todo-e0fc5.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

export { db };
export default admin;