module GameFromScratch {
    export class Preloader extends Phaser.State {
        game: Phaser.Game;
        titleImg: Phaser.Sprite;
       // titleText;
        ready: boolean;

        constructor() {
            super();

            this.ready = false;


        }

        preload() {

        }

        create() {


        }

        update() {
            this.ready = true;
            this.game.state.start("StartMenu");

        }

    }
}