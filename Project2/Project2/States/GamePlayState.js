var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var GamePlayState = (function (_super) {
        __extends(GamePlayState, _super);
        function GamePlayState() {
            _super.call(this);
        }
        GamePlayState.prototype.create = function () {
            // this.game.physics.startSystem(Phaser.Physics.BOX2D);
            // this.game.add.physicsGroup(Phaser.Physics.BOX2D);
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(this.game.width / this.backgroundImg.width, this.game.height / this.backgroundImg.height);
            this.Player1 = new GameFromScratch.Player(this.game, 220, 200, "Player1");
            this.game.add.existing(this.Player1);
            this.Player1.smoothed = false;
            // this.Player1.body.setZeroVelocity();
            this.player2 = new GameFromScratch.Player(this.game, 600, 300, "Player2");
            this.game.add.existing(this.player2);
            // this.game.physics.box2d.enable(this.Player1);
        };
        GamePlayState.prototype.update = function () {
            this.Player1.update();
            this.player2.update();
        };
        return GamePlayState;
    })(Phaser.State);
    GameFromScratch.GamePlayState = GamePlayState;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=GamePlayState.js.map