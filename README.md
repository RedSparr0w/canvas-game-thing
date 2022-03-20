# Canvas game thing

## Gameplay

- Choose a starter (will be your main/base Pokemon)
  - Appears on your spawnpoint
  - 10 x base health?
  - Levels up?
  - Evolves?
  - Attacks?
- Choose up to 6 base pokemon for your team (you can spawn these with money)
- Gain money every x ticks (based on something, maybe map progress?)
- Can spawn Pokemon using money (the 6 selected at start)
- Gain money for defeating wild Pokemon
- Gain XP for defeating wild Pokemon/enemy Pokemon
- Evolve at certain levels (5?, 10?) (easier to balance)
- Spend money to upgrade the base spawn level of a Pokemon?
- Each time a specific pokemon dies it adds XP to the base spawn of that pokemon?

## TODO

- Add start screen
- Add button click events
- Spawn wild Pokemon (lowish level mons helpful for grinding XP and Money)
- Pokemon are blocked by eachother? or can be on the same square?
- Pokemon choose an enemy to attack?
- Randomly generated attributes (brave, fast, slow, shiny, strong, weak, tough, fast learner)?
- Player/Enemy/Wild Pokemon attack eachother
- Calculate damage (types, att/sp.att, def/sp.def)
- Deal damage
- Faint on no HP
- Implement different attack types
- Attacks unlock at certain levels
- Ranged/Close attacks
- Physical/Special attacks
- Implement attack animations

## Developer instructions

### Editor/IDE setup

We have an [EditorConfig](https://editorconfig.org/) and linting configured, to help everyone write similar code. You will find our recommended plugins for VSCode below, however you should be able to find a plugin for other IDEs as well.

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Building from Source

First make sure you have git and npm available as command-line utilities (so you should install Git and NodeJS if you don't have them already).

Open a command line interface in the directory that contains this README file, and use the following command to install the project's other dependencies locally:
```cmd
npm clean-install
```

Then finally, run the following command in the command line interface to start a browser running the project.
```cmd
npm start
```

### Deploying a new version to Github Pages
Before deploying, check that the game compiles and starts up without errors. Then run:
```cmd
npm run website
```

After this command completes, push the changed files in the 'docs' directory to Github.
