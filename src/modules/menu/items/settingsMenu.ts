import Menu from '../Menu';

const settingsMenu = new Menu('settingsMenu');
settingsMenu.addButton('setting1', {
  // eslint-disable-next-line no-console
  click: () => console.log('You clicked settings1!'),
});
settingsMenu.addButton('setting2', {
  // eslint-disable-next-line no-console
  click: () => console.log('You clicked settings2!'),
});
settingsMenu.addButton('back', {
  // eslint-disable-next-line no-console
  click: () => MyApp.menus.show('mainMenu'),
});

export default settingsMenu;
