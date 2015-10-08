var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFormScratch;
(function (GameFormScratch) {
    var BackgroundState = (function (_super) {
        __extends(BackgroundState, _super);
        function BackgroundState() {
            _super.call(this);
        }
        BackgroundState.prototype.create = function () {
            this.backgourdImg = this.add.sprite(0, 0, "background");
            this.backgourdImg.scale.setTo(this.game.width / this.backgourdImg.width, this.game.height / this.backgourdImg.height);
        };
        return BackgroundState;
    })(Phaser.State);
    GameFormScratch.BackgroundState = BackgroundState;
})(GameFormScratch || (GameFormScratch = {}));
//# sourceMappingURL=Background.js.map