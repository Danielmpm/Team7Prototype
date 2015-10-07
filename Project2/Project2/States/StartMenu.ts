module GameFromScratch {
    export class StartMenu extends Phaser.State {
        game: Phaser.Game;

        startBG;
        frontSprite: Phaser.Sprite;
        doorSprite: Phaser.Sprite;

        count: number;
        isVisible: boolean;

        player3: GameFromScratch.Player;
        player2: GameFromScratch.Player;

        constructor() {
            super();

        }

        preload() {

        }

        create() {
            this.startBG = this.add.sprite(0, 0, "titleScreen");
            this.startBG.width = 1920;
            this.startBG.height = 1080;

         //   this.doorSprite = this.game.add.sprite(0,0,"doors",0);
            this.frontSprite = this.game.add.sprite(0, 0, "frontSprite",0);
           
            this.count = 0;
            this.isVisible = true;

           // this.player3 = new Player(this.game, 500, 500, "Player3");
              
                           
          //  this.player2 = new Player(this.game, 800, 850, "Player2");
        }

        update()
        {
            if (this.count%30==0 && this.isVisible) {
                this.isVisible = false;
                this.frontSprite.alpha = 0;
            }

            if (!this.isVisible && this.count == 0) {
                this.isVisible = true;
                this.frontSprite.alpha = 1;
            }

            if (this.isVisible) {
                this.count++;
            } else {
                this.count--;
            }

            if (this.game.input.activePointer.isDown) {
                this.startGame( );
            }
        }
        
        startGame( )
        {
            this.game.state.start("BackgroundState");
        }
    }
}