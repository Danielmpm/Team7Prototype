var Game;
(function (Game) {
    var Project2 = (function () {
        function Project2() {
            this.game = new Phaser.Game(720, 540, Phaser.AUTO, 'content', {
                create: this.create, load: this.load
            });
        }
        Project2.prototype.load = function () {
        };
        Project2.prototype.create = function () {
        };
        return Project2;
    })();
    Game.Project2 = Project2;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.Project2();
};
//# sourceMappingURL=app.js.map