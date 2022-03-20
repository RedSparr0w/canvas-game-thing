export default class Menu {
  images: {[key: string]: HTMLImageElement} = {};
  elements = {
    menu: document.getElementById('mainMenu'),
    startGame: document.getElementById('startGame'),
  };

  // eslint-disable-next-line class-methods-use-this
  load() {
    // nothing to load here yet
    document.getElementById('startGame').addEventListener('click', this.hide.bind(this));
  }

  hide() {
    this.elements.startGame.classList.add('disabled');
    this.elements.menu.animate([
      // keyframes
      { top: '-100vh' },
    ], {
      // timing options
      fill: 'forwards',
      duration: 200,
    });
    MyApp.game.start('route1');
  }

  show() {
    this.elements.startGame.classList.remove('disabled');
    this.elements.menu.animate([
      // keyframes
      { top: '0' },
    ], {
      // timing options
      fill: 'forwards',
      duration: 200,
    });
  }
}
