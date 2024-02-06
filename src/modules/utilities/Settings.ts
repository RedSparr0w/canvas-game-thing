import { Pane } from 'tweakPane';

// Our default settings
export const Settings = {
  // Performance
  fps: 75, // Set this to 75 so we should get at least 60 frames depending on monitor refresh rate
  mspf: Math.floor(1000 / 75),
  speed: 1,
  // Game
  camera: {
    x: 0,
    y: 0,
    z: 1,
  },
  // Display
  theme: 'united',
};

// Create our settings GUI
const SettingsPane = new Pane({
  title: 'Settings',
  expanded: true,
});

// Display
const Display = SettingsPane.addFolder({
  title: 'Display',
  expanded: true,
});
Display.addInput(Settings, 'theme', {
  options: {
    Cerulean: 'cerulean',
    Cosmo: 'cosmo',
    Cyborg: 'cyborg',
    Darkly: 'darkly',
    Flatly: 'flatly',
    Journal: 'journal',
    Litera: 'litera',
    Lumen: 'lumen',
    Lux: 'lux',
    Materia: 'materia',
    Minty: 'minty',
    Morph: 'morph',
    Pulse: 'pulse',
    Quartz: 'quartz',
    Sandstone: 'sandstone',
    Simplex: 'simplex',
    Sketchy: 'sketchy',
    Slate: 'slate',
    Solar: 'solar',
    Spacelab: 'spacelab',
    Superhero: 'superhero',
    United: 'united',
    Vapor: 'vapor',
    Yeti: 'yeti',
    Zephyr: 'zephyr',
  },
}).on('change', (ev) => {
  (document.getElementById('theme') as HTMLLinkElement).href = `https://bootswatch.com/5/${ev.value}/bootstrap.min.css`;
});

// Performance settings
const Performance = SettingsPane.addFolder({
  title: 'Performance',
  expanded: true,
});
Performance.addInput(Settings, 'fps', {
  label: 'fps limit',
  min: 10,
  max: 144,
  step: 1,
}).on('change', (ev) => {
  Settings.mspf = Math.floor(1000 / ev.value) - 1;
});
Performance.addInput(Settings, 'speed', {
  label: 'Game Speed',
  min: 0.5,
  max: 5,
  step: 0.5,
});
