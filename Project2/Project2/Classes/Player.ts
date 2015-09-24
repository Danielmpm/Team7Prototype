module GameFromScratch {

    export class Player extends Phaser.Sprite {

        game: Phaser.Game;


        Right_arrow: Phaser.Key;
        Left_arrow: Phaser.Key;
        Up_arrow: Phaser.Key;
        Down_arrow: Phaser.Key;

        speed: number;

        public static Max_speed: number = 20;

        constructor(game: Phaser.Game, x: number, y: number) {
            this.game = game;
            this.speed = 0;

            this.Right_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.Right_arrow.onDown.add(Player.prototype.MoveRight, this);

            this.Left_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.Left_arrow.onDown.add(Player.prototype.MoveLeft, this);

            this.Up_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.Up_arrow.onDown.add(Player.prototype.MoveUP, this);

            this.Down_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.Down_arrow.onDown.add(Player.prototype.MoveDown, this);

            super(game, x, y, "h1");

         //   this.loadTexture("h1",0);
            this.anchor.set(0.0, 1.0);



        }

        update() {
            
        }


        MoveRight() {
           
            this.x += 5;
        }

        MoveLeft() {
            this.x -= 5;
        }

        MoveUP() {
            this.y-= 5;
        }

        MoveDown() {
            this.y += 5;
        }



    }



}