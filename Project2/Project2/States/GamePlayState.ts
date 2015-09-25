module GameFromScratch {
    export class GamePlayState extends Phaser.State {
        game: Phaser.Game;
        backgroundImg: Phaser.Sprite;
        backgroundMusic: Phaser.Sound;

        Player1: GameFromScratch.Player;
        pozX: number;
        pozY: number;

        cop: GameFromScratch.Cop;


        constructor() {
            super();

            this.pozX = 220;
            this.pozY = 200;
        }

        preload() {
            this.game.load.audio("backgroundMusic","Audios/test.mp3");
            this.game.load.image("cop", "Graphics/cop.jpg");
        }

        create() {
          //  this.game.load.image("h1", "Graphics/h1.jpg");

            this.backgroundImg = this.add.sprite(0, 0, "background");
            this.backgroundImg.scale.setTo(
                this.game.width / this.backgroundImg.width,
                this.game.height / this.backgroundImg.height);

            
           
            this.Player1 = new Player(this.game,this.pozX,this.pozY,"Player1");
          //  this.game.add.existing(this.Player1); 
            this.cop = new Cop(this.game, 500, 400);

            this.backgroundMusic = this.game.add.audio("backgroundMusic");
           // this.backgroundMusic.volume = 100;
            this.backgroundMusic.loop = true;
            this.backgroundMusic.play();
        }

        update() {
            this.Player1.update();
  
        }
       

    }
}