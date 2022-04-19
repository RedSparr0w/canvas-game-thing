import Menu from '../Menu';

const endGameMenu = new Menu('endGame');
endGameMenu.addButton('end-game-main-menu', {
  click: () => {
    MyApp.menus.show('mainMenu');
    MyApp.game.stop();
  },
});

export default endGameMenu;
