var GameFromScratch;
(function (GameFromScratch) {
    var Cop = (function () {
        function Cop(game, posX, posY) {
            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.cop = game.add.sprite(posX, posY, "cop");
        }
        Cop.prototype.update = function () {
        };
        Cop.Max_speed = 20;
        return Cop;
    })();
    GameFromScratch.Cop = Cop;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Cop.js.map