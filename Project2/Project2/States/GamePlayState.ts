module GameFromScratch {
    export class GamePlayState extends Phaser.State {
        game: Phaser.Game;
        backgroundImg: Phaser.Sprite;
        backgroundMusic: Phaser.Sound;

        Player1: GameFromScratch.Player;
        Player2: GameFromScratch.Player;
   

        briefcase: GameFromScratch.Briefcase;


        cops: GameFromScratch.Cop[];
        exits: Phaser.Physics.P2.Body[];
        walls: Phaser.Physics.P2.Body[];

        wallCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        copsCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        playerCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        exitsCollisionGroup: Phaser.Physics.P2.CollisionGroup;

         music;


        gridX: number;
        gridY: number;

        constructor() {
            super();


            this.gridX = 70;
            this.gridY = 70;

            this.cops = [];
            this.exits = [];
            this.walls = [];

        }

        preload() {
            this.game.load.audio("backgroundMusic","Audios/Spy_Glass.mp3");

            this.game.load.audio("success", "Audios/success.mp3");
            this.game.load.audio("fail", "Audios/fail.mp3");
            this.game.load.audio("sneak", "Audios/sneak.mp3");

            this.game.load.atlasXML("cop", "Graphics/rp_pixel_cop_1.png", "Graphics/rp_pixel_cop_1.xml");
            this.game.load.atlasXML("cop2", "Graphics/rp_pixel_cop_2.png", "Graphics/rp_pixel_cop_2.xml");
            this.game.load.atlasXML("spy1", "Graphics/spy1.png", "Graphics/spy1.xml");
            this.game.load.atlasXML("spy2", "Graphics/spy2.png", "Graphics/spy2.xml");
        

            this.game.load.xml("levelSource", "Levels/jeff_lv_22.xml");
        }

        create()
        {
           this.game.physics.startSystem(Phaser.Physics.P2JS);
           this.game.physics.p2.setImpactEvents(true);
           this.wallCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
           this.copsCollisionGroup = this.game.physics.p2.createCollisionGroup(); 
           this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
           this.exitsCollisionGroup = this.game.physics.p2.createCollisionGroup();
           this.game.physics.p2.updateBoundsCollisionGroup();

           this.music = this.game.add.audio("backgroundMusic");

           this.music.play();
           this.music.loop = true;

            
           this.loadLevel();
          
           
            // add sound
           this.backgroundMusic = this.game.add.audio("backgroundMusic");
           this.backgroundMusic.allowMultiple = true;
           this.backgroundMusic.loop = true;

           // play music
           this.backgroundMusic.fadeIn(2500);
         

            for (var i = 0; i < this.cops.length; i++) {
                this.cops[i].updatePlayerInfo(this.Player1,this.Player2);
            }

            
        }

        update()
        {
            

            this.Player1.update();
            this.Player2.update();

            for (var i = 0; i < this.cops.length; i++)
            {
                this.cops[i].update();
            }

            if (this.briefcase != null)
            this.briefcase.update();
  
        }


        loadLevel ()
        {
            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg = this.add.sprite(0, 0, "backgroundBorder");
            this.backgroundImg.scale.setTo(
                this.game.width / this.backgroundImg.width,
                this.game.height / this.backgroundImg.height);

            var levelInfo = this.game.cache.getXML("levelSource");

            var scaleX = this.gridX / parseFloat(levelInfo.documentElement.attributes.getNamedItem("tileheight").nodeValue);
            var scaleY = this.gridY / parseFloat(levelInfo.documentElement.attributes.getNamedItem("tilewidth").nodeValue);

            this.loadGuards(levelInfo, scaleX, scaleY);

            this.loadPlayers(levelInfo, scaleX, scaleY);

            this.loadLevelObjects(levelInfo, scaleX, scaleY);

            this.loadColliders(levelInfo, scaleX, scaleY);

            this.loadExit(levelInfo, scaleX, scaleY);

            this.loadBriefcase(levelInfo, scaleX, scaleY);

         //   this.raycastWall(0, 0, 100, 100);

        }

        loadLevelObjects( levelInfo : XMLDocument, scaleX:number, scaleY:number)
        {

            var obstacles = levelInfo.getElementsByName("Obstacles")[0].childNodes;

            for (var i = 0; i < obstacles.length ; i++) {

                if (obstacles[i].nodeName != "#text")
                {

                    var xValue = parseFloat(obstacles[i].attributes.getNamedItem("x").nodeValue) * scaleX;
                    var yValue = parseFloat(obstacles[i].attributes.getNamedItem("y").nodeValue) * scaleY;
                    var width = parseFloat(obstacles[i].attributes.getNamedItem("width").nodeValue) * scaleX;
                    var height = parseFloat(obstacles[i].attributes.getNamedItem("height").nodeValue) * scaleY ;
                   // var rotationNode = obstacles[i].attributes.getNamedItem("rotation").nodeValue;
                    var rotation = 0;
                    if (obstacles[i].attributes.getNamedItem("rotation"))
                        rotation = parseFloat(obstacles[i].attributes.getNamedItem("rotation").nodeValue);


                        var newSprite = this.game.add.sprite(xValue, yValue, Game.Project2.obstaclesIds[parseInt(obstacles[i].attributes.getNamedItem("gid").nodeValue) - 1]);
                        // newSprite.scale.setTo(scaleX, scaleY);
                        newSprite.width = width;
                        newSprite.height = height;
                        newSprite.pivot.x = 0;
                        newSprite.pivot.y = height / scaleY;
                        newSprite.rotation = Phaser.Math.degToRad(rotation);
                    
                }
            }
        }

        loadColliders(levelInfo: XMLDocument, scaleX: number, scaleY: number) {

            var colliderNodes = levelInfo.getElementsByName("Collisions");
            if (colliderNodes.length != 0) {
                var cols = colliderNodes[0].childNodes;

                for (var i = 0; i < cols.length; i++) {

                    if (cols[i].nodeName != "#text") {
                        var xValue = parseFloat(cols[i].attributes.getNamedItem("x").nodeValue) * scaleX;
                        var yValue = parseFloat(cols[i].attributes.getNamedItem("y").nodeValue) * scaleY;
                        var width = parseFloat(cols[i].attributes.getNamedItem("width").nodeValue) * scaleX;
                        var height = parseFloat(cols[i].attributes.getNamedItem("height").nodeValue) * scaleY;
                        var rotation = 0;
                        if (cols[i].attributes.getNamedItem("rotation")) {
                            rotation = parseFloat(cols[i].attributes.getNamedItem("rotation").nodeValue);
                         
                        }
                        var body = this.game.physics.p2.createBody(xValue, yValue , 1, true);
                        body.addRectangle(width, height, width / 2, height / 2, 0);
                        body.rotation = Phaser.Math.degToRad(rotation);
                        body.setCollisionGroup(this.wallCollisionGroup);
                        body.collides([this.playerCollisionGroup, this.copsCollisionGroup]);
                        body.static = true;
                    //    body.debug = true;

                        this.game.physics.p2.enableBody(body, true);
                        this.walls.push(body);
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
                for (var i = 0; i < guardPaths.length ; i++) {

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

                        this.cops.push(new Cop(this.game, path, (i%4 == 1)));

                    }
                }
            }
        }

        loadPlayers(levelInfo: XMLDocument, scaleX: number, scaleY: number)
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

                            this.Player1 = new Player(this.game, xValue, yValue, "Player1");
                            this.Player1.player.body.setCollisionGroup(this.playerCollisionGroup);
                            this.Player1.player.body.collides([this.wallCollisionGroup, this.copsCollisionGroup, this.playerCollisionGroup]);

                            currentPlayer++;
                        }
                        else {
                            this.Player2 = new Player(this.game, xValue, yValue, "Player2");
                            this.Player2.player.body.setCollisionGroup(this.playerCollisionGroup);
                            this.Player2.player.body.collides([this.wallCollisionGroup, this.copsCollisionGroup, this.playerCollisionGroup]);
                         
                        }
                    }
                }
            }
        }

        loadBriefcase(levelInfo: XMLDocument, scaleX: number, scaleY: number) {
            var spawnNodes = levelInfo.getElementsByName("Briefcase");
            if (spawnNodes.length != 0) {

                var nodes = spawnNodes[0].childNodes;

                for (var i = 0; i < nodes.length; i++) {

                    if (nodes[i].nodeName != "#text") {
                        var xValue = parseInt(nodes[i].attributes.getNamedItem("x").nodeValue) * scaleX;
                        var yValue = parseInt(nodes[i].attributes.getNamedItem("y").nodeValue) * scaleY;

                        this.briefcase = new Briefcase(this.game, xValue, yValue, this.Player1, this.Player2);

                    }
                }
            }
        }

        loadExit(levelInfo: XMLDocument, scaleX: number, scaleY: number) {
            var spawnNodes = levelInfo.getElementsByName("Exit");
            if (spawnNodes.length != 0) {

                var nodes = spawnNodes[0].childNodes;

                for (var i = 0; i < nodes.length; i++) {

                    if (nodes[i].nodeName != "#text") {

                        var xValue = parseFloat(nodes[i].attributes.getNamedItem("x").nodeValue) * scaleX;
                        var yValue = parseFloat(nodes[i].attributes.getNamedItem("y").nodeValue) * scaleY;
                        var width = parseFloat(nodes[i].attributes.getNamedItem("width").nodeValue) * scaleX;
                        var height = parseFloat(nodes[i].attributes.getNamedItem("height").nodeValue) * scaleY;
                        var rotation = 0;
                        if (nodes[i].attributes.getNamedItem("rotation")) {
                            rotation = parseFloat(nodes[i].attributes.getNamedItem("rotation").nodeValue);
                            //console.log("rotation: " + rotation);
                        }
                        var body = this.game.physics.p2.createBody(xValue, yValue , 1, true);
                        body.addRectangle(width, height, width / 2, height / 2, 0);
                        body.rotation = Phaser.Math.degToRad(rotation);
                        body.setCollisionGroup(this.playerCollisionGroup);
                        body.collides([this.copsCollisionGroup]);
                        body.static = true;
                        //body.debug = true;
                        this.exits.push(body);

                        this.game.physics.p2.enableBody(body, true);

                    }
                }
            }
        }
    }
}