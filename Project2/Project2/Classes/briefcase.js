var GameFromScratch;
(function (GameFromScratch) {
    var Briefcase = (function () {
        function Briefcase(game, posX, posY) {
            this.game = game;
            this.PosX = posX;
            this.PosY = posY;
            this.isActive = false;
            this.briefcase = game.add.sprite(this.PosX, this.PosY, "briefcase");
            game.physics.p2.enable(this.briefcase, true);
            this.briefcase.scale.setTo(2, 2);
            this.briefcase.body.setRectangle(30, 30);
            this.briefcase.angle = 0;
            this.briefcase.body.fixedRotation = true;
        }
        Briefcase.prototype.update = function () {
        };
        return Briefcase;
    })();
    GameFromScratch.Briefcase = Briefcase;
})(GameFromScratch || (GameFromScratch = {}));
//# sourceMappingURL=Briefcase.js.map