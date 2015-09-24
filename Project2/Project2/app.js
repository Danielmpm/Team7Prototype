var Game;
(function (Game) {
    var Project2 = (function () {
        function Project2() {
            this.game = new Phaser.Game(720, 540, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update: this.update
            });
        }
        Project2.prototype.preload = function () {
            this.game.load.image("background", "Graphics/background.png");
            this.game.load.image("h1", "Graphics/h1.jpg");
        };
        Project2.prototype.create = function () {
            this.game.state.add("BackgroundState", GameFromScratch.GamePlayState, true);
            this.game.state.add("H2", GameFromScratch.GamePlayState, true);
            //  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        Project2.prototype.update = function () {
        };
        return Project2;
    })();
    Game.Project2 = Project2;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.Project2();
};
//# sourceMappingURL=app.js.map