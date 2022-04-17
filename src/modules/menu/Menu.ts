export default class Menu {
  public element: HTMLDivElement;
  public buttons: HTMLAnchorElement[] = [];

  constructor(
    public name: string
  ) {
    this.element = document.getElementById(this.name) as HTMLDivElement;
  }

  addButton(name: string, events: Record<string, () => void>): void {
    const element = this.element.querySelector(`[data-button=${name}]`) as HTMLAnchorElement;
    Object.entries(events).forEach(([event, callback]) => {
      element.addEventListener(event, callback);
    });
    this.buttons.push(element);
  }

  addEventsToElement(element: HTMLAnchorElement, events: Record<string, () => void>): void {
    Object.entries(events).forEach(([event, callback]) => {
      element.addEventListener(event, callback);
    });
    this.buttons.push(element);
  }
}
