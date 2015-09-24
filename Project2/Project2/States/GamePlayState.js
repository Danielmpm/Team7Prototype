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
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(this.game.width / this.backgroundImg.width, this.game.height / this.backgroundImg.height);
            this.player = new GameFromScratch.Player(this.game, 0, this.game.height - 50);
            this.game.add.existing(this.player);
        };
        return GamePlayState;
    })(Phaser.State);
    GameFromScratch.GamePlayState = GamePlayState;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=GamePlayState.js.map