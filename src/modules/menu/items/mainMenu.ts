import Menu from '../Menu';

const mainMenu = new Menu('mainMenu');
mainMenu.addButton('startGame', {
  click: () => MyApp.menus.show('mapSelectorMenu'),
});

mainMenu.addButton('settings', {
  click: () => MyApp.menus.show('settingsMenu'),
});

export default mainMenu;
