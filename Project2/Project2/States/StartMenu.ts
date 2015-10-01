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
            this.startBG = this.add.sprite(0, 0, "titleScreen");
            this.startBG.width = 1920;
            this.startBG.height = 1080;//this.game.world.height;
         //   this.titleImg.scale.setTo(10, 10);
        }

        update()
        {
            if (this.game.input.activePointer.isDown) {
                this.startGame( );
                  console.log("TEST");
            }
        }
        
        startGame( )
        {
            this.game.state.start("BackgroundState");
        }
    }
}