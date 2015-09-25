module GameFromScratch {

    export class Cop {

        game: Phaser.Game;
        cop: Phaser.Sprite;


        speedX: number;
        speedY: number;
        name: string;

        public static Max_speed: number = 20;

        constructor(game: Phaser.Game, posX: number, posY: number) {
            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
     
      

            this.game.physics.startSystem(Phaser.Physics.P2JS);
     

            this.cop = game.add.sprite(posX, posY, "cop");
           


        }

        update() {

        }



    }



} 