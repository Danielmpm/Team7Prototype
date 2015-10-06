module GameFromScratch {
    export class Cop {


        game: Phaser.Game;
        cop: Phaser.Sprite;
        light: Phaser.Sprite;
        state: GamePlayState;

        failAudio: Phaser.Sound;

        name: string;

        public static Max_speed: number = 150;

        // AI
        navPoints:Phaser.Point[];

        currentState: number;
        player1: Player;
        player2: Player;

        currentNode: number;
        timeLeft: number;

        targetX: number;
        targetY: number;


        static MaxWaitTime: number = 2500;
        static MinWaitTime: number = 1000;

        // Light
        lightX: number;
        lightY: number;
        lightRotation: number;

        currentContacts: number;

        constructor(game: Phaser.Game, nPoints: Phaser.Point[], dark: boolean)
        {
            this.game = game;
            this.state = <GamePlayState> this.game.state.getCurrentState();


            this.navPoints = nPoints;
            this.targetX = 0;
            this.targetY = 0;
            this.currentNode = 0;
            this.currentState = 0;

            this.timeLeft = (Cop.MaxWaitTime - Cop.MinWaitTime) * Math.random() + Cop.MinWaitTime;
            if (dark)
                this.cop = game.add.sprite(this.navPoints[0].x, this.navPoints[0].y, "cop");
            else
                this.cop = game.add.sprite(this.navPoints[0].x, this.navPoints[0].y, "cop2");
            this.cop.width = this.state.gridX;
            this.cop.height = this.state.gridY;

            this.light = game.add.sprite(0, 0, "flashlight");
            this.light.width = this.state.gridX*2;
            this.light.height = this.state.gridY;
            this.light.pivot.x = this.state.gridX * -1.7;

            this.currentContacts = 0;

            //this.cop.animations.add("walk");
            this.cop.animations.add("left", [0, 1]);
            this.cop.animations.add("down", [2, 3,4, 5]);
            this.cop.animations.add("right", [6,7]);
            this.cop.animations.add("up", [8,9,10,11]);


            this.failAudio = this.game.add.audio("fail");
            this.failAudio.loop = false;
            this.failAudio.allowMultiple = true;
        }

        updatePlayerInfo(player1: Player, player2: Player)
        {
            this.player1 = player1;
            this.player2 = player2;

            this.game.physics.p2.enable(this.cop);

            this.cop.body.setCircle(this.state.gridX *0.45);
            this.cop.body.setCollisionGroup(this.state.copsCollisionGroup);
            this.cop.body.collides([this.state.wallCollisionGroup, this.state.playerCollisionGroup ]);
            this.cop.body.createBodyCallback(player1.player, this.onCollisionPlayer1, this);
            this.cop.body.createBodyCallback(player2.player, this.onCollisionPlayer2, this);
            this.cop.body.fixedRotation = true;

            this.game.physics.p2.enable(this.light);
            this.light.body.setRectangle(this.light.width, this.light.height, this.state.gridX *1.5); 
            this.light.body.setCollisionGroup(this.state.copsCollisionGroup);
            this.light.body.collides([this.state.playerCollisionGroup]);
            this.light.body.createBodyCallback(player1.player, this.spottedPlayer1, this);
            this.light.body.createBodyCallback(player2.player, this.spottedPlayer2, this);
          //  this.light.body.onBeginContact.add(this.onContactWallBegin, this);
          //  this.light.body.onEndContact.add(this.onContactWallEnd, this);
            this.light.body.fixedRotation = true;

            this.updateAI();
        }



        onCollisionPlayer1(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body)
        {
            console.log("Hit Player 1");
            if (!this.failAudio.isPlaying)
                this.failAudio.play();

            this.player1.killPlayer();
        }

        onCollisionPlayer2(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
            console.log("Hit Player 2");
            if (!this.failAudio.isPlaying)
                this.failAudio.play();

            this.player2.killPlayer();
        }

        spottedPlayer1(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
            console.log("Spotted 1");

            if (!this.failAudio.isPlaying)
                this.failAudio.play();
            this.player1.killPlayer();
        }

        spottedPlayer2(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
            console.log("Spotted 2");

            if (!this.failAudio.isPlaying)
                this.failAudio.play();
            this.player2.killPlayer();
        }

        onContactWallBegin(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body)
        {
            this.currentContacts++;
          
        }

        onContactWallEnd(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
            this.currentContacts--;
          
        }

        update()
        {

            this.light.body.x = this.cop.x + this.lightX;
            this.light.body.y = this.cop.y + this.lightY;
            var delta = (this.game.time.elapsed / 500);
            if (delta > 1)
                delta = 1;

            this.light.rotation += (this.lightRotation - this.light.rotation) * delta;


            if (this.light.body != null) {
                this.light.body.rotation = this.light.rotation;//Math.atan2(y, x);
            }

            switch (this.currentState) {
                case 0:
                    this.movingStateUpdate();
                    break;
                case 1:
                    this.waitStateUpdate();
                    break;
                default:
                    break;
            }


        }

        updateAI()
        {
            switch (this.currentState)
            {
                case 0:
                    this.timeLeft = (Cop.MaxWaitTime - Cop.MinWaitTime) * Math.random() + Cop.MinWaitTime;
                    this.currentState = 1;
                    //this.updateLightRelativePosition();
                    this.pointLightToNextWaypoint();
                    //this.cop.animations.play("walk", 3, true);
                    if (this.currentContacts != 0) {
                        this.pointLightToNextWaypoint();
                    }
                    this.cop.animations.stop();
                    break;
                case 1:
                    this.currentNode = (this.currentNode + 1) % this.navPoints.length;
                    this.targetX = this.navPoints[this.currentNode].x;
                    this.targetY = this.navPoints[this.currentNode].y;
                    this.currentState = 0;
                    this.updateLightRelativePosition();
                    //if (this.targetX > this.cop.body.x)
                    //    this.cop.scale.x = 1;
                    //else {
                    //    this.cop.scale.x = -1;
                    //}
                      
                    // this.pointLightToNextWaypoint();
                    break;
                default:
                    break;
            }
        }

        updateLightRelativePosition()
        {
            var x = (this.targetX - this.cop.x);
            var y = (this.targetY - this.cop.y);
            var sqrLength = Math.sqrt(x * x + y * y); 


            this.lightRotation = Math.atan2(y, x);

            this.lightX = (x / sqrLength);// * this.state.gridX /2;
            this.lightY = (y / sqrLength);// * this.state.gridY /2;
        }

        pointLightToNextWaypoint()
        {
            var nextNode = (this.currentNode + 1) % this.navPoints.length;
            var targetX = this.navPoints[nextNode].x;
            var targetY = this.navPoints[nextNode].y;

            var x = (targetX - this.cop.x);
            var y = (targetY - this.cop.y);
            var sqrLength = Math.sqrt(x * x + y * y);

            this.lightRotation = Math.atan2(y, x);

            this.lightX = (x / sqrLength);
            this.lightY = (y / sqrLength);
        }

        waitStateUpdate()
        {
            this.timeLeft -= this.game.time.elapsed;
            this.cop.body.setZeroVelocity();


            if (this.timeLeft <= 0)
            {
                this.updateAI();
            }
        }

        movingStateUpdate()
        {
            if (Math.abs(this.cop.x - this.targetX) < 5 && Math.abs(this.cop.y - this.targetY) < 5)
            {
               this.updateAI();
            }
            else {

                var xSpeed = (this.targetX - this.cop.x) * this.game.time.elapsed >= Cop.Max_speed ? Cop.Max_speed : (this.targetX - this.cop.x);
                xSpeed = xSpeed * this.game.time.elapsed <= -Cop.Max_speed ? -Cop.Max_speed : xSpeed;
                var ySpeed = (this.targetY - this.cop.y) * this.game.time.elapsed >= Cop.Max_speed ? Cop.Max_speed : (this.targetY - this.cop.y);
                ySpeed = ySpeed * this.game.time.elapsed <= -Cop.Max_speed ? -Cop.Max_speed : ySpeed;

                this.cop.body.moveRight(xSpeed);
                this.cop.body.moveDown(ySpeed);

                if (xSpeed >= 0 && Math.abs(xSpeed) > Math.abs(ySpeed)) {
                    this.cop.animations.play("right", 10, true);
                }
                else if (xSpeed < 0 && Math.abs(xSpeed) > Math.abs(ySpeed)) {
                    this.cop.animations.play("left", 10, true);
                }
                else if (ySpeed >= 0 ) {
                    this.cop.animations.play("up", 10, true);
                }
                else {
                    this.cop.animations.play("down", 10, true);
                }
            }
        }

  
     
    }



} 