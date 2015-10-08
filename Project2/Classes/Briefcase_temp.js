var GameFromScratch;
(function (GameFromScratch) {
    var Brifecase = (function () {
        function Brifecase(game, posX, posY) {
            this.game = game;
            this.PosX = posX;
            this.PosY = posY;
            this.isActive = false;
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.brifecase = game.add.sprite(this.PosX, this.PosY, "brifecase");
            game.physics.p2.enable(this.brifecase, true);
            this.brifecase.scale.setTo(0.4, 0.2);
            this.brifecase.body.setRectangle(40, 40);
            this.brifecase.angle = 0;
            this.brifecase.body.fixedRotation = true;
        }
        Brifecase.prototype.update = function () {
        };
        return Brifecase;
    })();
    GameFromScratch.Brifecase = Brifecase;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=brifecase.js.map