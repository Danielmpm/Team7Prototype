module GameFromScratch {

    export class Exit {

        game: Phaser.Game;
        exit: Phaser.Sprite;
        state: GamePlayState;

        isActive: boolean;

        PosX: number;
        PosY: number;

        briefcase: Briefcase;


        constructor(game: Phaser.Game, posX: number, posY: number, briefcase: Briefcase) {
            this.game = game;
            this.state = <GamePlayState> this.game.state.getCurrentState();
            this.PosX = posX;
            this.PosY = posY;
            this.isActive = false;

            this.exit = game.add.sprite(this.PosX, this.PosY, "briefcase");
            this.exit.width = this.state.gridX * 0.5;
            this.exit.height = this.state.gridX * 0.5;

            this.briefcase = briefcase;

            game.physics.p2.enable(this.briefcase);
            this.exit.body.setCircle(this.state.gridX/2);
            this.exit.angle = 0;
            this.exit.body.fixedRotation = true;
            this.exit.body.setCollisionGroup(this.state.playerCollisionGroup);
            this.exit.body.collides([this.state.copsCollisionGroup]);
            this.exit.body.createBodyCallback(briefcase.briefcase, this.briefcaseReachedExit, this);

            this.exit.body.motionState = Phaser.Physics.P2.Body.DYNAMIC;
        
        }

        briefcaseReachedExit()
        {
            if (this.briefcase.currentOwner.name == "Player1") {

                console.log("Player 1 finished");
            }
            else {
                console.log("Player 2 finished");
            }

           

        }




    }



}