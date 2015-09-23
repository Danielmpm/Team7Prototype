module Game {

    export class Project2 {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(720, 540, Phaser.AUTO, 'content', {
                create: this.create, load: this.load
            });
        }

        load() {

        }


        create() {

        }


        } 
    }


window.onload = () => {
    var game = new Game.Project2();
};