var GameFromScratch;
(function (GameFromScratch) {
    var Briefcase = (function () {
        function Briefcase(game, posX, posY, player1, player2) {
            this.game = game;
            this.state = this.game.state.getCurrentState();
            this.PosX = posX;
            this.PosY = posY;
            this.player1 = player1;
            this.player2 = player2;
            this.briefcase = game.add.sprite(this.PosX, this.PosY, "briefcase");
            this.briefcase.width = this.state.gridX * 0.5;
            this.briefcase.height = this.state.gridX * 0.5;
            game.physics.p2.enable(this.briefcase);
            this.briefcase.body.setCircle(this.state.gridX / 2);
            this.briefcase.angle = 0;
            this.briefcase.body.fixedRotation = true;
            this.briefcase.body.setCollisionGroup(this.state.copsCollisionGroup);
            this.briefcase.body.collides([this.state.playerCollisionGroup, this.state.exitsCollisionGroup]);
            this.briefcase.body.createBodyCallback(player1.player, this.pickedUpByPlayer1, this);
            this.briefcase.body.createBodyCallback(player2.player, this.pickedUpByPlayer2, this);
            for (var i = 0; i < this.state.exits.length; i++) {
                this.briefcase.body.createBodyCallback(this.state.exits[i], this.reachedExit, this);
            }
        }
        Briefcase.prototype.pickedUpByPlayer1 = function () {
            if (this.currentOwner != null)
                this.currentOwner.briefcase = null;
            this.currentOwner = this.player1;
            this.currentOwner.pickUpBriefcase(this);
        };
        Briefcase.prototype.pickedUpByPlayer2 = function () {
            if (this.currentOwner != null)
                this.currentOwner.briefcase = null;
            this.currentOwner = this.player2;
            this.currentOwner.pickUpBriefcase(this);
        };
        Briefcase.prototype.reachedExit = function () {
            //  this.currentOwner = this.player2;
            this.game.state.start("StartMenu");
        };
        Briefcase.prototype.drop = function () {
            if (this.currentOwner != null) {
                this.briefcase.body.x = this.currentOwner.player.x;
                this.briefcase.body.y = this.currentOwner.player.y;
            }
            this.currentOwner = null;
            this.briefcase.body.setZeroVelocity();
        };
        Briefcase.prototype.update = function () {
            if (this.currentOwner != null) {
                this.briefcase.body.x = this.currentOwner.player.x;
                this.briefcase.body.y = this.currentOwner.player.y - this.state.gridY;
            }
        };
        return Briefcase;
    })();
    GameFromScratch.Briefcase = Briefcase;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Briefcase.js.map