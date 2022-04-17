import { Pane } from 'tweakPane';
import * as EssentialsPlugin from '@tweakPane/plugin-essentials';

// Our default settings
export const Settings = {
  // Performance
  fps: 75, // Set this to 75 so we should get at least 60 frames depending on monitor refresh rate
  mspf: Math.floor(1000 / 75),
  // Game
  camera: {
    x: 0,
    y: 0,
  },
};

// Create our settings GUI
const SettingsPane = new Pane({
  title: 'Settings',
  expanded: true,
});
SettingsPane.registerPlugin(EssentialsPlugin);

// Performance settings
const Performance = SettingsPane.addFolder({
  title: 'Performance',
  expanded: true,
});
const FPS = Performance.addInput(Settings, 'fps', { min: 10, max: 144, step: 1 });
FPS.on('change', (ev) => {
  Settings.mspf = Math.floor(1000 / ev.value) - 1;
});
export const fpsGraph: any = Performance.addBlade({
  view: 'fpsgraph',
  label: 'current',
  lineCount: 3,
});
