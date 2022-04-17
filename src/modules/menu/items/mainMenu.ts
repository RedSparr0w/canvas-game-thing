import Menu from '../Menu';

const mainMenu = new Menu('mainMenu');
mainMenu.addButton('startGame', {
  click: () => {
    MyApp.menus.show('gameControls');
    MyApp.game.start('route1');
  },
});
mainMenu.addButton('settings', {
  click: () => MyApp.menus.show('settingsMenu'),
});

export default mainMenu;
