import gameControls from './items/gameControls';
import mainMenu from './items/mainMenu';
import settingsMenu from './items/settingsMenu';

const LoadMenus = () => {
  MyApp.menus.currentMenu = mainMenu;
  MyApp.menus.addMenu(mainMenu);
  MyApp.menus.addMenu(settingsMenu);
  MyApp.menus.addMenu(gameControls);
};

export default LoadMenus;
