import './lib/dotenv';
import App from './App';

const port = process.env.PORT || process.env.APP_PORT;
const host = process.env.APP_URL;
const subdirectories = process.env.SUBDIRECTORY;
const apiVersion = process.env.CURRENT_API_VERSION;

const LOCAL_HOST = `${host}:${port}${subdirectories}${apiVersion}`;

App.set('port', port);

App.listen(port, () => {
  console.log(`Database API listening on ${LOCAL_HOST}`);
});
