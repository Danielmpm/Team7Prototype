module GameFromScratch {

    export class Player {

        game: Phaser.Game;
        player: Phaser.Sprite;
        cursors: Phaser.CursorKeys;
        LeftKey: Phaser.Key;
        RightKey: Phaser.Key;
        UpKey: Phaser.Key;
        DownKey: Phaser.Key;

        PosX: number;
        PosY: number;

        speedX: number;
        speedY: number;
        name: string;

        StartPosX: number;
        StartPosY: number;

        state: GamePlayState;

        public static Max_speed: number = 20;

        constructor(game: Phaser.Game, posX: number, posY: number, name: string) {

          //  this.state = <GamePlayState>this.game.state.getCurrentState();


            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
            this.name = name;
            this.PosX = posX;
            this.PosY = posY;

            this.StartPosX = posX;
            this.StartPosY = posY;

           this.game.physics.startSystem(Phaser.Physics.P2JS);
           this.cursors = this.game.input.keyboard.createCursorKeys();
            
           this.LeftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
           this.RightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
           this.UpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
           this.DownKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            
              

            this.player = game.add.sprite(this.PosX, this.PosY, "h1");
            game.physics.p2.enable(this.player, true);
            //this.player.scale.setTo(0.4, 0.2);

            this.player.width = 70;// this.state.gridX;
            this.player.height = 70;//this.state.gridY;
            this.player.body.setCircle(30);
            this.player.angle = 0;
            this.player.body.fixedRotation = true;

          //  game.physics.p2.setPostBroadphaseCallback(this.CheckHitFlash, this);
        }

        respawn()
        {
            this.player.body.x = this.StartPosX;
            this.player.body.y = this.StartPosY;
        }

        update() {

            this.checkKeyDown();
            
            
        }

        checkKeyDown() {
            this.player.body.setZeroVelocity();
          
            if ("Player2" == this.name) {
               
                if (this.LeftKey.isDown )  
                    this.player.body.moveLeft(200);
                if (this.RightKey.isDown)
                    this.player.body.moveRight(200);
                if (this.UpKey.isDown)
                    this.player.body.moveUp(200);
                if (this.DownKey.isDown)
                    this.player.body.moveDown(200);
            }

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