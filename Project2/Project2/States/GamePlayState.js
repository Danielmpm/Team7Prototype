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
            this.pozX1 = 1000;
            this.pozY1 = 400;
            this.pozY2 = 1000;
            this.pozY2 = 500;
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
            this.Player1 = new GameFromScratch.Player(this.game, this.pozX1, this.pozY1, "Player1");
            this.Player2 = new GameFromScratch.Player(this.game, 1200, this.pozY2, "Player2");
            //  this.game.add.existing(this.Player1); 
            //this.cop = new Cop(this.game,1400, 500);
            // this.backgroundMusic = this.game.add.audio("backgroundMusic");
            // this.backgroundMusic.volume = 100;
            // this.backgroundMusic.loop = true;
            // this.backgroundMusic.play();
            this.loadLevel();
        };
        GamePlayState.prototype.update = function () {
            this.Player1.update();
            this.Player2.update();
            for (var i = 0; i < this.cops.length; i++) {
                this.cops[i].update();
            }
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
                    var body = this.game.physics.p2.createBody(xValue + width / 2, yValue + height / 2, 1, true);
                    body.addRectangle(width, height, 0, 0, 0);
                    body.static = true;
                    body.debug = true;
                    // console.log(body.debug);
                    this.game.physics.p2.enableBody(body, true);
                }
            }
            var guardPaths = this.levelInfo.getElementsByName("GuardPaths")[0].childNodes;
            this.cops = [];
            for (var i = 0; i < guardPaths.length; i++) {
                if (guardPaths[i].nodeName != "#text") {
                    var xValue = parseInt(guardPaths[i].attributes.getNamedItem("x").nodeValue);
                    var yValue = parseInt(guardPaths[i].attributes.getNamedItem("y").nodeValue);
                    var baseString = guardPaths[i].childNodes[1].attributes.getNamedItem("points").nodeValue;
                    var stringCoords = baseString.split(" ");
                    var path = [];
                    for (var j = 0; j < stringCoords.length; j++) {
                        var coord = stringCoords[j].split(",");
                        path.push(new Phaser.Point(parseInt(coord[0]) + xValue, parseInt(coord[1]) + yValue));
                    }
                    this.cops.push(new GameFromScratch.Cop(this.game, path));
                }
            }
        };
        return GamePlayState;
    })(Phaser.State);
    GameFromScratch.GamePlayState = GamePlayState;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=GamePlayState.js.map