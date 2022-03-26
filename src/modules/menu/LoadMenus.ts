import mainMenu from './items/mainMenu';
import settingsMenu from './items/settingsMenu';

const LoadMenus = () => {
  MyApp.menus.currentMenu = mainMenu;
  MyApp.menus.addMenu(mainMenu);
  MyApp.menus.addMenu(settingsMenu);
};

export default LoadMenus;
