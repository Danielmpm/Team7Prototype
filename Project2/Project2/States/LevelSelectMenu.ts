module GameFromScratch {
    export class LevelSelectMenu extends Phaser.State
    {
        game: Phaser.Game;

        // titleText;
      //  ready: boolean;
        btnsY: number = 400;

        constructor() {
            super();

        }

        preload() {

        }

        create() {
            this.game.add.sprite(0, 0, "background");
            this.game.add.button(600, this.btnsY, "rp_guard_house", this.onClickLevel1, this);
            this.game.add.button(900, this.btnsY, "rp_guard_house", this.onClickLevel2, this);
            this.game.add.button(1200, this.btnsY, "rp_guard_house", this.onClickLevel3, this);
        }

        update() {


        }

        onClickLevel1() {
            GameFromScratch.GamePlayState.levelFile = "Levels/Lobby_A2.xml"
            this.game.state.start("BackgroundState");
        }

        onClickLevel2() {
            GameFromScratch.GamePlayState.levelFile = "Levels/jeff_lv_22.xml"
            this.game.state.start("BackgroundState");

        }

        onClickLevel3() {

           GameFromScratch.GamePlayState.levelFile = "Levels/LobbyHARD.xml"
  
            this.game.state.start("BackgroundState");
        }

    }
}