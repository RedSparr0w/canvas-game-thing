import App from './App';
import { Attacks } from './attack/Attacks';

const MyApp = new App();

window.onload = async () => {
  MyApp.load();
};

Object.assign(<any>window, { MyApp, Attacks });
