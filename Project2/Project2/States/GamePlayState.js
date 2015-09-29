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
            this.pozX = 1000;
            this.pozY = 400;
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
            this.cop = new GameFromScratch.Cop(this.game, 1400, 500);
            // this.backgroundMusic = this.game.add.audio("backgroundMusic");
            // this.backgroundMusic.volume = 100;
            // this.backgroundMusic.loop = true;
            // this.backgroundMusic.play();
            this.loadLevel();
        };
        GamePlayState.prototype.update = function () {
            this.Player1.update();
            this.cop.update();
        };
        GamePlayState.prototype.loadLevel = function () {
            this.levelInfo = this.game.cache.getXML("levelSource");
            var gridX = 70;
            var gridY = 70;
            // Creating crate sprites.
            var crates = this.levelInfo.getElementsByName("Crates")[0].childNodes[1].childNodes;
            // console.log(this.levelInfo.getElementsByName("Crates")[0].childNodes[1]. nodeName);
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
            var cols = this.levelInfo.getElementsByName("Collisions")[0].childNodes;
            for (var i = 0; i < cols.length; i++) {
                if (cols[i].nodeName != "#text") {
                    var xValue = parseInt(cols[i].attributes.getNamedItem("x").nodeValue);
                    var yValue = parseInt(cols[i].attributes.getNamedItem("y").nodeValue);
                    var width = parseInt(cols[i].attributes.getNamedItem("width").nodeValue);
                    var height = parseInt(cols[i].attributes.getNamedItem("height").nodeValue);
                    //var points = [0, 0, width, 0, width, height, 0, height];
                    var body = this.game.physics.p2.createBody(xValue + width / 2, yValue + height / 2, 1, true);
                    body.addRectangle(width, height, 0, 0, 0);
                    body.static = true;
                    body.debug = true;
                    // console.log(body.debug);
                    this.game.physics.p2.enableBody(body, true);
                }
            }
        };
        return GamePlayState;
    })(Phaser.State);
    GameFromScratch.GamePlayState = GamePlayState;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=GamePlayState.js.map