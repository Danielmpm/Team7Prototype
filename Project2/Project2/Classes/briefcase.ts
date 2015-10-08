module GameFromScratch {

    export class Briefcase {

        game: Phaser.Game;
        briefcase: Phaser.Sprite;
        state: GamePlayState;
        glow: Phaser.Sprite;

        PosX: number;
        PosY: number;

        player1: Player;
        player2: Player;

        currentOwner: Player;

        successAudio: Phaser.Sound;

        gameEnded: boolean;
 
       constructor(game: Phaser.Game, posX: number, posY: number, player1: Player, player2: Player) {
            this.game = game;
            this.state = <GamePlayState> this.game.state.getCurrentState();
            this.PosX = posX;
            this.PosY = posY;

            this.player1 = player1;
            this.player2 = player2;

            this.briefcase = game.add.sprite(this.PosX, this.PosY, "briefcase");
            this.briefcase.width = this.state.gridX * 0.5;
            this.briefcase.height = this.state.gridX * 0.5;

            this.glow = game.add.sprite(this.PosX, this.PosX, "briefcaseGlow");
            this.glow.pivot.x = this.state.gridX * 0.3 * 0.5;
           this.glow.pivot.y = this.state.gridY * 0.33 * 0.5;
            this.glow.width = this.state.gridX *0.6;
            this.glow.height = this.state.gridX *0.6;

            game.physics.p2.enable(this.briefcase);
            this.briefcase.body.setCircle(this.state.gridX/2);
            this.briefcase.angle = 0;
            this.briefcase.body.fixedRotation = true;
            this.briefcase.body.setCollisionGroup(this.state.copsCollisionGroup);
            this.briefcase.body.collides([this.state.playerCollisionGroup, this.state.exitsCollisionGroup]);
            this.briefcase.body.createBodyCallback(player1.player, this.pickedUpByPlayer1, this);
            this.briefcase.body.createBodyCallback(player2.player, this.pickedUpByPlayer2, this);
           
            for (var i = 0; i < this.state.exits.length; i++) {
                this.briefcase.body.createBodyCallback(this.state.exits[i], this.reachedExit, this);
            }

            this.successAudio = this.game.add.audio("success");
            this.successAudio.loop = false;
            this.successAudio.allowMultiple = true;
           this.gameEnded = false;
           
        }

        pickedUpByPlayer1()
        {
            this.briefcase.visible = false;
            this.glow.visible = false;
            if (this.currentOwner != null)
                this.currentOwner.briefcase = null;
            this.currentOwner = this.player1;
            this.currentOwner.pickUpBriefcase(this);

       }
        pickedUpByPlayer2()
        {
            this.briefcase.visible = false;
            this.glow.visible = false;
            if (this.currentOwner != null)
                this.currentOwner.briefcase = null;
            this.currentOwner = this.player2;
            this.currentOwner.pickUpBriefcase(this);
        }

        reachedExit() {
            //  this.currentOwner = this.player2;
            if(!this.successAudio.isPlaying)
            this.successAudio.play();
            this.currentOwner.player.body.x = - 1000;
            this.currentOwner.player.body.y = - 1000;
            this.gameEnded = true;

            if (this.currentOwner.name == "Player1") {
                var spr = this.game.add.sprite(960, 540, "p1Win");
                spr.x -= spr.width*0.5;
                spr.y -= spr.height * 0.5;
                this.game.add.sprite(spr.x + spr.width + 20, spr.y + 20, "spy1");
            }
            else {
                var spr = this.game.add.sprite(960, 540, "p2Win");
                spr.x -= spr.width * 0.5;
                spr.y -= spr.height * 0.5;
                this.game.add.sprite(spr.x + spr.width, spr.y , "spy2");
            }
        }

        drop()
        {
            this.briefcase.visible = true;
            this.glow.visible = true;
            if (this.currentOwner != null) {
                this.briefcase.body.x = this.currentOwner.player.x;
                this.briefcase.body.y = this.currentOwner.player.y;

              
            }
            this.currentOwner = null;

            this.briefcase.body.setZeroVelocity();
        }

        update()
        {
            if (this.gameEnded && this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                this.game.state.start("StartMenu");
            }

            this.glow.x = this.briefcase.body.x;
            this.glow.y = this.briefcase.body.y;

            if (this.currentOwner != null)
            {
             
                this.briefcase.body.x = this.currentOwner.player.x;
                this.briefcase.body.y = this.currentOwner.player.y;// - this.state.gridY;
            }
        }


    }



}