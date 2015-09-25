var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, posX, posY, name) {
            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
            this.name = name;
            _super.call(this, game, posX, posY, "h1");
            //   this.loadTexture("h1",0);
            //  this.anchor.set(0.0, 1.0);
        }
        Player.prototype.update = function () {
            this.checkKeyDown();
        };
        Player.prototype.checkKeyDown = function () {
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
        };
        Player.Max_speed = 20;
        return Player;
    })(Phaser.Sprite);
    GameFromScratch.Player = Player;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Player.js.map