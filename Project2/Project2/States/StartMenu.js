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
            this.startBG.height = 1080;
            //   this.doorSprite = this.game.add.sprite(0,0,"doors",0);
            this.frontSprite = this.game.add.sprite(0, 0, "frontSprite", 0);
            this.count = 0;
            this.isVisible = true;
            // this.player3 = new Player(this.game, 500, 500, "Player3");
            //  this.player2 = new Player(this.game, 800, 850, "Player2");
        };
        StartMenu.prototype.update = function () {
            if (this.count % 30 == 0 && this.isVisible) {
                this.isVisible = false;
                this.frontSprite.alpha = 0;
            }
            if (!this.isVisible && this.count == 0) {
                this.isVisible = true;
                this.frontSprite.alpha = 1;
            }
            if (this.isVisible) {
                this.count++;
            }
            else {
                this.count--;
            }
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