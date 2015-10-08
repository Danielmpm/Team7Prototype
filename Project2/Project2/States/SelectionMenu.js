var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var SelectionMenu = (function (_super) {
        __extends(SelectionMenu, _super);
        function SelectionMenu() {
            _super.call(this);
            this.ready = false;
        }
        SelectionMenu.prototype.preload = function () {
        };
        SelectionMenu.prototype.create = function () {
        };
        SelectionMenu.prototype.update = function () {
            this.ready = true;
            //  this.game.state.start("StartMenu");
        };
        return SelectionMenu;
    })(Phaser.State);
    GameFromScratch.SelectionMenu = SelectionMenu;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=SelectionMenu.js.map