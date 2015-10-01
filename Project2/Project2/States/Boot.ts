module GameFromScratch {
    export class Boot extends Phaser.State {
        game: Phaser.Game;



        constructor() {
            super();


        }

        preload() {

        }

        create() {
            //this.stage.disableVisibilityChange = false;
            //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.minWidth = 270;
            //this.scale.minHeight = 480;
            //this.scale.pageAlignHorizontally = true;
            //this.scale.pageAlignVertically = true;
            //this.game.stage.forcePortrait = true;
            //this.game.scale.setScreenSize(true);

            console.log("Opened Boot");

            this.game.state.start("Preloader");
        }

        update() {

        }

    }
}