var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            this.game = game;
            this.speed = 5;
            //this.Right_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            // this.Right_arrow.onDown.add(Player.prototype.MoveRight, this);
            //this.Left_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            // this.Left_arrow.onDown.add(Player.prototype.MoveLeft, this);
            //this.Up_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            //this.Up_arrow.onDown.add(Player.prototype.MoveUP, this);
            //this.Down_arrow = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            // this.Down_arrow.onDown.add(Player.prototype.MoveDown, this);
            _super.call(this, game, x, y, "h1");
            //   this.loadTexture("h1",0);
            this.anchor.set(0.0, 1.0);
        }
        Player.prototype.update = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.x -= this.speed;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.x += this.speed;
            }
        };
        Player.prototype.MoveRight = function () {
            this.x += 5;
        };
        Player.prototype.MoveLeft = function () {
            this.x -= 5;
        };
        Player.prototype.MoveUP = function () {
            this.y -= 5;
        };
        Player.prototype.MoveDown = function () {
            this.y += 5;
        };
        Player.Max_speed = 20;
        return Player;
    })(Phaser.Sprite);
    GameFromScratch.Player = Player;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Player.js.map