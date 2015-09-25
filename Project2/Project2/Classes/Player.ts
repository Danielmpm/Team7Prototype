module GameFromScratch {

    export class Player extends Phaser.Sprite {

        game: Phaser.Game;


        Right_arrow: Phaser.Key;
        Left_arrow: Phaser.Key;
        Up_arrow: Phaser.Key;
        Down_arrow: Phaser.Key;

        speedX: number;
        speedY: number;
        name: string;
        public static Max_speed: number = 20;

        constructor(game: Phaser.Game, posX: number, posY: number, name:string) {
            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
            this.name = name;
      

            super(game, posX, posY, "h1");

         //   this.loadTexture("h1",0);
          //  this.anchor.set(0.0, 1.0);

            

        }

        update() {

            this.checkKeyDown();
            
            
        }

        checkKeyDown() {
            if ("Player1" == this.name) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
                    this.x -= this.speedX;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
                    this.x += this.speedX;

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
                    this.y -= this.speedY;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
                    this.y += this.speedY;
            }


            if ("Player2" == this.name) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
                    this.x -= this.speedX;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
                    this.x += this.speedX;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                    this.y -= this.speedY;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
                    this.y += this.speedY;
            }
        }





    



    }



}