import Button from './ui/Button';

export default class UI {
  images: {[key: string]: HTMLImageElement} = {};

  // eslint-disable-next-line class-methods-use-this
  async load() {
    await Button.load();
  }
}
