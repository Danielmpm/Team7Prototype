var GameFromScratch;
(function (GameFromScratch) {
    var Player = (function () {
        function Player(game, posX, posY, name) {
            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
            this.name = name;
            this.PosX = posX;
            this.PosY = posY;
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.LeftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.RightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.UpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.DownKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.player = game.add.sprite(this.PosX, this.PosY, "h1");
            game.physics.p2.enable(this.player, true);
            this.player.scale.setTo(0.4, 0.2);
            this.player.body.setRectangle(40, 40);
            this.player.angle = 0;
            this.player.body.fixedRotation = true;
            //  game.physics.p2.setPostBroadphaseCallback(this.CheckHitFlash, this);
        }
        Player.prototype.update = function () {
            this.checkKeyDown();
        };
        Player.prototype.checkKeyDown = function () {
            this.player.body.setZeroVelocity();
            if ("Player2" == this.name) {
                if (this.LeftKey.isDown)
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
        };
        Player.Max_speed = 20;
        return Player;
    })();
    GameFromScratch.Player = Player;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Player.js.map