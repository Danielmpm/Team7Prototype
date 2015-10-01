module Game {

    export class Project2 {
        game: Phaser.Game;

        public static obstaclesIds: string[];

        constructor() {
            this.game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update:this.update
            });
        }

        preload() {
            Project2.obstaclesIds = ["boxs_1", "boxs_2", "connex_blu1", "connex_blu2", "connex_red1", "connex_red2", "connex_yel1", "connex_yel2"];

            this.game.load.image("background", "Graphics/background_temp.jpg");
            this.game.load.image("h1", "Graphics/h1.jpg");
            this.game.load.image("cop", "Graphics/cop.jpg");
            this.game.load.image("flashlight", "Graphics/flashLight_test.png");


            this.game.load.xml("levelSource", "Levels/Gym0.xml");
            this.game.load.image(Project2.obstaclesIds[0], "Graphics/Objects/rp_005_boxs_1.png");
            this.game.load.image(Project2.obstaclesIds[1], "Graphics/Objects/rp_005_boxs_2.png");
            this.game.load.image(Project2.obstaclesIds[2], "Graphics/Objects/rp_005_connex_blu1.png");
            this.game.load.image(Project2.obstaclesIds[3], "Graphics/Objects/rp_005_connex_blu2.png");
            this.game.load.image(Project2.obstaclesIds[4], "Graphics/Objects/rp_005_connex_red1.png");
            this.game.load.image(Project2.obstaclesIds[5], "Graphics/Objects/rp_005_connex_red2.png");
            this.game.load.image(Project2.obstaclesIds[6], "Graphics/Objects/rp_005_connex_yel1.png");
            this.game.load.image(Project2.obstaclesIds[7], "Graphics/Objects/rp_005_connex_yel2.png");
        }
        

        create() {
            
            this.game.state.add("BackgroundState", GameFromScratch.GamePlayState, true);

            this.game.state.add("H2",GameFromScratch.GamePlayState, true);
          //  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
        }

        update() {

        }
          

        } 
    }


window.onload = () => {
    var game = new Game.Project2();
};