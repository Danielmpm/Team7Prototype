var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var BackgroundState = (function (_super) {
        __extends(BackgroundState, _super);
        function BackgroundState() {
            _super.call(this);
        }
        BackgroundState.prototype.create = function () {
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(this.game.width / this.backgroundImg.width, this.game.height / this.backgroundImg.height);
            this.playerImg = this.add.sprite(0, 0, "H2");
            this.playerImg.scale.setTo(this.game.width / this.backgroundImg.width, this.game.height / this.backgroundImg.height);
            this.playerImg.resizeFrame(10, 20, 20);
        };
        return BackgroundState;
    })(Phaser.State);
    GameFromScratch.BackgroundState = BackgroundState;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=BackgroundState.js.map