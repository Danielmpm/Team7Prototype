module Game {

    export class Project2 {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update:this.update
            });
        }

        preload() {
           this.game.load.image("background", "Graphics/background_temp.jpg");
           this.game.load.image("h1", "Graphics/h1.jpg");
            this.game.load.image("cop", "Graphics/cop.jpg");
            this.game.load.xml("levelSource", "Levels/levelTest3.xml");
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