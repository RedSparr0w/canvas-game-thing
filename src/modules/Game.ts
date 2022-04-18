import { canvas, context } from './Canvas';
import GameMap from './Maps';
import Team from './player/Team';
import { drawFrame } from './utilities/CanvasFunctions';
import { Settings } from './utilities/Settings';
import PlayerTeam from './player/PlayerTeam';
import EnemyTeam from './player/EnemyTeam';

export default class Game {
  public running = false;
  public map: GameMap;
  public teams: Set<Team>;
  public player: Team;
  public enemy: Team;

  constructor(
  ) {
    this.map = new GameMap(this);
    this.player = new PlayerTeam(this);
    this.enemy = new EnemyTeam(this);
    this.teams = new Set([
      this.player,
      this.enemy,
    ]);
  }

  // TODO: map types?
  async load() {
    await this.map.load();
    this.teams.forEach((team) => team.load());
  }

  async start(map: string) {
    // Load our map
    await this.map.setMap(map);
    // Setup the players
    let teamIndex = 0;
    this.teams.forEach((team) => {
      team.setup(this.map.current.teams[teamIndex].spawn);
      teamIndex += 1;
    });
    this.running = true;
  }

  async stop() {
    this.running = false;
  }

  draw(delta: number) {
    // If our game isn't started/runnign return
    if (!this.running) return;

    // Draw our map
    context.drawImage(MyApp.game.map.current.image, -Settings.camera.x, -Settings.camera.y);
    // Process our player/enemy
    this.teams.forEach((team) => team.draw(delta));
    // overlayed images (should appear above stuff on the map)
    context.drawImage(MyApp.game.map.current.image_top, -Settings.camera.x, -Settings.camera.y);

    /*
    Draw our game menu stuff
    */
    drawFrame(0, 480, canvas.width, 120);
  }
}
