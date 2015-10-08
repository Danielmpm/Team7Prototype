module GameFromScratch {
    export class Boot extends Phaser.State {
        game: Phaser.Game;



        constructor() {
            super();


        }

        preload() {

        }

        create() {
           

            this.game.state.start("Preloader");
        }

        update() {

        }

    }
}