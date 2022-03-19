// TODO: Add settings for volume etc
export default class Sound {
  public sound = document.createElement('audio');
  public name: string;
  public initialized = false;
  public src: string;

  constructor(fileName: string, soundName: string) {
    this.src = `assets/sounds/${fileName}.mp3`;
    this.name = soundName;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    // Wait until the document is loaded before moving the sound to the body
    this.load();
  }

  load() {
    try {
      document.body.appendChild(this.sound);
      // Set as initialized now, incase the user is on Desktop and hasn't clicked anywhere yet
      this.initialized = true;
      // This is needed to be able to play sounds on mobile devices
      document.addEventListener('click', () => {
        this.sound.play().finally(() => {
          this.sound.pause();
          this.sound.src = this.src;
        });
        setTimeout(() => {
          this.sound.pause();
          this.sound.src = this.src;
        }, 1000);
      }, { once: true });

      this.updateVolume(1);
    } catch (e) {
      setTimeout(this.load, 500);
    }
  }

  updateVolume(value: number) {
    try {
      this.sound.volume = value / 100;
    } catch (e) {
      console.error(`Error updating volume for ${this.name}:\n`, e);
    }
  }

  play() {
    if (this.initialized) {
      this.sound.play();
    }
  }

  stop() {
    if (this.initialized) {
      this.sound.pause();
    }
  }

  remove() {
    if (this.initialized) {
      this.sound.remove();
    }
  }

  toJSON() {
    return {
      name: this.name,
    };
  }
}
