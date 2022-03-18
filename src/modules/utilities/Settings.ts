import { Pane } from 'tweakPane';
import * as EssentialsPlugin from '@tweakPane/plugin-essentials';
import { Maps } from '../Maps';

// Our default settings
export const Settings = {
  // Movement
  fps: 30,
  camera: 0,
  tile_size: 48,
  pokemon_sprite_size: 64,
  cursor_size: 32,
  // Game
  map: Maps.route1,
};
export const Values = {
  mspf: Math.floor(1000 / Settings.fps),
  // Performance
  ms_per_frame: 0,
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
  Values.mspf = Math.floor(1000 / ev.value) - 1;
});
export const fpsGraph: any = Performance.addBlade({
  view: 'fpsgraph',
  label: 'current',
  lineCount: 3,
});