var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.call(this);
            this.ready = false;
        }
        Preloader.prototype.preload = function () {
        };
        Preloader.prototype.create = function () {
        };
        Preloader.prototype.update = function () {
            this.ready = true;
            this.game.state.start("StartMenu");
        };
        return Preloader;
    })(Phaser.State);
    GameFromScratch.Preloader = Preloader;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Preloader.js.map