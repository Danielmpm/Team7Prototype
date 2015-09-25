module GameFromScratch {
    export class GamePlayState extends Phaser.State {
        game: Phaser.Game;
        backgroundImg: Phaser.Sprite;
        
        Player1: GameFromScratch.Player;
        player2: GameFromScratch.Player;

        constructor() {
            super();
        }

        create() {
           // this.game.physics.startSystem(Phaser.Physics.BOX2D);
            // this.game.add.physicsGroup(Phaser.Physics.BOX2D);

            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(
                this.game.width / this.backgroundImg.width,
                this.game.height / this.backgroundImg.height);

            
           
            this.Player1 = new Player(this.game,220,200,"Player1");
            this.game.add.existing(this.Player1); 
            this.Player1.smoothed = false;

       
           // this.Player1.body.setZeroVelocity();
            

            this.player2 = new Player(this.game, 600, 300, "Player2");
            this.game.add.existing(this.player2);


           // this.game.physics.box2d.enable(this.Player1);
        }

        update() {
            this.Player1.update();
            this.player2.update();
        }
       

    }
}