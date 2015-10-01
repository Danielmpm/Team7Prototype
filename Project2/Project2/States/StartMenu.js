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
            this.startBG = this.add.image(0, 0, "titlescreen");
            this.startBG.inputEnabled = true;
            this.startBG.events.onInputDown.addOnce(this.startGame, this);
        };
        StartMenu.prototype.update = function () {
        };
        StartMenu.prototype.startGame = function (pointer) {
            this.game.state.start("Game");
        };
        return StartMenu;
    })(Phaser.State);
    GameFromScratch.StartMenu = StartMenu;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=StartMenu.js.map