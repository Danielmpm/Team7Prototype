﻿module Game {

    export class Project2 {
        game: Phaser.Game;

        public static obstaclesIds: string[];

        constructor() {
            this.game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update:this.update
            });
        }

        preload() {
            Project2.obstaclesIds = ["boxs_1", "boxs_2", "connex_blu1", "connex_blu2", "connex_red1", "connex_red2", "connex_yel1", "connex_yel2", "exit_1", "exit_2", "p1_start", "p2_start", "rp_guard_house"];

            this.game.load.image("background", "Graphics/rp_005_background.png");
            this.game.load.image("backgroundBorder", "Graphics/rp_border.png");
            this.game.load.image("briefcase", "Graphics/briefcase.png");
            this.game.load.image("briefcaseGlow", "Graphics/rp_005_briefcase_glow.png");
            this.game.load.image("flashlight", "Graphics/rp_005_flashlight2.png");
            this.game.load.image("titleImage", "Graphics/UI/TitleImage.png");
            this.game.load.image("exclamation", "Graphics/exclamation.png");
            this.game.load.image("p1Win", "Graphics/UI/p1_win.png");
            this.game.load.image("p2Win", "Graphics/UI/p2_win.png");

            this.game.load.atlasXML("cop", "Graphics/rp_pixel_cop_1.png", "Graphics/rp_pixel_cop_1.xml");
            this.game.load.atlasXML("cop2", "Graphics/rp_pixel_cop_2.png", "Graphics/rp_pixel_cop_2.xml");
            this.game.load.atlasXML("spy1", "Graphics/spy1.png", "Graphics/spy1.xml");
            this.game.load.atlasXML("spy2", "Graphics/spy2.png", "Graphics/spy2.xml");
        
         //   

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
        }
        

        create() {


           
            this.game.state.add("Preloader", GameFromScratch.Preloader, false);
       
            this.game.state.add("LevelSelect", GameFromScratch.LevelSelectMenu, false);
   
            this.game.state.add("StartMenu", GameFromScratch.StartMenu, false);

            this.game.state.add("BackgroundState", GameFromScratch.GamePlayState, false);

            this.game.state.add("Boot",  GameFromScratch.Boot, true);
        

          //  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
        }

        update() {

        }
          

        } 
    }


window.onload = () => {
    var game = new Game.Project2();
};