module GameFromScratch {
    export class StartMenu extends Phaser.State {
        game: Phaser.Game;

        startBG;

        constructor() {
            super();

        }

        preload() {

        }

        create() {
            this.startBG = this.add.image(0, 0, "titlescreen");
            this.startBG.inputEnabled = true;
            this.startBG.events.onInputDown.addOnce(this.startGame, this);

        }

        update() {


        }
        startGame(pointer) {
            this.game.state.start("Game");
        }
    }
}