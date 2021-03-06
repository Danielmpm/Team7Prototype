var GameFromScratch;
(function (GameFromScratch) {
    var Cop = (function () {
        function Cop(game, nPoints, dark) {
            this.game = game;
            this.state = this.game.state.getCurrentState();
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
            this.light.width = this.state.gridX * 2;
            this.light.height = this.state.gridY;
            this.light.pivot.x = this.state.gridX * -1.7;
            this.exclamation = null;
            this.currentContacts = 0;
            this.cop.animations.add("left", [0, 1]);
            this.cop.animations.add("down", [2, 3, 4, 5]);
            this.cop.animations.add("right", [6, 7]);
            this.cop.animations.add("up", [8, 9, 10, 11]);
            this.failAudio = this.game.add.audio("fail");
            this.failAudio.loop = false;
            this.failAudio.allowMultiple = true;
        }
        Cop.prototype.updatePlayerInfo = function (player1, player2) {
            this.player1 = player1;
            this.player2 = player2;
            this.game.physics.p2.enable(this.cop);
            this.cop.body.setCircle(this.state.gridX * 0.45);
            this.cop.body.setCollisionGroup(this.state.copsCollisionGroup);
            this.cop.body.collides([this.state.wallCollisionGroup, this.state.playerCollisionGroup]);
            this.cop.body.createBodyCallback(player1.player, this.onCollisionPlayer1, this);
            this.cop.body.createBodyCallback(player2.player, this.onCollisionPlayer2, this);
            this.cop.body.fixedRotation = true;
            this.game.physics.p2.enable(this.light);
            this.light.body.setRectangle(this.light.width, this.light.height, this.state.gridX * 1.5);
            this.light.body.setCollisionGroup(this.state.copsCollisionGroup);
            this.light.body.collides([this.state.playerCollisionGroup]);
            this.light.body.createBodyCallback(player1.player, this.spottedPlayer1, this);
            this.light.body.createBodyCallback(player2.player, this.spottedPlayer2, this);
            this.light.body.mass = 100;
            //  this.light.body.onBeginContact.add(this.onContactWallBegin, this);
            //  this.light.body.onEndContact.add(this.onContactWallEnd, this);
            this.light.body.fixedRotation = true;
            this.updateAI();
        };
        Cop.prototype.spotPlayer = function (player) {
            if (!this.failAudio.isPlaying)
                this.failAudio.play();
            if (this.exclamation == null)
                this.exclamation = this.game.add.sprite(0, 0, "exclamation");
            this.exclamationTime = 1000;
            this.exclamation.visible = true;
            player.killPlayer();
        };
        Cop.prototype.onCollisionPlayer1 = function (body1, body2) {
            //console.log("Hit Player 1");
            this.spotPlayer(this.player1);
        };
        Cop.prototype.onCollisionPlayer2 = function (body1, body2) {
            this.spotPlayer(this.player2);
        };
        Cop.prototype.spottedPlayer1 = function (body1, body2) {
            this.spotPlayer(this.player1);
        };
        Cop.prototype.spottedPlayer2 = function (body1, body2) {
            this.spotPlayer(this.player2);
        };
        Cop.prototype.onContactWallBegin = function (body1, body2) {
            this.currentContacts++;
        };
        Cop.prototype.onContactWallEnd = function (body1, body2) {
            this.currentContacts--;
        };
        Cop.prototype.update = function () {
            if (this.exclamation != null) {
                this.exclamation.x = this.cop.x;
                this.exclamation.y = this.cop.y - this.state.gridY * 2;
            }
            if (this.exclamation != null && this.exclamation.visible) {
                this.exclamationTime -= this.game.time.elapsed;
                this.light.tint = 0xff0000;
                this.cop.body.setZeroForce();
                this.cop.body.setZeroVelocity();
                if (this.exclamationTime <= 0) {
                    this.exclamation.visible = false;
                    this.light.tint = 0xffffff;
                }
                return;
            }
            else {
                var delta = (this.game.time.elapsed / 500);
                if (delta > 1)
                    delta = 1;
                this.light.rotation += (this.lightRotation - this.light.rotation) * delta;
                if (this.light.body != null) {
                    this.light.body.rotation = this.light.rotation; //Math.atan2(y, x);
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
            this.light.body.x = this.cop.x + this.lightX;
            this.light.body.y = this.cop.y + this.lightY;
        };
        Cop.prototype.updateAI = function () {
            switch (this.currentState) {
                case 0:
                    this.timeLeft = (Cop.MaxWaitTime - Cop.MinWaitTime) * Math.random() + Cop.MinWaitTime;
                    this.currentState = 1;
                    //this.updateLightRelativePosition();
                    this.pointLightToNextWaypoint();
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
        };
        Cop.prototype.updateLightRelativePosition = function () {
            var x = (this.targetX - this.cop.x);
            var y = (this.targetY - this.cop.y);
            var sqrLength = Math.sqrt(x * x + y * y);
            this.lightRotation = Math.atan2(y, x);
            this.lightX = (x / sqrLength); // * this.state.gridX /2;
            this.lightY = (y / sqrLength); // * this.state.gridY /2;
        };
        Cop.prototype.pointLightToNextWaypoint = function () {
            var nextNode = (this.currentNode + 1) % this.navPoints.length;
            var targetX = this.navPoints[nextNode].x;
            var targetY = this.navPoints[nextNode].y;
            var x = (targetX - this.cop.x);
            var y = (targetY - this.cop.y);
            var sqrLength = Math.sqrt(x * x + y * y);
            this.lightRotation = Math.atan2(y, x);
            this.lightX = (x / sqrLength);
            this.lightY = (y / sqrLength);
        };
        Cop.prototype.waitStateUpdate = function () {
            this.timeLeft -= this.game.time.elapsed;
            this.cop.body.setZeroVelocity();
            if (this.timeLeft <= 0) {
                this.updateAI();
            }
        };
        Cop.prototype.movingStateUpdate = function () {
            if (Math.abs(this.cop.x - this.targetX) < 5 && Math.abs(this.cop.y - this.targetY) < 5) {
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
                else if (ySpeed >= 0) {
                    this.cop.animations.play("up", 10, true);
                }
                else {
                    this.cop.animations.play("down", 10, true);
                }
            }
        };
        Cop.Max_speed = 150;
        Cop.MaxWaitTime = 2500;
        Cop.MinWaitTime = 1000;
        return Cop;
    })();
    GameFromScratch.Cop = Cop;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Cop.js.map