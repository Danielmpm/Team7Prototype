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
            //  this.game.load.audio("backgroundMusic","Audios/test.mp3");
            this.game.load.image("cop", "Graphics/cop.jpg");
            this.game.load.image("crate", "Graphics/CrateTest.png");
        };
        GamePlayState.prototype.create = function () {
            //  this.game.load.image("h1", "Graphics/h1.jpg");
            // this.game.load.image("cop", "Graphics/background_temp.jpg");
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(this.game.width / this.backgroundImg.width, this.game.height / this.backgroundImg.height);
            this.Player1 = new GameFromScratch.Player(this.game, this.pozX, this.pozY, "Player1");
            //  this.game.add.existing(this.Player1); 
            this.cop = new GameFromScratch.Cop(this.game, 500, 400);
            // this.backgroundMusic = this.game.add.audio("backgroundMusic");
            // this.backgroundMusic.volume = 100;
            // this.backgroundMusic.loop = true;
            // this.backgroundMusic.play();
            this.loadLevel();
        };
        GamePlayState.prototype.update = function () {
            this.Player1.update();
        };
        GamePlayState.prototype.loadLevel = function () {
            this.levelInfo = this.game.cache.getXML("levelSource");
            var gridX = 70;
            var gridY = 70;
            // Creating crate sprites.
            var crates = this.levelInfo.getElementsByName("Crates")[0].childNodes[1].childNodes;
            console.log(this.levelInfo.getElementsByName("Crates")[0].childNodes[1].nodeName);
            var x = 0;
            var y = 0;
            for (var i = 0; i < crates.length; i++) {
                if (crates[i].nodeName != "#text") {
                    if (parseInt(crates[i].attributes.getNamedItem("gid").nodeValue) == 1) {
                        // console.log(crates[i].attributes.getNamedItem("gid").nodeValue);
                        this.game.add.sprite((x % 27) * gridX, (y % 15) * gridY, "crate");
                    }
                    x++;
                    if ((x % 27) == 0) {
                        y++;
                    }
                }
            }
            //var cols = this.levelInfo.getElementsByName("Collision");
            //for (var i = 0; i < cols.length; i++) {
            //    //   this.game.debug.text( cols[i].nodeValue );
            //    console.log(cols[i].nodeName);
            //}
        };
        return GamePlayState;
    })(Phaser.State);
    GameFromScratch.GamePlayState = GamePlayState;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=GamePlayState.js.map