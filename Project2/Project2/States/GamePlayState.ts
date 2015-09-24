module GameFromScratch {
    export class GamePlayState extends Phaser.State {
        game: Phaser.Game;
        backgroundImg: Phaser.Sprite;
        
        player: GameFromScratch.Player;

        constructor() {
            super();
        }

        create() {
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(
                this.game.width / this.backgroundImg.width,
                this.game.height / this.backgroundImg.height);

           
            this.player = new Player(this.game,0,this.game.height-50);
            this.game.add.existing(this.player); 
            

        }

    }
}