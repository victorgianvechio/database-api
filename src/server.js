import './lib/dotenv';
import App from './App';

const port = process.env.PORT || process.env.APP_PORT;

App.set('port', port);

App.listen(port, () => {
  console.log(`Database API listening on port ${port}`);
});
