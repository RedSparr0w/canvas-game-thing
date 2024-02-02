import endGameMenu from './items/endGameMenu';
import gameControls from './items/gameControls';
import mainMenu from './items/mainMenu';
import mapSelectorMenu from './items/mapSelectorMenu';
import settingsMenu from './items/settingsMenu';

const LoadMenus = () => {
  MyApp.menus.currentMenu = mainMenu;
  MyApp.menus.addMenu(mainMenu);
  MyApp.menus.addMenu(settingsMenu);
  MyApp.menus.addMenu(gameControls);
  MyApp.menus.addMenu(mapSelectorMenu);
  MyApp.menus.addMenu(endGameMenu);
};

export default LoadMenus;
