import LoadMenus from './LoadMenus';
import Menu from './Menu';

export default class Menus {
  images: {[key: string]: HTMLImageElement} = {};
  items: Menu[] = [];
  currentMenu: Menu = undefined;

  // eslint-disable-next-line class-methods-use-this
  load() {
    LoadMenus();
  }

  hide(menuName: string) {
    const menu = this.getMenu(menuName);
    [...menu.element.querySelectorAll('.btn')].forEach((b) => {
      b.classList.add('disabled');
    });
    menu.element.classList.remove('visible');
    menu.element.animate([
      // keyframes
      { top: '0' },
      { top: '-100vh' },
    ], {
      // timing options
      fill: 'forwards',
      duration: 200,
    });
  }

  show(menuName: string) {
    // Show our new menu
    const menu = this.getMenu(menuName);
    [...menu.element.querySelectorAll('.btn')].forEach((b) => {
      b.classList.remove('disabled');
    });
    menu.element.style.top = '100vh';
    menu.element.classList.add('visible');
    menu.element.animate([
      // keyframes
      { top: '100vh' },
      { top: '0' },
    ], {
      // timing options
      fill: 'forwards',
      duration: 200,
    });
    // Hide the old menu
    this.hide(this.currentMenu.element.id);
    this.currentMenu = menu;
  }

  getMenu(menuName: string): Menu {
    return this.items.find((m) => m.name === menuName);
  }

  addMenu(menu: Menu) {
    this.items.push(menu);
  }
}
