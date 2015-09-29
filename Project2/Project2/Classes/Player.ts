module GameFromScratch {

    export class Player {

        game: Phaser.Game;
        player: Phaser.Sprite;
        cursors: Phaser.CursorKeys;
        keyboard: Phaser.Keyboard;

        PosX: number;
        PosY: number;

        speedX: number;
        speedY: number;
        name: string;
        public static Max_speed: number = 20;

        constructor(game: Phaser.Game, posX: number, posY: number, name:string) {
            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
            this.name = name;
            this.PosX = posX;
            this.PosY = posY;

           this.game.physics.startSystem(Phaser.Physics.P2JS);
           this.cursors = this.game.input.keyboard.createCursorKeys();
  
            this.player = game.add.sprite(this.PosX, this.PosY, "h1");
            game.physics.p2.enable(this.player, true);
            this.player.scale.setTo(0.8, 0.5);

        }

        update() {

            this.checkKeyDown();
            
            
        }

        checkKeyDown() {
            this.player.body.setZeroVelocity();
            if ("Player1" == this.name) {
                if (this.cursors.left.isDown)
                    this.player.body.moveLeft(200);
                if (this.cursors.right.isDown)
                    this.player.body.moveRight(200);

                if (this.cursors.up.isDown)
                    this.player.body.moveUp(200);
                if (this.cursors.down.isDown)
                    this.player.body.moveDown(200);
            }

        }


    }



}