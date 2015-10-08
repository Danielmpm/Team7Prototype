var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var LevelSelectMenu = (function (_super) {
        __extends(LevelSelectMenu, _super);
        function LevelSelectMenu() {
            _super.call(this);
            // titleText;
            //  ready: boolean;
            this.btnsY = 400;
        }
        LevelSelectMenu.prototype.preload = function () {
        };
        LevelSelectMenu.prototype.create = function () {
            this.game.add.sprite(0, 0, "background");
            this.game.add.button(600, this.btnsY, "rp_guard_house", this.onClickLevel1, this);
            this.game.add.button(900, this.btnsY, "rp_guard_house", this.onClickLevel2, this);
            this.game.add.button(1200, this.btnsY, "rp_guard_house", this.onClickLevel3, this);
        };
        LevelSelectMenu.prototype.update = function () {
        };
        LevelSelectMenu.prototype.onClickLevel1 = function () {
            GameFromScratch.GamePlayState.levelFile = "Levels/Lobby_A2.xml";
            this.game.state.start("BackgroundState");
        };
        LevelSelectMenu.prototype.onClickLevel2 = function () {
            GameFromScratch.GamePlayState.levelFile = "Levels/jeff_lv_22.xml";
            this.game.state.start("BackgroundState");
        };
        LevelSelectMenu.prototype.onClickLevel3 = function () {
            GameFromScratch.GamePlayState.levelFile = "Levels/LobbyHARD.xml";
            this.game.state.start("BackgroundState");
        };
        return LevelSelectMenu;
    })(Phaser.State);
    GameFromScratch.LevelSelectMenu = LevelSelectMenu;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=LevelSelectMenu.js.map