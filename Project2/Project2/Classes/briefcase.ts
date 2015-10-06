module GameFromScratch {

    export class Briefcase {

        game: Phaser.Game;
        briefcase: Phaser.Sprite;
        state: GamePlayState;

        isPickup: boolean;

        PosX: number;
        PosY: number;

        player1: Player;
        player2: Player;

        currentOwner: Player;


 
       constructor(game: Phaser.Game, posX: number, posY: number, player1: Player, player2: Player) {
            this.game = game;
            this.state = <GamePlayState> this.game.state.getCurrentState();
            this.PosX = posX;
            this.PosY = posY;
            this.isPickup = false;

            this.player1 = player1;
            this.player2 = player2;

            this.briefcase = game.add.sprite(this.PosX, this.PosY, "briefcase");
            this.briefcase.width = this.state.gridX * 0.5;
            this.briefcase.height = this.state.gridX * 0.5;

            game.physics.p2.enable(this.briefcase);
            this.briefcase.body.setCircle(this.state.gridX/2);
            this.briefcase.angle = 0;
            this.briefcase.body.fixedRotation = true;
            this.briefcase.body.setCollisionGroup(this.state.copsCollisionGroup);
            this.briefcase.body.collides([this.state.playerCollisionGroup]);
            this.briefcase.body.createBodyCallback(player1.player, this.pickedUpByPlayer1, this);
            this.briefcase.body.createBodyCallback(player2.player, this.pickedUpByPlayer2, this);

            this.briefcase.body.motionState = Phaser.Physics.P2.Body.DYNAMIC;
        
        }

        pickedUpByPlayer1()
        {
            this.isPickup = true;
            this.currentOwner = this.player1;
            this.currentOwner.pickUpBriefcase(this);
            this.briefcase.body.motionState = Phaser.Physics.P2.Body.KINEMATIC;

        }
        pickedUpByPlayer2() {
            this.isPickup = true;
            this.currentOwner = this.player2;
            this.currentOwner.pickUpBriefcase(this);
            this.briefcase.body.motionState = Phaser.Physics.P2.Body.KINEMATIC;

        }

        drop()
        {
            if (this.currentOwner != null) {
                this.briefcase.body.x = this.currentOwner.player.x;
                this.briefcase.body.y = this.currentOwner.player.y;
            }
            this.currentOwner = null;
            this.isPickup = false;

            this.briefcase.body.motionState = Phaser.Physics.P2.Body.DYNAMIC;
            this.briefcase.body.setZeroVelocity();
        }

        update()
        {
            if (this.currentOwner != null)
            {
             
                this.briefcase.body.x = this.currentOwner.player.x;
                this.briefcase.body.y = this.currentOwner.player.y - this.state.gridY;
            }
        }


    }



}