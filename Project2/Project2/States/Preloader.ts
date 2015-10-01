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

          //  this.titleImg = this.game.add.sprite(0, 0, "titleImage");
        //    this.titleImg.width = 1920;
        //    this.titleImg.height = 1080;//this.game.world.height;
         //   this.titleImg.scale.setTo(10, 10);

        }

        update() {
            this.ready = true;
            this.game.state.start("StartMenu");

        }

    }
}