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

        speedX: number;
        speedY: number;
        name: string;

        StartPosX: number;
        StartPosY: number;

        briefcase: Briefcase;

        state: GamePlayState;

        public static Max_speed: number = 20;

        animationState1: number;

        playingSpawnAnim: boolean;

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
            
              
            if(this.name == "Player1")
               this.player = game.add.sprite(this.PosX, this.PosY, "spy1", 0);
            if (this.name == "Player2")
               this.player = game.add.sprite(this.PosX, this.PosY, "spy2", 0);
            game.physics.p2.enable(this.player);
            //this.player.scale.setTo(0.4, 0.2);

            this.player.width = 70;// this.state.gridX;
            this.player.height = 70;//this.state.gridY;
            this.player.body.setCircle(30);
            this.player.angle = 0;
            this.player.body.fixedRotation = true;

            this.player.animations.add("leftwithcase", [0, 1, 2, 3]);
            this.player.animations.add("upwithcase", [4, 5, 6, 7]);
            this.player.animations.add("rightwithcase", [8, 9, 10, 11]);
            this.player.animations.add("downwithcase", [12, 13, 14, 15]);

            this.player.animations.add("leftidlewithcase", [16, 17, 18, 19]);
            this.player.animations.add("upidlewithcase", [20,21]);
            this.player.animations.add("rightidlewithcase", [22, 23, 24, 25]);
            this.player.animations.add("downidlewithcase", [26, 27]);

            this.player.animations.add("left", [28, 29, 30, 31]);
            this.player.animations.add("up", [32, 33, 34, 35]);
            this.player.animations.add("right", [36, 37, 38, 39]);
            this.player.animations.add("down", [40, 41, 42, 43]);

            this.player.animations.add("leftidle", [44, 45, 46, 47]);
            this.player.animations.add("upidle", [48, 49]);
            this.player.animations.add("rightidle", [50, 51, 52, 53]);
            this.player.animations.add("downidle", [54, 55]);

            this.animationState1 = -1;

            this.playingSpawnAnim = true;
          
            this.sneakAudio = this.game.add.audio("sneak");
            this.sneakAudio.allowMultiple = true;
            this.sneakAudio.loop = false;
        }

        killPlayer() {
            this.dropBriefcase();
            this.respawn();
        }

        respawn()
        {
            this.player.body.x = this.StartPosX;
            this.player.body.y = this.StartPosY;
        }

        update() {

        
            this.checkKeyDown();

            if ("Player2" == this.name) {

                if (this.LeftKey.isUp && this.animationState1 == 0) {
                    this.sneakAudio.stop();
                    this.player.animations.play("leftidle", 6, true);
                }
                if (this.RightKey.isUp && this.animationState1 == 1) {
                    this.sneakAudio.stop();
                    this.player.animations.play("rightidle", 6, true);
                }
                if (this.UpKey.isUp && this.animationState1 == 2) {
                    this.sneakAudio.stop();
                    this.player.animations.play("upidle", 6, true);
                }
                if (this.DownKey.isUp && this.animationState1 == 3) {
                    this.sneakAudio.stop();
                    this.player.animations.play("downidle", 6, true);
                }
            }
            else {

                if (this.cursors.left.isUp && this.animationState1 == 0) {
                    this.sneakAudio.stop();
                    this.player.animations.play("leftidle", 6, true);
                }
                if (this.cursors.right.isUp && this.animationState1 == 1) {
                    this.sneakAudio.stop();
                    this.player.animations.play("rightidle", 6, true);
                }
                if (this.cursors.up.isUp && this.animationState1 == 2) {
                    this.sneakAudio.stop();
                    this.player.animations.play("upidle", 6, true);
                }
                if (this.cursors.down.isUp && this.animationState1 == 3) {
                    this.sneakAudio.stop();
                    this.player.animations.play("downidle", 6, true);
                }
            }
            
        }



        checkKeyDown() {
            this.player.body.setZeroVelocity();
          
           if ("Player2" == this.name) {
               
               if (this.LeftKey.isDown) {
                   if (!this.sneakAudio.isPlaying)
                       this.sneakAudio.play();
                    this.player.animations.play("left", 6, true);
                    this.player.body.moveLeft(200);
                    this.animationState1 = 0;
                }

               else if (this.RightKey.isDown) {
                   if (!this.sneakAudio.isPlaying)
                       this.sneakAudio.play();
                    this.player.animations.play("right", 6, true);
                    this.player.body.moveRight(200);
                    this.animationState1 = 1;
                }

               if (this.UpKey.isDown) {
                   if (!this.sneakAudio.isPlaying)
                       this.sneakAudio.play();
                    this.player.animations.play("up", 6, true);
                    this.player.body.moveUp(200);
                    this.animationState1 = 2;
                }
               else if (this.DownKey.isDown) {
                   if (!this.sneakAudio.isPlaying)
                       this.sneakAudio.play();
                    this.player.animations.play("down", 6, true);
                    this.player.body.moveDown(200);
                    this.animationState1 = 3;
                }
               
            }

            if ( "Player1" == this.name) {

                if (this.cursors.left.isDown)
                {
                    if (!this.sneakAudio.isPlaying)
                        this.sneakAudio.play();
                    this.player.animations.play("left", 6, true);
                    this.player.body.moveLeft(200);
                    this.animationState1 = 0;
                }

                if (this.cursors.right.isDown) {
                    if (!this.sneakAudio.isPlaying)
                        this.sneakAudio.play();
                    this.player.animations.play("right", 6, true);
                    this.player.body.moveRight(200);
                    this.animationState1 = 1;
                }

                if (this.cursors.up.isDown) {
                    if (!this.sneakAudio.isPlaying)
                        this.sneakAudio.play();
                    this.player.animations.play("up", 6, true);
                    this.player.body.moveUp(200);
                    this.animationState1 = 2;
                }
                if (this.cursors.down.isDown) {
                    if (!this.sneakAudio.isPlaying)
                        this.sneakAudio.play();
                    this.player.animations.play("down", 6, true);
                    this.player.body.moveDown(200);
                    this.animationState1 = 3;
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