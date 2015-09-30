var GameFromScratch;
(function (GameFromScratch) {
    var Cop = (function () {
        function Cop(game, nPoints) {
            this.game = game;
            this.navPoints = nPoints;

            this.targetX = 0;
            this.targetY = 0;
            this.currentNode = 0;
            this.currentState = 0;

            this.timeLeft = (Cop.MaxWaitTime - Cop.MinWaitTime) * Math.random() + Cop.MinWaitTime;

            //  this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.cop = game.add.sprite(this.navPoints[0].x, this.navPoints[0].y, "cop");
            this.cop.width = 60;
            this.cop.height = 60;

            game.physics.p2.enable(this.cop, true);

            this.cop.body.fixedRotation = true;

            this.updateAI();
        }
        Cop.prototype.update = function () {
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
            //this.targetX = this.game.input.mousePointer.x;
            //this.targetY = this.game.input.mousePointer.y;
        };

        Cop.prototype.updateAI = function () {
            switch (this.currentState) {
                case 0:
                    this.currentNode = (this.currentNode + 1) % this.navPoints.length;
                    this.targetX = this.navPoints[this.currentNode].x;
                    this.targetY = this.navPoints[this.currentNode].y;
                    this.currentState = 1;
                    break;
                case 1:
                    this.timeLeft = (Cop.MaxWaitTime - Cop.MinWaitTime) * Math.random() + Cop.MinWaitTime;
                    this.currentState = 0;
                    break;
                default:
                    break;
            }
        };

        Cop.prototype.waitStateUpdate = function () {
            this.timeLeft -= this.game.time.elapsed;
            if (this.timeLeft <= 0) {
                this.updateAI();
            }
        };

        Cop.prototype.movingStateUpdate = function () {
            if (Math.abs(this.cop.x - this.targetX) < 5 && Math.abs(this.cop.x - this.targetX) < 5) {
                this.updateAI();
            } else {
                var xSpeed = (this.targetX - this.cop.x) >= Cop.Max_speed ? Cop.Max_speed : (this.targetX - this.cop.x);
                xSpeed = xSpeed <= -Cop.Max_speed ? -Cop.Max_speed : xSpeed;
                var ySpeed = (this.targetY - this.cop.y) >= Cop.Max_speed ? Cop.Max_speed : (this.targetY - this.cop.y);
                ySpeed = ySpeed <= -Cop.Max_speed ? -Cop.Max_speed : ySpeed;

                this.cop.body.moveRight(xSpeed);
                this.cop.body.moveDown(ySpeed);
            }
        };
        Cop.Max_speed = 150;

        Cop.MaxWaitTime = 3000;
        Cop.MinWaitTime = 1000;
        return Cop;
    })();
    GameFromScratch.Cop = Cop;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Cop.js.map
