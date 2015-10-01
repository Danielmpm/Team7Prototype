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

        wallCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        copsCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        playerCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        
        gridX: number;
        gridY: number;

        constructor() {
            super();

            this.pozX1 = 1000;     // starting place.
            this.pozY1 = 400;

            this.pozX2 = 1200;
            this.pozY2 = 500;

            this.gridX = 70;
            this.gridY = 70;

            this.cops = [];

        }

        preload() {
          //  this.game.load.audio("backgroundMusic","Audios/test.mp3");
            this.game.load.image("cop", "Graphics/cop.jpg");
            this.game.load.image("crate", "Graphics/CrateTest.png");
        }

        create()
        {
           this.game.physics.startSystem(Phaser.Physics.P2JS);
           this.game.physics.p2.setImpactEvents(true);
           this.wallCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
           this.copsCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
           this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.game.physics.p2.updateBoundsCollisionGroup();
            
           this.loadLevel();
          
            //  this.game.load.image("h1", "Graphics/h1.jpg");
                    
            this.Player1 = new Player(this.game, this.pozX1, this.pozY1, "Player1");
            this.Player2 = new Player(this.game, this.pozX2, this.pozY2, "Player2");

            this.Player1.player.body.setCollisionGroup(this.playerCollisionGroup);
            this.Player2.player.body.setCollisionGroup(this.playerCollisionGroup);

            this.Player1.player.body.collides([this.wallCollisionGroup, this.copsCollisionGroup, this.playerCollisionGroup]);
            this.Player2.player.body.collides([this.wallCollisionGroup, this.copsCollisionGroup, this.playerCollisionGroup]);
            for (var i = 0; i < this.cops.length; i++) {
                this.cops[i].updatePlayerInfo(this.Player1,this.Player2);
            }

           // this.backgroundMusic = this.game.add.audio("backgroundMusic");
           // this.backgroundMusic.volume = 100;
           // this.backgroundMusic.loop = true;
           // this.backgroundMusic.play();

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
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(
                this.game.width / this.backgroundImg.width,
                this.game.height / this.backgroundImg.height);

            var levelInfo = this.game.cache.getXML("levelSource");

            var scaleX = this.gridX / parseFloat(levelInfo.documentElement.attributes.getNamedItem("tileheight").nodeValue);
            var scaleY = this.gridY / parseFloat(levelInfo.documentElement.attributes.getNamedItem("tilewidth").nodeValue);

            this.loadGuards(levelInfo, scaleX, scaleY);

            this.loadLevelObjects(levelInfo, scaleX, scaleY);

            this.loadColliders(levelInfo, scaleX, scaleY);

            this.loadPlayerSpawn(levelInfo, scaleX, scaleY);

        }

        loadLevelObjects( levelInfo : XMLDocument, scaleX:number, scaleY:number)
        {

            var obstacles = levelInfo.getElementsByName("Obstacles")[0].childNodes;

            for (var i = 0; i < obstacles.length ; i++) {

                if (obstacles[i].nodeName != "#text")
                {

                    var xValue = parseInt(obstacles[i].attributes.getNamedItem("x").nodeValue) * scaleX;
                    var yValue = parseInt(obstacles[i].attributes.getNamedItem("y").nodeValue) * scaleY;
                    var width = parseInt(obstacles[i].attributes.getNamedItem("width").nodeValue) * scaleX;
                    var height = parseInt(obstacles[i].attributes.getNamedItem("height").nodeValue) * scaleY;

                    var newSprite = this.game.add.sprite(xValue, yValue - height, Game.Project2.obstaclesIds[parseInt(obstacles[i].attributes.getNamedItem("gid").nodeValue) - 1]);
                    newSprite.scale.setTo(scaleX, scaleY);
                }
            }
        }

        loadColliders(levelInfo: XMLDocument, scaleX: number, scaleY: number) {

            var colliderNodes = levelInfo.getElementsByName("Collisions");
            if (colliderNodes.length != 0) {
                var cols = colliderNodes[0].childNodes;

                for (var i = 0; i < cols.length; i++) {

                    if (cols[i].nodeName != "#text") {
                        var xValue = parseInt(cols[i].attributes.getNamedItem("x").nodeValue) * scaleX;
                        var yValue = parseInt(cols[i].attributes.getNamedItem("y").nodeValue) * scaleY;
                        var width = parseInt(cols[i].attributes.getNamedItem("width").nodeValue) * scaleX;
                        var height = parseInt(cols[i].attributes.getNamedItem("height").nodeValue) * scaleY;

                        var body = this.game.physics.p2.createBody(xValue + width / 2, yValue + height / 2, 1, true);
                        body.addRectangle(width, height, 0, 0, 0);
                        body.setCollisionGroup(this.wallCollisionGroup);
                        body.collides([this.playerCollisionGroup, this.copsCollisionGroup]);
                        body.static = true;
                      //  body.debug = true;

                        this.game.physics.p2.enableBody(body, true);

                    }
                }
            }
        }

        loadGuards(levelInfo: XMLDocument, scaleX: number, scaleY: number)
        {
            var guardNodes = levelInfo.getElementsByName("GuardPaths");
            if (guardNodes.length != 0) {
                var guardPaths = guardNodes[0].childNodes;

                this.cops = [];
                for (var i = 0; i < guardPaths.length; i++) {

                    if (guardPaths[i].nodeName != "#text") {
                        var xValue = parseInt(guardPaths[i].attributes.getNamedItem("x").nodeValue) * scaleX;
                        var yValue = parseInt(guardPaths[i].attributes.getNamedItem("y").nodeValue) * scaleY;

                        var baseString = guardPaths[i].childNodes[1].attributes.getNamedItem("points").nodeValue;
                        var stringCoords = baseString.split(" ");

                        var path: Phaser.Point[] = [];
                        for (var j = 0; j < stringCoords.length; j++) {
                            var coord = stringCoords[j].split(",");
                            path.push(new Phaser.Point(parseInt(coord[0]) * scaleX + xValue, parseInt(coord[1]) * scaleY + yValue));

                        }


                        this.cops.push(new Cop(this.game, path));

                    }
                }
            }
        }

        loadPlayerSpawn(levelInfo: XMLDocument, scaleX: number, scaleY: number)
        {

            var spawnNodes = levelInfo.getElementsByName("PlayerSpawn");
            var currentPlayer: number = 0;
            if (spawnNodes.length != 0) {
                var nodes = spawnNodes[0].childNodes;

                for (var i = 0; i < nodes.length; i++) {

                    if (nodes[i].nodeName != "#text") {
                        var xValue = parseInt(nodes[i].attributes.getNamedItem("x").nodeValue) * scaleX;
                        var yValue = parseInt(nodes[i].attributes.getNamedItem("y").nodeValue) * scaleY;

                        if (currentPlayer == 0)
                        {
                            this.pozX1 = xValue;
                            this.pozY1 = yValue;
                            currentPlayer++;
                        }
                        else {
                            this.pozX2 = xValue;
                            this.pozY2 = yValue;
                        }
                    }
                }
            }
        }
    }
}