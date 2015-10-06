var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var StartMenu = (function (_super) {
        __extends(StartMenu, _super);
        function StartMenu() {
            _super.call(this);
        }
        StartMenu.prototype.preload = function () {
        };
        StartMenu.prototype.create = function () {
            this.startBG = this.add.sprite(0, 0, "titleScreen");
            this.startBG.width = 1920;
            this.startBG.height = 1080; //this.game.world.height;
            //   this.titleImg.scale.setTo(10, 10);
        };
        StartMenu.prototype.update = function () {
            if (this.game.input.activePointer.isDown) {
                this.startGame();
            }
        };
        StartMenu.prototype.startGame = function () {
            this.game.state.start("BackgroundState");
        };
        return StartMenu;
    })(Phaser.State);
    GameFromScratch.StartMenu = StartMenu;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=StartMenu.js.map