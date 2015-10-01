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
            //  this.titleImg = this.game.add.sprite(0, 0, "titleImage");
            //    this.titleImg.width = 1920;
            //    this.titleImg.height = 1080;//this.game.world.height;
            //   this.titleImg.scale.setTo(10, 10);
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