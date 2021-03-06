﻿module GameFromScratch {

    export class Player {

        game: Phaser.Game;
        player: Phaser.Sprite;
        cursors: Phaser.CursorKeys;
        LeftKey: Phaser.Key;
        RightKey: Phaser.Key;
        UpKey: Phaser.Key;
        DownKey: Phaser.Key;

        sneakAudio: Phaser.Sound;

        PosX: number;
        PosY: number;

        speed: number;
  
        name: string;

        StartPosX: number;
        StartPosY: number;

        briefcase: Briefcase;

        state: GamePlayState;


        animationState1: number;

        playingSpawnAnim: boolean;

        spottedTime: number;
        wasSpotted: boolean;
       

        constructor(game: Phaser.Game, posX: number, posY: number, name: string) {

          //  this.state = <GamePlayState>this.game.state.getCurrentState();


            this.game = game;
            this.speed = 150;
     
            this.name = name;
            this.PosX = posX;
            this.PosY = posY;

            this.wasSpotted = false;

            this.state = <GamePlayState>this.game.state.getCurrentState();
            this.StartPosX = posX;
            this.StartPosY = posY;

           this.game.physics.startSystem(Phaser.Physics.P2JS);
           this.cursors = this.game.input.keyboard.createCursorKeys();
            
           this.LeftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
           this.RightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
           this.UpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
           this.DownKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            
           
          

            if(this.name == "Player1")
               this.player = game.add.sprite(this.PosX, this.PosY, "spy1", 0);
            if (this.name == "Player2")
                this.player = game.add.sprite(this.PosX, this.PosY, "spy2", 0);

        
                
            game.physics.p2.enable(this.player);
    
            

            this.player.width = this.state.gridX;
            this.player.height = this.state.gridY;
            this.player.body.setCircle(this.state.gridX *0.4);
            this.player.angle = 0;
            this.player.body.fixedRotation = true;

            this.player.animations.add("leftwithcase", [0, 1, 2, 3]);
            this.player.animations.add("upwithcase", [4, 5, 6, 7]);
            this.player.animations.add("rightwithcase", [8, 9, 10, 11]);
            this.player.animations.add("downwithcase", [12, 13, 14, 15]);

            this.player.animations.add("leftidlewithcase", [16, 17, 16, 17, 16, 17, 16, 17, 18, 19, 18, 19]);
            this.player.animations.add("upidlewithcase", [20,21]);
            this.player.animations.add("rightidlewithcase", [22, 23, 22, 23, 22, 23, 22, 23, 24, 25, 24, 25]);
            this.player.animations.add("downidlewithcase", [26, 27]);

            this.player.animations.add("left", [28, 29, 30, 31]);
            this.player.animations.add("up", [32, 33, 34, 35]);
            this.player.animations.add("right", [36, 37, 38, 39]);
            this.player.animations.add("down", [40, 41, 42, 43]);

            this.player.animations.add("leftidle", [44, 45, 44, 45, 44, 45, 44, 45, 44, 46, 47, 46,47]);
            this.player.animations.add("upidle", [48, 49]);
            this.player.animations.add("rightidle", [50, 51, 50, 51, 50, 51, 50, 51, 52, 53, 52,53]);
            this.player.animations.add("downidle", [54, 55]);

            this.animationState1 = 0;

            this.playingSpawnAnim = true;
          
            this.sneakAudio = this.game.add.audio("sneak");
            this.sneakAudio.allowMultiple = true;
            this.sneakAudio.loop = false;
            this.sneakAudio.volume = 0.5;
           
        }

        killPlayer() {
            this.wasSpotted = true;
            this.spottedTime = 700;
        }

        respawn()
        {
            this.dropBriefcase();
            this.wasSpotted = false;
            this.player.tint = 0xffffff;
            this.player.body.x = this.StartPosX;
            this.player.body.y = this.StartPosY;

        }

        update() {

            if (this.wasSpotted) {
                this.spottedTime -= this.game.time.elapsed;
                this.player.body.setZeroForce();
                this.player.body.setZeroVelocity();
                this.player.tint = 0xff0000;
                if (this.spottedTime <= 0)
                    this.respawn();
                return;
            }
            else 
                this.checkKeyDown();

            if (("Player2" == this.name && this.LeftKey.isUp && this.RightKey.isUp && this.UpKey.isUp && this.DownKey.isUp) ||
                ("Player1" == this.name && this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp)) {
                this.sneakAudio.stop();
            }
            else if (!this.sneakAudio.isPlaying)
             {
                this.sneakAudio.play();
                console.log("Playing");
            }
            

            if (this.briefcase == null) {
                if ("Player2" == this.name) {

                    if (this.LeftKey.isUp && this.animationState1 == 0) {
                        this.player.animations.play("leftidle", 3, true);
                    }
                    if (this.RightKey.isUp && this.animationState1 == 1) {
                        this.player.animations.play("rightidle", 3, true);
                    }
                    if (this.UpKey.isUp && this.animationState1 == 2) {
                        this.player.animations.play("upidle", 3, true);
                    }
                    if (this.DownKey.isUp && this.animationState1 == 3) {
                        this.player.animations.play("downidle", 3, true);
                    }

                }
                else {

                    if (this.cursors.left.isUp && this.animationState1 == 0) {
                        this.player.animations.play("leftidle", 3, true);
                    }
                    if (this.cursors.right.isUp && this.animationState1 == 1) {
                        this.player.animations.play("rightidle", 3, true);
                    }
                    if (this.cursors.up.isUp && this.animationState1 == 2) {
                        this.player.animations.play("upidle", 3, true);
                    }
                    if (this.cursors.down.isUp && this.animationState1 == 3) {
                        this.player.animations.play("downidle", 3, true);
                    }

                }
            }
            else {
                if ("Player2" == this.name) {

                    if (this.LeftKey.isUp && this.animationState1 == 0) {
                        this.player.animations.play("leftidlewithcase", 3, true);
                    }
                    if (this.RightKey.isUp && this.animationState1 == 1) {
                        this.player.animations.play("rightidlewithcase", 3, true);
                    }
                    if (this.UpKey.isUp && this.animationState1 == 2) {
                        this.player.animations.play("upidlewithcase", 3, true);
                    }
                    if (this.DownKey.isUp && this.animationState1 == 3) {
                        this.player.animations.play("downidlewithcase", 3, true);
                    }
                }
                else {

                    if (this.cursors.left.isUp && this.animationState1 == 0) {
                        this.player.animations.play("leftidlewithcase", 3, true);
                    }
                    if (this.cursors.right.isUp && this.animationState1 == 1) {
                        this.player.animations.play("rightidlewithcase", 3, true);
                    }
                    if (this.cursors.up.isUp && this.animationState1 == 2) {
                        this.player.animations.play("upidlewithcase", 3, true);
                    }
                    if (this.cursors.down.isUp && this.animationState1 == 3) {
                        this.player.animations.play("downidlewithcase", 3, true);
                    }
                }
            }
            
        }



        checkKeyDown()
        {
            this.player.body.setZeroVelocity();
            if (this.briefcase == null)
            {

                if ("Player2" == this.name)
                {
               
                    if (this.LeftKey.isDown) {
                        if(this.UpKey.isUp && this.DownKey.isUp)
                        this.player.animations.play("left", 6, true);
                        this.player.body.moveLeft(this.speed);
                        this.animationState1 = 0;
                    }

                    else if (this.RightKey.isDown) {
                        if (this.UpKey.isUp && this.DownKey.isUp)
                        this.player.animations.play("right", 6, true);
                        this.player.body.moveRight(this.speed);
                        this.animationState1 = 1;
                    }

                    if (this.UpKey.isDown) {
                        this.player.animations.play("up", 6, true);
                        this.player.body.moveUp(this.speed);
                        this.animationState1 = 2;
                    }
                    else if (this.DownKey.isDown) {
                        this.player.animations.play("down", 6, true);
                        this.player.body.moveDown(this.speed);
                        this.animationState1 = 3;
                    }

                }

                if ("Player1" == this.name) {

                    if (this.cursors.left.isDown) {
                        if (this.cursors.up.isUp && this.cursors.down.isUp)
                        this.player.animations.play("left", 6, true);
                        this.player.body.moveLeft(this.speed);
                        this.animationState1 = 0;
                    }

                    if (this.cursors.right.isDown) {
                        if (this.cursors.up.isUp && this.cursors.down.isUp)
                        this.player.animations.play("right", 6, true);
                        this.player.body.moveRight(this.speed);
                        this.animationState1 = 1;
                    }

                    if (this.cursors.up.isDown) {
                        this.player.animations.play("up", 6, true);
                        this.player.body.moveUp(this.speed);
                        this.animationState1 = 2;
                    }
                    if (this.cursors.down.isDown) {
                        this.player.animations.play("down", 6, true);
                        this.player.body.moveDown(this.speed);
                        this.animationState1 = 3;
                    }

                }
            }
            else {
                if ("Player2" == this.name) {

                    if (this.LeftKey.isDown) {
                        if (this.UpKey.isUp && this.DownKey.isUp)
                        this.player.animations.play("leftwithcase", 6, true);
                        this.player.body.moveLeft(this.speed);
                        this.animationState1 = 0;
                    }

                    else if (this.RightKey.isDown) {
                        if (this.UpKey.isUp && this.DownKey.isUp)
                        this.player.animations.play("rightwithcase", 6, true);
                        this.player.body.moveRight(this.speed);
                        this.animationState1 = 1;
                    }

                    if (this.UpKey.isDown) {
                        this.player.animations.play("upwithcase", 6, true);
                        this.player.body.moveUp(this.speed);
                        this.animationState1 = 2;
                    }
                    else if (this.DownKey.isDown) {
                        this.player.animations.play("downwithcase", 6, true);
                        this.player.body.moveDown(this.speed);
                        this.animationState1 = 3;
                    }
        
                }

                if ("Player1" == this.name) {

                    if (this.cursors.left.isDown) {
                        if (this.cursors.up.isUp && this.cursors.down.isUp)
                        this.player.animations.play("leftwithcase", 6, true);
                        this.player.body.moveLeft(this.speed);
                        this.animationState1 = 0;
                    }

                    if (this.cursors.right.isDown) {
                        if (this.cursors.up.isUp && this.cursors.down.isUp)
                        this.player.animations.play("rightwithcase", 6, true);
                        this.player.body.moveRight(this.speed);
                        this.animationState1 = 1;
                    }

                    if (this.cursors.up.isDown) {
                        this.player.animations.play("upwithcase", 6, true);
                        this.player.body.moveUp(this.speed);
                        this.animationState1 = 2;
                    }
                    if (this.cursors.down.isDown) {
                        this.player.animations.play("downwithcase", 6, true);
                        this.player.body.moveDown(this.speed);
                        this.animationState1 = 3;
                    }
                }
                          
            }

        }

        pickUpBriefcase(briefcase: Briefcase)
        {
            this.briefcase = briefcase;
          
        }

        dropBriefcase() {
            if (this.briefcase != null) {
                this.briefcase.drop();
                this.briefcase = null;
            }
        }
    }



}