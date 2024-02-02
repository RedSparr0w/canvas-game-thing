import Menu from '../Menu';

const mapSelectorMenu = new Menu('mapSelectorMenu');
mapSelectorMenu.addButton('route1', {
  // eslint-disable-next-line no-console
  click: () => {
    MyApp.menus.show('gameControls');
    MyApp.game.start('route1');
  },
});
mapSelectorMenu.addButton('kanto', {
  // eslint-disable-next-line no-console
  click: () => {
    MyApp.menus.show('gameControls');
    MyApp.game.start('kanto');
  },
});
mapSelectorMenu.addButton('back', {
  // eslint-disable-next-line no-console
  click: () => MyApp.menus.show('mainMenu'),
});

export default mapSelectorMenu;
