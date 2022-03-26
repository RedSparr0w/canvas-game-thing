import Menu from '../Menu';

const mainMenu = new Menu('mainMenu');
mainMenu.addButton('startGame', {
  // eslint-disable-next-line no-console
  click: () => {
    MyApp.menus.hide('mainMenu');
    MyApp.game.start('route1');
  },
});
mainMenu.addButton('settings', {
  // eslint-disable-next-line no-console
  click: () => MyApp.menus.show('settingsMenu'),
});

export default mainMenu;
