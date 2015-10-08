module GameFromScratch {
    export class StartMenu extends Phaser.State {
        game: Phaser.Game;

        startBG;
        frontSprite: Phaser.Sprite;
        frontBlocks: Phaser.Sprite;

        count: number;
        isVisible: boolean;

        blocklX: number = 325;
        blockrX: number = 1550;
        blocksY: number = 650;

        speed: number = 2.5;

        spy: Phaser.Sprite;
        briefcase: Phaser.Sprite;
        cops: Phaser.Sprite[];
        light: Phaser.Sprite;

        currentEvent: number;

        mainTimer: number;



        constructor() {
            super();

        }

        preload()
        {

            this.game.load.image("titleScreen", "Graphics/UI/rp_005_home_screen_3.png");
            this.game.load.image("frontSprite", "Graphics/UI/home_screen_1.png");
            this.game.load.image("frontBlocks", "Graphics/UI/home_screen_2.png");
        }

        create() {
            this.startBG = this.game.add.sprite(0, 0, "titleScreen");
            this.startBG.width = 1920;
            this.startBG.height = 1080;
            this.frontSprite = this.game.add.sprite(0, 0, "frontSprite", 0);

            this.createSpySprite(true, 1210, 335).animations.play("leftidle", 3, true);

            this.spy = this.createSpySprite(false, this.blockrX, this.blocksY);
            this.spy.animations.play("leftidle", 3, true);
            this.briefcase = this.game.add.sprite(960, this.blocksY + 25, "briefcase");
            this.briefcase.width = 35;
            this.briefcase.height = 35;
            this.cops = [];
            for (var i = 0; i < 4; i++) {
                this.cops.push( this.createGuardSprite(i % 2 == 0, this.blockrX, this.blocksY));
            }
            this.light = this.game.add.sprite(0, 0, "flashlight");
            this.light.width = 70 * 2;
            this.light.height = 70;
            this.light.pivot.x = 70 * -1.7;

            this.count = 0;
            this.isVisible = true;
            this.currentEvent = -1;
            this.nextEvent();

            this.frontBlocks = this.game.add.sprite(0, 0, "frontBlocks", 0);
       //     this.frontBlocks.tint = 0xff00ff;
        }

        createSpySprite(dark:boolean, posX:number, posY:number ): Phaser.Sprite
        {
            var sprite:Phaser.Sprite;
            if (dark)
                sprite = this.game.add.sprite(posX, posY, "spy2", 0);
            else
                sprite = this.game.add.sprite(posX, posY, "spy1", 0);

            sprite.width = 70;
            sprite.height = 70;
            sprite.angle = 0;

            sprite.animations.add("leftwithcase", [0, 1, 2, 3]);
            sprite.animations.add("upwithcase", [4, 5, 6, 7]);
            sprite.animations.add("rightwithcase", [8, 9, 10, 11]);
            sprite.animations.add("downwithcase", [12, 13, 14, 15]);

            sprite.animations.add("leftidlewithcase", [16, 17, 16, 17, 16, 17, 16, 17, 18, 19, 18, 19]);
            sprite.animations.add("upidlewithcase", [20, 21]);
            sprite.animations.add("rightidlewithcase", [22, 23, 22, 23, 22, 23, 22, 23, 24, 25, 24, 25]);
            sprite.animations.add("downidlewithcase", [26, 27]);

            sprite.animations.add("left", [28, 29, 30, 31]);
            sprite.animations.add("up", [32, 33, 34, 35]);
            sprite.animations.add("right", [36, 37, 38, 39]);
            sprite.animations.add("down", [40, 41, 42, 43]);

            sprite.animations.add("leftidle", [44, 45, 44, 45, 44, 45, 44, 45, 44, 46, 47, 46, 47]);
            sprite.animations.add("upidle", [48, 49]);
            sprite.animations.add("rightidle", [50, 51, 50, 51, 50, 51, 50, 51, 52, 53, 52, 53]);
            sprite.animations.add("downidle", [54, 55]);
            return sprite;
        }

        createGuardSprite(dark: boolean, posX: number, posY: number): Phaser.Sprite {
            var sprite: Phaser.Sprite;
            if (dark)
                sprite = this.game.add.sprite(posX, posY, "cop");
            else
                sprite = this.game.add.sprite(posX, posY, "cop2");
            sprite.width = 70;
            sprite.height = 70;


            sprite.animations.add("left", [0, 1]);
            sprite.animations.add("down", [2, 3, 4, 5]);
            sprite.animations.add("right", [6, 7]);
            sprite.animations.add("up", [8, 9, 10, 11]);

            return sprite;
        }

        update()
        {
            if (this.game.input.activePointer.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                this.startGame( );
            }
            this.updateInsertCoin();
            this.updateMainAnimation();

        }

        nextEvent()
        {
            this.currentEvent++;
            this.mainTimer = 0;
            switch (this.currentEvent) {
                case 0:
                    this.spy.x = this.blockrX;
                    this.spy.y = this.blocksY;
                    for (var i = 0; i < this.cops.length; i++) {
                        this.cops[i].x = this.blockrX;
                        this.cops[i].y = this.blocksY;
                    }
                    this.light.visible = false;
                    this.spy.animations.play("leftidle", 3, true);
                    this.briefcase.visible = true;
                    break;
                case 1:
                    this.spy.animations.play("left", 6, true);
                    break;
                case 2:
                    this.spy.animations.play("leftidle", 3, true);
                    this.spy.animations.currentAnim.frame = 6;
                    break;
                case 3:
                    this.spy.animations.play("left", 6, true);
                    break;
                case 4:
                    this.spy.animations.play("leftidlewithcase", 3, true)
                    this.briefcase.visible = false;
                    break;
                case 5:
                    this.spy.animations.play("rightwithcase", 6, true);
                    break;
                case 6:
                    break;
                case 7:
                    this.spy.animations.play("leftwithcase", 9, true);
                    break;
                case 8:
                    this.spy.animations.play("leftwithcase", 9, true);
                    for (var i = 0; i < this.cops.length; i++) {
                        this.cops[i].animations.play("left", 9, true);
                    }
                    this.light.x = this.blockrX + 120;
                    this.light.y = this.blocksY+ 12;
                    this.light.scale.x = -1;
                    this.light.visible = true;
                    break;
                case 9: 
                    this.light.visible = false;
                    break;
                case 10:
                    this.spy.animations.play("rightwithcase", 9, true);
                    break;
                case 11:
                    this.spy.animations.play("rightidlewithcase", 3, true)
                    this.spy.animations.currentAnim.frame = 6;
                    break;
                case 12:
                    this.spy.animations.play("rightwithcase", 9, true);
                    break;
                case 13:
                    break;
                case 14:
                    this.currentEvent = -1;
                    this.nextEvent();
                    break;
                default:
                    break;
            }
        }

        updateMainAnimation() {


            switch (this.currentEvent) {
                case 0:
                    this.mainTimer += this.game.time.elapsed;
                    if (this.mainTimer > 2000) {
                        this.nextEvent();
                    }
                    break;
                case 1:
                    this.spy.x -= this.speed;

                    if (Math.abs(this.blockrX - 300 - this.spy.x) < 5)
                        this.nextEvent();
                    break;
                case 2:
                    this.mainTimer += this.game.time.elapsed;
                   
                    if (this.mainTimer > 2000) {
                        this.nextEvent();
                    }
                    break;
                case 3:
                    this.spy.x -= this.speed;

                    if (Math.abs(this.briefcase.x - this.spy.x) < 5)
                        this.nextEvent();
                    break;
                case 4:
                    this.mainTimer += this.game.time.elapsed;
                    if (this.mainTimer > 3000) {
                        this.nextEvent();
                    }
                    break;
                case 5:
                    this.spy.x += this.speed;
                    if (Math.abs(this.blockrX - this.spy.x) < 5)
                        this.nextEvent();
                    break;
                case 6:
                    this.mainTimer += this.game.time.elapsed;
                    if (this.mainTimer > 500) {
                        this.nextEvent();
                    }
                    break;
                case 7:
                    this.spy.x -= this.speed * 1.5;

                    if (Math.abs(this.blockrX - 300 - this.spy.x) < 10)
                        this.nextEvent();
                    break;
                case 8:

                    if (Math.abs(this.blocklX - this.spy.x) >= 10)
                        this.spy.x -= this.speed * 1.5;

                    if (Math.abs(this.blocklX + 240 - this.light.x) >= 10)
                        this.light.x -= this.speed * 1.5;
                    else
                        this.light.visible = false;
                    for (var i = 0; i < this.cops.length; i++)
                    {
                        if (Math.abs(this.blocklX - this.cops[i].x) >= 10)
                        {
                            if (i == 0)
                                this.cops[i].x -= this.speed * 1.5;
                            else if (Math.abs(this.cops[i-1].x- this.cops[i].x) >= 80 ||  Math.abs(this.blocklX - this.cops[i-1].x) < 20){
                                this.cops[i].x -= this.speed * 1.5;
                            }
                        }
                    }

                    if (Math.abs(this.blocklX - this.cops[this.cops.length-1].x ) < 10)
                        this.nextEvent();
                    break;
                case 9:
                    this.mainTimer += this.game.time.elapsed;
                 
                    if (this.mainTimer > 2000) {
                        this.nextEvent();
                    }
                    break;
                case 10:
                    this.spy.x += this.speed * 1.5;
                    if (Math.abs(960 - this.spy.x) < 10)
                        this.nextEvent();
                    break;
                case 11:
                    this.mainTimer += this.game.time.elapsed;

                    if (this.mainTimer > 2000) {
                        this.nextEvent();
                    }
                    break;
                case 12:
                    this.spy.x += this.speed ;
                    if (Math.abs(this.blockrX - this.spy.x) < 10)
                        this.nextEvent();
                    break;
                case 13:
                    this.mainTimer += this.game.time.elapsed;

                    if (this.mainTimer > 2000) {
                        this.nextEvent();
                    }
                    break;
                default:
                    break;
            }
        }

        updateInsertCoin() {
            if (this.count%30==0 && this.isVisible) {
                this.isVisible = false;
                this.frontSprite.alpha = 0;
            }

            if (!this.isVisible && this.count == 0) {
                this.isVisible = true;
                this.frontSprite.alpha = 1;
            }

            if (this.isVisible) {
                this.count++;
            } else {
                this.count--;
            }

        }
        
        startGame( )
        {
            this.game.state.start("LevelSelect");
        }
    }
}