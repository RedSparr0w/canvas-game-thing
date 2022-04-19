import mainMenu from './items/mainMenu';
import gameControls from './items/gameControls';
import settingsMenu from './items/settingsMenu';
import endGameMenu from './items/endGameMenu';

const LoadMenus = () => {
  MyApp.menus.currentMenu = mainMenu;
  MyApp.menus.addMenu(mainMenu);
  MyApp.menus.addMenu(settingsMenu);
  MyApp.menus.addMenu(gameControls);
  MyApp.menus.addMenu(endGameMenu);
};

export default LoadMenus;
