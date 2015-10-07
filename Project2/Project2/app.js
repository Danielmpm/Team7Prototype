var Game;
(function (Game) {
    var Project2 = (function () {
        function Project2() {
            this.game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update: this.update
            });
        }
        Project2.prototype.preload = function () {
            Project2.obstaclesIds = ["boxs_1", "boxs_2", "connex_blu1", "connex_blu2", "connex_red1", "connex_red2", "connex_yel1", "connex_yel2", "exit_1", "exit_2", "p1_start", "p2_start", "rp_guard_house"];
            this.game.load.image("background", "Graphics/rp_005_background.png");
            this.game.load.image("backgroundBorder", "Graphics/rp_border.png");
            this.game.load.image("h1", "Graphics/h1.jpg");
            //this.game.load.image("cop", "Graphics/cop.jpg");
            this.game.load.image("briefcase", "Graphics/briefcase.png");
            this.game.load.image("briefcaseGlow", "Graphics/rp_005_briefcase_glow.png");
            this.game.load.image("flashlight", "Graphics/rp_005_flashlight2.png");
            this.game.load.image("titleImage", "Graphics/UI/TitleImage.png");
            this.game.load.image("titleScreen", "Graphics/UI/home_screen.png");
            this.game.load.image("frontSprite", "Graphics/UI/home_screen_1.png");
            this.game.load.image("doors", "Graphics/UI/home_screen_2.png");
            this.game.load.image(Project2.obstaclesIds[0], "Graphics/Objects/rp_005_boxs_1.png");
            this.game.load.image(Project2.obstaclesIds[1], "Graphics/Objects/rp_005_boxs_2.png");
            this.game.load.image(Project2.obstaclesIds[2], "Graphics/Objects/rp_005_connex_blu1.png");
            this.game.load.image(Project2.obstaclesIds[3], "Graphics/Objects/rp_005_connex_blu2.png");
            this.game.load.image(Project2.obstaclesIds[4], "Graphics/Objects/rp_005_connex_red1.png");
            this.game.load.image(Project2.obstaclesIds[5], "Graphics/Objects/rp_005_connex_red2.png");
            this.game.load.image(Project2.obstaclesIds[6], "Graphics/Objects/rp_005_connex_yel1.png");
            this.game.load.image(Project2.obstaclesIds[7], "Graphics/Objects/rp_005_connex_yel2.png");
            this.game.load.image(Project2.obstaclesIds[8], "Graphics/Objects/exit_1.png");
            this.game.load.image(Project2.obstaclesIds[9], "Graphics/Objects/exit_2.png");
            this.game.load.image(Project2.obstaclesIds[10], "Graphics/Objects/p1_start.png");
            this.game.load.image(Project2.obstaclesIds[11], "Graphics/Objects/p2_start.png");
            this.game.load.image(Project2.obstaclesIds[12], "Graphics/Objects/rp_guard_house.png");
        };
        Project2.prototype.create = function () {
            this.game.state.add("Boot", GameFromScratch.Boot, true);
            //  this.game.state.add("StartMenu",  GameFromScratch.StartMenu, true);
            this.game.state.add("Preloader", GameFromScratch.Preloader, false);
            //   this.game.state.add("BackgroundState", GameFromScratch.GamePlayState, true);
            // this.game.state.add("Boot",  GameFromScratch.Boot, false);
            this.game.state.add("StartMenu", GameFromScratch.StartMenu, false);
            //  this.game.state.add("Preloader", GameFromScratch.Preloader, false);
            this.game.state.add("BackgroundState", GameFromScratch.GamePlayState, false);
            //  this.game.state.start("Boot");
            //  this.game.state.add("H2", GameFromScratch.GamePlayState, true);
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