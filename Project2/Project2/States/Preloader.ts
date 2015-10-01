module GameFromScratch {
    export class Preloader extends Phaser.State {
        game: Phaser.Game;

        titleText;
        ready: boolean;

        constructor() {
            super();
            this.titleText = null;
            this.ready = false;


        }

        preload() {
            this.titleText = this.add.image(this.world.centerX, this.world.centerY, "titleimage");
            this.titleText.anchor.setTo(0.5, 0.5);
            this.load.image("titleimage", "Graphics/UI/TitleBG.png");
        }

        create() {


        }

        update() {
            this.ready = true;
            this.game.state.start("StartMenu");

        }

    }
}