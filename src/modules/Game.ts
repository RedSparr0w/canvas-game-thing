import { context } from './Canvas';
import { GameStatus } from './GameConstants';
import GameMap from './Maps';
import AttackSprite from './attack/AttackSprite';
import EnemyTeam from './player/EnemyTeam';
import PlayerTeam from './player/PlayerTeam';
import Team from './player/Team';
import { Settings } from './utilities/Settings';

export default class Game {
  public map: GameMap;
  public teams: Array<Team>;
  public player: Team;
  public enemy: Team;
  public attacks: Set<AttackSprite>;
  public status: GameStatus;

  constructor(
  ) {
    this.map = new GameMap(this);
    this.player = new PlayerTeam(this);
    this.enemy = new EnemyTeam(this);
    this.teams = [
      this.player,
      this.enemy,
    ];
    this.attacks = new Set();
    this.status = GameStatus.stopped;
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
      team.setup(this.map.current.teams[teamIndex]);
      teamIndex += 1;
    });
    this.status = GameStatus.started;
  }

  async stop() {
    this.status = GameStatus.stopped;
  }

  draw(delta: number) {
    // If our game isn't running return
    if (this.status === GameStatus.stopped) return;
    // If the game is paused, our delta should be 0
    // eslint-disable-next-line no-param-reassign
    if (this.status === GameStatus.paused) delta = 0;

    // Draw our map
    context.drawImage(MyApp.game.map.current.image, -Settings.camera.x, -Settings.camera.y);
    // Process our player/enemy
    this.teams.forEach((team) => team.draw(delta));
    // Process our attacks
    this.attacks.forEach((attack) => attack.draw(delta));
    // overlayed images (should appear above stuff on the map)
    context.drawImage(MyApp.game.map.current.image_top, -Settings.camera.x, -Settings.camera.y);
  }
}
