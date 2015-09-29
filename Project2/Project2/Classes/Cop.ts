module GameFromScratch {

    export class Cop {


        game: Phaser.Game;
        cop: Phaser.Sprite;


        speedX: number;
        speedY: number;
        name: string;

        public static Max_speed: number = 100;

        // AI
        currentState: number;
        timeLeft: number = 0;

        targetX: number = 0;
        targetY: number = 0;

        static MaxWaitTime: number = 3000;
        static MinWaitTime: number = 1000;



        constructor(game: Phaser.Game, posX: number, posY: number) {
            this.game = game;
            this.speedX = 5;
            this.speedY = 4;
     
      

          //  this.game.physics.startSystem(Phaser.Physics.P2JS);
     

            this.cop = game.add.sprite(posX, posY, "cop");
           

            game.physics.p2.enable(this.cop, true);

        }

        update()
        {
            this.targetX = this.game.input.mousePointer.x;
            this.targetY = this.game.input.mousePointer.y;
          //  console.log("Testatas");
            this.movingStateUpdate();
        }

        updateAI()
        {
            switch (this.currentState)
            {
                case 0:
                    
                    break;
                case 1:
                    this.timeLeft = (Cop.MaxWaitTime - Cop.MinWaitTime) * Math.random() + Cop.MinWaitTime;
                    this.currentState = 0;
                    break;
                default:
                    break;
            }
        }

        waitStateUpdate()
        {
            this.timeLeft -= this.game.time.elapsed;

            if (this.timeLeft <= 0)
            {
                this.updateAI();
            }
        }
        movingStateUpdate()
        {
            var xSpeed = (this.targetX - this.cop.x) >= Cop.Max_speed ? Cop.Max_speed : (this.targetX - this.cop.x);
            xSpeed = xSpeed <= -Cop.Max_speed ? -Cop.Max_speed : xSpeed;
            console.log("x: " + xSpeed);
            var ySpeed = (this.targetY - this.cop.y) >= Cop.Max_speed ? Cop.Max_speed : (this.targetY - this.cop.y);
            ySpeed = ySpeed <= -Cop.Max_speed ? -Cop.Max_speed : ySpeed;
            console.log("y: " + ySpeed);
            this.cop.body.moveRight(xSpeed);
            this.cop.body.moveDown(ySpeed);
        }
    }



} 