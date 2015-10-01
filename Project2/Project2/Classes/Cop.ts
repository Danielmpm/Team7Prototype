module GameFromScratch {
    export class Cop {


        game: Phaser.Game;
        cop: Phaser.Sprite;
        light: Phaser.Sprite;

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

        state: GamePlayState;

        static MaxWaitTime: number = 2500;
        static MinWaitTime: number = 1000;

        copSensor: Phaser.Physics.P2.Body;
        
        // Light
        lightX: number;
        lightY: number;

        currentContacts: number;

        constructor(game: Phaser.Game, nPoints: Phaser.Point[])
        {
            this.game = game;
            this.state = <GamePlayState> this.game.state.getCurrentState();


            this.navPoints = nPoints;
            this.targetX = 0;
            this.targetY = 0;
            this.currentNode = 0;
            this.currentState = 0;

            this.timeLeft = (Cop.MaxWaitTime - Cop.MinWaitTime) * Math.random() + Cop.MinWaitTime;

            this.cop = game.add.sprite(this.navPoints[0].x, this.navPoints[0].y, "cop");
            this.cop.width = this.state.gridX;
            this.cop.height = this.state.gridY;

            this.light = game.add.sprite(0, 0, "flashlight");
            this.light.width = this.state.gridX*2;
            this.light.height = this.state.gridY;
            this.light.pivot.x = this.state.gridX * -1.5;
            

            this.currentContacts = 0;

        }

        updatePlayerInfo(player1: Player, player2: Player)
        {
            this.player1 = player1;
            this.player2 = player2;

            this.game.physics.p2.enable(this.cop);

            this.cop.body.setCircle(this.state.gridX / 2);
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

            this.copSensor = this.game.physics.p2.createBody(this.cop.x + this.lightX, this.cop.y + this.lightY, 1, true);
            this.copSensor.addRectangle(this.state.gridX * 0.5, this.state.gridX * 0.5, 0, 0, 0);
            this.copSensor.setCollisionGroup(this.state.wallCollisionGroup);
            this.copSensor.collides([this.state.playerCollisionGroup]);//, this.state.copsCollisionGroup]);
            this.copSensor.onBeginContact.add(this.onContactWallBegin, this);
            this.copSensor.onEndContact.add(this.onContactWallEnd, this);
            this.copSensor.debug = true;
            this.copSensor.static = false;

            this.game.physics.p2.enableBody(this.copSensor, true);
            this.updateAI();
        }



        onCollisionPlayer1(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body)
        {
            console.log("Hit Player 1");
            this.player1.respawn();
        }

        onCollisionPlayer2(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
            console.log("Hit Player 2");
            this.player2.respawn();
        }

        spottedPlayer1(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
            console.log("Spotted 1");
            this.player1.respawn();
        }

        spottedPlayer2(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
            console.log("Spotted 2");
            this.player2.respawn();
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
                    if (this.currentContacts != 0) {
                        this.pointLightToNextWaypoint();
                    }
                    break;
                case 1:
                    this.currentNode = (this.currentNode + 1) % this.navPoints.length;
                    this.targetX = this.navPoints[this.currentNode].x;
                    this.targetY = this.navPoints[this.currentNode].y;
                    this.currentState = 0;
                    this.updateLightRelativePosition();
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

            this.light.rotation = Math.atan2(y, x);


            if (this.light.body != null) {
                this.light.body.rotation = this.light.rotation;//Math.atan2(y, x);
            }
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

            this.light.rotation = Math.atan2(y, x);


            if (this.light.body != null) {
                this.light.body.rotation = this.light.rotation;
            }
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

                //var signX = ((this.targetX - this.cop.x) >= 0) ? 1 : -1;
                //var signY = ((this.targetY - this.cop.y) >= 0) ? 1 : -1;

                //this.cop.body.moveRight(Cop.Max_speed * signX);
                //this.cop.body.moveDown(Cop.Max_speed * signY);
            }
        }

  
     
    }



} 