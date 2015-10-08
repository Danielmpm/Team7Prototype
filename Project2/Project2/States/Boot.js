var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.call(this);
        }
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            this.game.state.start("Preloader");
        };
        Boot.prototype.update = function () {
        };
        return Boot;
    })(Phaser.State);
    GameFromScratch.Boot = Boot;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Boot.js.map