require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
if (process.env.NODE_ENV !== "production") {
  console.log(process.env.NODE_ENV);
  console.log(process.env.PORT);
}
const port = process.env.PORT || 3000;
import App from './src/config/app';

//Init app
App.init();
//get emit event "appStarted" when app is initialized
App.app.on('appStarted', () => {
  // Load routes after initializing App
  App.loadRoutes().then(() => {
    //start server on ${port}
    App.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
});