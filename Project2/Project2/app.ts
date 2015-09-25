module Game {

    export class Project2 {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(720, 540, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update:this.update
            });
        }

        preload() {
           this.game.load.image("background", "Graphics/background.png");
           this.game.load.image("h1", "Graphics/h1.jpg");
           this.game.load.image("cop", "Graphics/cop.jpg");
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