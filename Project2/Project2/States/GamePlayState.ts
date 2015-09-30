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

        cops: GameFromScratch.Cop[];


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
            //this.cop = new Cop(this.game,1400, 500);

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

            for (var i = 0; i < this.cops.length; i++)
            {
                this.cops[i].update();
            }
  
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

                    var body = this.game.physics.p2.createBody(xValue + width / 2, yValue + height /2, 1, true);
                    body.addRectangle(width, height, 0, 0, 0);
                    body.static = true;
                    body.debug = true;

                   // console.log(body.debug);

                    this.game.physics.p2.enableBody(body, true);
                //    this.game.physics.p2.ena.body(body.sprite);
                }
            }


            var guardPaths = this.levelInfo.getElementsByName("GuardPaths")[0].childNodes;

            this.cops = [];
            for (var i = 0; i < guardPaths.length; i++)
            {

                if (guardPaths[i].nodeName != "#text") {
                    var xValue = parseInt(guardPaths[i].attributes.getNamedItem("x").nodeValue);
                    var yValue = parseInt(guardPaths[i].attributes.getNamedItem("y").nodeValue);

                    var baseString = guardPaths[i].childNodes[1].attributes.getNamedItem("points").nodeValue;
                    var stringCoords = baseString.split(" ");

                    var path: Phaser.Point[] = [];
                    for (var j = 0; j < stringCoords.length; j++) {
                        var coord = stringCoords[j].split(",");
                        path.push( new Phaser.Point(parseInt(coord[0]) + xValue, parseInt(coord[1]) + yValue) );

                   //     if( i == 1)
                    //        console.log("x: " + (parseInt(coord[0]) + xValue) + ", y: " + (parseInt(coord[1]) + yValue) );
                    }

                    this.cops.push(new Cop(this.game, path));

                }
                
            }

        }
    }
}