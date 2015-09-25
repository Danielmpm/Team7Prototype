var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFromScratch;
(function (GameFromScratch) {
    var GamePlayState = (function (_super) {
        __extends(GamePlayState, _super);
        function GamePlayState() {
            _super.call(this);
            this.pozX = 220;
            this.pozY = 200;
        }
        GamePlayState.prototype.preload = function () {
            this.game.load.audio("backgroundMusic", "Audios/test.mp3");
            this.game.load.image("cop", "Graphics/cop.jpg");
        };
        GamePlayState.prototype.create = function () {
            //  this.game.load.image("h1", "Graphics/h1.jpg");
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(this.game.width / this.backgroundImg.width, this.game.height / this.backgroundImg.height);
            this.Player1 = new GameFromScratch.Player(this.game, this.pozX, this.pozY, "Player1");
            //  this.game.add.existing(this.Player1); 
            this.cop = new GameFromScratch.Cop(this.game, 500, 400);
            this.backgroundMusic = this.game.add.audio("backgroundMusic");
            // this.backgroundMusic.volume = 100;
            this.backgroundMusic.loop = true;
            this.backgroundMusic.play();
        };
        GamePlayState.prototype.update = function () {
            this.Player1.update();
        };
        return GamePlayState;
    })(Phaser.State);
    GameFromScratch.GamePlayState = GamePlayState;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=GamePlayState.js.map