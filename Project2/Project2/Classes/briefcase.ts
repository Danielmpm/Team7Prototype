module GameFromScratch {

    export class Briefcase {

        game: Phaser.Game;
        briefcase: Phaser.Sprite;
        isActive: boolean;
        PosX: number;
        PosY: number;



        constructor(game: Phaser.Game, posX: number, posY: number) {
            this.game = game;
            this.PosX = posX;
            this.PosY = posY;
            this.isActive = false;



            this.briefcase = game.add.sprite(this.PosX, this.PosY, "briefcase");
            game.physics.p2.enable(this.briefcase, true);
            this.briefcase.scale.setTo(2, 2);
            this.briefcase.body.setRectangle(30, 30);
            this.briefcase.angle = 0;
            this.briefcase.body.fixedRotation = true;

        
        }

        update() {
            

        }

   




    }



}