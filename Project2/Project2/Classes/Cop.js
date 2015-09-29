var GameFromScratch;
(function (GameFromScratch) {
    var Cop = (function () {
        function Cop(game, posX, posY) {
            this.timeLeft = 0;
            this.targetX = 0;
            this.targetY = 0;
            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
            //  this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.cop = game.add.sprite(posX, posY, "cop");
            game.physics.p2.enable(this.cop, true);
        }
        Cop.prototype.update = function () {
            this.targetX = this.game.input.mousePointer.x;
            this.targetY = this.game.input.mousePointer.y;
            //  console.log("Testatas");
            this.movingStateUpdate();
        };
        Cop.prototype.updateAI = function () {
            switch (this.currentState) {
                case 0:
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
            var xSpeed = (this.targetX - this.cop.x) >= Cop.Max_speed ? Cop.Max_speed : (this.targetX - this.cop.x);
            xSpeed = xSpeed <= -Cop.Max_speed ? -Cop.Max_speed : xSpeed;
            console.log("x: " + xSpeed);
            var ySpeed = (this.targetY - this.cop.y) >= Cop.Max_speed ? Cop.Max_speed : (this.targetY - this.cop.y);
            ySpeed = ySpeed <= -Cop.Max_speed ? -Cop.Max_speed : ySpeed;
            console.log("y: " + ySpeed);
            this.cop.body.moveRight(xSpeed);
            this.cop.body.moveDown(ySpeed);
        };
        Cop.Max_speed = 100;
        Cop.MaxWaitTime = 3000;
        Cop.MinWaitTime = 1000;
        return Cop;
    })();
    GameFromScratch.Cop = Cop;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Cop.js.map