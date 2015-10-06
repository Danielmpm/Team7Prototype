var GameFromScratch;
(function (GameFromScratch) {
    var Player = (function () {
        function Player(game, posX, posY, name) {
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
            if (this.name == "Player1")
                this.player = game.add.sprite(this.PosX, this.PosY, "spy1", 0);
            if (this.name == "Player2")
                this.player = game.add.sprite(this.PosX, this.PosY, "spy2", 0);
            game.physics.p2.enable(this.player);
            //this.player.scale.setTo(0.4, 0.2);
            this.player.width = 70; // this.state.gridX;
            this.player.height = 70; //this.state.gridY;
            this.player.body.setCircle(30);
            this.player.angle = 0;
            this.player.body.fixedRotation = true;
            this.player.animations.add("leftwithcase", [0, 1, 2, 3]);
            this.player.animations.add("upwithcase", [4, 5, 6, 7]);
            this.player.animations.add("rightwithcase", [8, 9, 10, 11]);
            this.player.animations.add("downwithcase", [12, 13, 14, 15]);
            this.player.animations.add("leftidlewithcase", [16, 17, 18, 19]);
            this.player.animations.add("upidlewithcase", [20, 21]);
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
            //  this.player.animations.add()
            //  jellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('blueJellyfish', 0, 32, '', 4), 30, true);
            //  game.physics.p2.setPostBroadphaseCallback(this.CheckHitFlash, this);
        }
        Player.prototype.killPlayer = function () {
            this.dropBriefcase();
            this.respawn();
        };
        Player.prototype.respawn = function () {
            this.player.body.x = this.StartPosX;
            this.player.body.y = this.StartPosY;
        };
        Player.prototype.update = function () {
            this.checkKeyDown();
            if ("Player2" == this.name) {
                if (this.LeftKey.isUp && this.animationState1 == 0) {
                    this.player.animations.play("leftidle", 6, true);
                }
                if (this.RightKey.isUp && this.animationState1 == 1) {
                    this.player.animations.play("rightidle", 6, true);
                }
                if (this.UpKey.isUp && this.animationState1 == 2) {
                    this.player.animations.play("upidle", 6, true);
                }
                if (this.DownKey.isUp && this.animationState1 == 3) {
                    this.player.animations.play("downidle", 6, true);
                }
            }
            else {
                if (this.cursors.left.isUp && this.animationState1 == 0) {
                    this.player.animations.play("leftidle", 6, true);
                }
                if (this.cursors.right.isUp && this.animationState1 == 1) {
                    this.player.animations.play("rightidle", 6, true);
                }
                if (this.cursors.up.isUp && this.animationState1 == 2) {
                    this.player.animations.play("upidle", 6, true);
                }
                if (this.cursors.down.isUp && this.animationState1 == 3) {
                    this.player.animations.play("downidle", 6, true);
                }
            }
        };
        Player.prototype.checkKeyDown = function () {
            this.player.body.setZeroVelocity();
            if ("Player2" == this.name) {
                if (this.LeftKey.isDown) {
                    this.player.animations.play("left", 6, true);
                    this.player.body.moveLeft(200);
                    this.animationState1 = 0;
                }
                else if (this.RightKey.isDown) {
                    this.player.animations.play("right", 6, true);
                    this.player.body.moveRight(200);
                    this.animationState1 = 1;
                }
                if (this.UpKey.isDown) {
                    this.player.animations.play("up", 6, true);
                    this.player.body.moveUp(200);
                    this.animationState1 = 2;
                }
                else if (this.DownKey.isDown) {
                    this.player.animations.play("down", 6, true);
                    this.player.body.moveDown(200);
                    this.animationState1 = 3;
                }
            }
            if ("Player1" == this.name) {
                if (this.cursors.left.isDown) {
                    this.player.animations.play("left", 6, true);
                    this.player.body.moveLeft(200);
                    this.animationState1 = 0;
                }
                if (this.cursors.right.isDown) {
                    this.player.animations.play("right", 6, true);
                    this.player.body.moveRight(200);
                    this.animationState1 = 1;
                }
                if (this.cursors.up.isDown) {
                    this.player.animations.play("up", 6, true);
                    this.player.body.moveUp(200);
                    this.animationState1 = 2;
                }
                if (this.cursors.down.isDown) {
                    this.player.animations.play("down", 6, true);
                    this.player.body.moveDown(200);
                    this.animationState1 = 3;
                }
            }
        };
        Player.prototype.pickUpBriefcase = function (briefcase) {
            this.briefcase = briefcase;
        };
        Player.prototype.dropBriefcase = function () {
            if (this.briefcase != null) {
                this.briefcase.drop();
                this.briefcase = null;
            }
        };
        Player.Max_speed = 20;
        return Player;
    })();
    GameFromScratch.Player = Player;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Player.js.map