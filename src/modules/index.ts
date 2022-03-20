import './temporaryWindowInjection';
import App from './App';

const MyApp = new App();

window.onload = async () => {
  MyApp.load();
};

Object.assign(<any>window, { MyApp });
