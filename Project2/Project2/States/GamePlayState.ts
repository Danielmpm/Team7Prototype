module GameFromScratch {
    export class GamePlayState extends Phaser.State {
        game: Phaser.Game;
        backgroundImg: Phaser.Sprite;
        backgroundMusic: Phaser.Sound;

        Player1: GameFromScratch.Player;
        Player2: GameFromScratch.Player;
        pozX1: number;
        pozY1: number;
        pozX2: number;
        pozY2: number;

        cop: GameFromScratch.Cop;


        levelInfo: XMLDocument;

        constructor() {
            super();

            this.pozX1 = 1000;
            this.pozY1 = 400;

            this.pozY2 = 1000;
            this.pozY2 = 500;
        }

        preload() {
          //  this.game.load.audio("backgroundMusic","Audios/test.mp3");
            this.game.load.image("cop", "Graphics/cop.jpg");
            this.game.load.image("crate", "Graphics/CrateTest.png");
        }

        create() {
          //  this.game.load.image("h1", "Graphics/h1.jpg");

           // this.game.load.image("cop", "Graphics/background_temp.jpg");
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(
                this.game.width / this.backgroundImg.width,
                this.game.height / this.backgroundImg.height);

            
           
            this.Player1 = new Player(this.game, this.pozX1, this.pozY1, "Player1");
            this.Player2 = new Player(this.game, 1200, this.pozY2, "Player2");
          //  this.game.add.existing(this.Player1); 
            this.cop = new Cop(this.game, 500, 400);

           // this.backgroundMusic = this.game.add.audio("backgroundMusic");
           // this.backgroundMusic.volume = 100;
           // this.backgroundMusic.loop = true;
           // this.backgroundMusic.play();
           this.loadLevel();
        }

        update()
        {
            this.Player1.update();
            this.Player2.update();
        }

        loadLevel ()
        {
            this.levelInfo = this.game.cache.getXML("levelSource");
            var gridX = 70;
            var gridY = 70;
        
            // Creating crate sprites.
            var crates = this.levelInfo.getElementsByName("Crates")[0].childNodes[1].childNodes;
           // console.log(this.levelInfo.getElementsByName("Crates")[0].childNodes[1]. nodeName);
            var x = 0;
            var y = 0;
            for (var i = 0; i < crates.length; i++) {

                if (crates[i].nodeName != "#text")
                {

                    if (parseInt(crates[i].attributes.getNamedItem("gid").nodeValue) == 1) {
                        // console.log(crates[i].attributes.getNamedItem("gid").nodeValue);
                        this.game.add.sprite((x % 27) * gridX , (y % 15) * gridY, "crate");
                    }
                    x++;

                    if ((x % 27) == 0) {
                        y++;
                      //  console.log("Advancing y");
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
                    var body = this.game.physics.p2.createBody(xValue + width / 2, yValue + height /2, 1, true);
                    body.addRectangle(width, height, 0, 0, 0);
                    body.static = true;
                    body.debug = true;

                   // console.log(body.debug);

                    this.game.physics.p2.enableBody(body, true);
                //    this.game.physics.p2.ena.body(body.sprite);
                }
            }
        }
    }
}