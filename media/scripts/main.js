class Explosion extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        this.play('explode');
    }
}

class MainMenuScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'MainMenuScene' });

        this.buttonNewGame;
        this.buttonHelp;
        this.buttonShop;
        this.buttonCredits;
        this.buttonExit;
        this.titleImage;
        this.titleMusic;
    }

    preload()
    {
        this.load.image('btnNewGame', 'media/sprites/button_new_game.png');
        this.load.image('btnHelp', 'media/sprites/button_help.png');
        this.load.image('btnShop', 'media/sprites/button_shop.png');
        this.load.image('btnCredits', 'media/sprites/button_credits.png');
        this.load.image('btnExit', 'media/sprites/button_exit.png');
        this.load.image('bgMenu', 'media/sprites/bg_menu.png');
        this.load.audio('bgMusic', 'media/audio/bg_music.mp3');
        this.load.image('cursor', 'media/sprites/cursor.png');
    }

    create()
    {
        this.input.setDefaultCursor('url(media/sprites/cursor.png), pointer');

        this.titleImage = this.add.image(0, 0, 'bgMenu');
        this.titleImage.setOrigin(0, 0);
        
        this.buttonNewGame = this.add.image(400, 60, 'btnNewGame');
        this.buttonHelp = this.add.image(400, 180, 'btnHelp');
        this.buttonShop = this.add.image(400, 300, 'btnShop');
        this.buttonCredits = this.add.image(400, 420, 'btnCredits');
        this.buttonExit = this.add.image(400, 540, 'btnExit');

        this.titleMusic = this.sound.add('bgMusic');
        var titleMusicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        this.titleMusic.play(titleMusicConfig);

        this.input.manager.enabled = true;
        this.input.once('pointerdown', function() {
            this.scene.start('MainGameScene');
        }, this);
    }
}

class MainGameScene extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'MainGameScene' });

        this.bg;
        this.ball;
        this.ballSpeedLeft = -160;
        this.ballSpeedRight = 160;
        this.ballMaxSpeedComponent;
        this.blockBrick;
        this.blockTree;
        this.ground;
        this.bomb;
        this.explosion;
        this.laser;
        this.clock;
        this.bonus;
        this.energy;
        this.violetSpark;
        this.violetSparkEmitter;
        this.scoreCounter = 0;
        this.scoreText;
        this.scoreIcon;
        this.score;
        this.timedEventEnergyOn;
        this.timedEventEnergyOff;
        this.bonusText;
        this.bonusAudio;
        this.boomAudio;
    }

    preload()
    {
        this.load.image('bg', 'media/sprites/bg.png');
        this.load.image('blockBrick', 'media/sprites/blocks_brick.png');
        this.load.image('blockTree', 'media/sprites/blocks_tree.png');
        this.load.image('ground', 'media/sprites/ground.png');
        this.load.spritesheet('ball', 'media/sprites/ball.png', { frameWidth: 37, frameHeight: 42 } );
        this.load.spritesheet('bomb', 'media/sprites/bomb_anim.png', { frameWidth: 50, frameHeight: 50 } );
        this.load.spritesheet('explosion', 'media/sprites/explosions_anim.png', { frameWidth: 63, frameHeight: 55 } );
        this.load.spritesheet('laser', 'media/sprites/laser_anim.png', { frameWidth: 160, frameHeight: 15 } );
        this.load.image('clock', 'media/sprites/clock.png');
        this.load.image('bonus', 'media/sprites/bonus.png');
        this.load.image('energy', 'media/sprites/energy.png');
        this.load.image('speedComponent', 'media/sprites/speed_component.png');
        this.load.image('violetSpark', 'media/sprites/violet_spark.png');
        this.load.image('score', 'media/sprites/score.png');
        this.load.image('scoreIcon', 'media/sprites/score_icon.png');
        this.load.audio('boomAudio', "media/audio/boom_audio.wav");
        this.load.audio('bonusAudio', 'media/audio/bonus_audio.mp3');
    }

    create()
    {

        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {

            this.scene.start('BonusSceneGame');

        }, this);

        this.cameras.main.setBounds(0, 0, 4000, 600);
        this.physics.world.setBounds(0, 0, 4000, 600);

        this.bg = this.add.tileSprite(0, 0, 4000, 600, 'bg');
        this.bg.setOrigin(0, 0);
        this.bg.setDepth(-1);

        this.blockBrick = this.physics.add.staticGroup();
        this.blockBrick.create(400, 500, 'blockBrick');
        this.blockBrick.create(1400, 398, 'blockBrick');
        this.blockBrick.create(1600, 500, 'blockBrick');
        this.blockBrick.create(1640, 460, 'blockBrick');
        this.blockBrick.create(1680, 420, 'blockBrick');
        this.blockBrick.create(3700, 380, 'blockBrick');
        this.blockBrick.create(3000, 390, 'blockBrick');
        this.blockBrick.create(2000, 550, 'blockBrick');
        this.blockBrick.create(2100, 450, 'blockBrick');
        this.blockBrick.create(1900, 500, 'blockBrick');

        this.ground = this.physics.add.staticGroup();
        this.ground.create(600, 600, 'ground');
        this.ground.create(1800, 600, 'ground');
        this.ground.create(3000, 600, 'ground');
        this.ground.create(4200, 600, 'ground');

        this.blockTree = this.physics.add.staticGroup();
        this.blockTree.create(550, 390, 'blockTree');
        this.blockTree.create(200, 300, 'blockTree');
        this.blockTree.create(400, 100, 'blockTree');
        this.blockTree.create(500, 300, 'blockTree');
        this.blockTree.create(2500, 500, 'blockTree');
        this.blockTree.create(2700, 300, 'blockTree');
        this.blockTree.create(3400, 400, 'blockTree');
        this.blockTree.create(3500, 300, 'blockTree');
        this.blockTree.create(3600, 200, 'blockTree');

        this.ball = this.physics.add.sprite(50, 350, 'ball');
        this.ball.setBounce(0.2);
        this.ball.setCollideWorldBounds(true);

        this.ballMaxSpeedComponent = this.physics.add.sprite(50, 360, 'speedComponent');
        this.physics.add.overlap(this.ballMaxSpeedComponent, this.ball, this.takeSpeedComponentOn, null, this);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('ball', { start: 4, end: 6 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'stop',
            frames: [ { key: 'ball', frame: 3 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('ball', { start: 2, end: 0 }),
            frameRate: 20,
            repeat: -1
        });

        this.physics.add.collider(this.ball, this.ground);
        this.physics.add.collider(this.ball, this.blockBrick);
        this.physics.add.collider(this.ball, this.blockTree);

        this.controls = {		
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            BonusScene: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
        };

        this.anims.create({
            key: 'bombFuse',
            frames: this.anims.generateFrameNumbers('bomb'),
            frameRate: 21,
            repeat: -1
        });
        this.bomb = this.physics.add.group({
            key: 'bomb',
            repeat: 10,
            setXY: { x: 32, y: 0, stepX: 400 }
        });
        this.bomb.children.iterate(function (child) {
            child.setBounceX(Phaser.Math.FloatBetween(1, 1));
            child.setBounceY(Phaser.Math.FloatBetween(1, 1));
            child.setVelocityX(50);
            child.setVelocityY(50);
            child.setCollideWorldBounds(true);
            child.play('bombFuse');
        });
        
        this.physics.add.collider(this.bomb, this.ground);
        this.physics.add.collider(this.bomb, this.blockBrick);
        this.physics.add.collider(this.bomb, this.blockTree);
        this.physics.add.collider(this.bomb, this.bomb);

        this.physics.add.overlap(this.ball, this.bomb, this.boom, null, this);
        this.physics.add.overlap(this.bomb, this.ball, this.boom, null, this);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 16,
            repeat: 0,
            hideOnComplete: true
        });

        this.bonus = this.physics.add.group({
            key: 'bonus',
            repeat: 0,
            setXY: { x: 1680, y: 370}
        });
        this.physics.add.collider(this.bonus, this.ground);
        this.physics.add.collider(this.bonus, this.blockBrick);
        this.physics.add.collider(this.bonus, this.blockTree);
        this.physics.add.overlap(this.bonus, this.ball, this.takeBonus, null, this);
        this.bonus.children.iterate(function (child) {
            child.setBounce(0.5);
            child.setCollideWorldBounds(true);
        });

        this.score = this.physics.add.group({
            key: 'score',
            repeat: 10,
            setXY: { x: 32, y: 300, stepX: 50 }
        });
        this.physics.add.collider(this.score, this.ground);
        this.physics.add.collider(this.score, this.blockBrick);
        this.physics.add.collider(this.score, this.blockTree);
        this.physics.add.overlap(this.score, this.ball, this.gettingScore, null, this);
        this.score.children.iterate(function (child) {
            child.setBounce(0.5);
            child.setCollideWorldBounds(true);
            child.setVelocityX(10);
            child.setRandomPosition(0, 0, 4000, 100);
        });

        this.scoreIcon = this.add.image(20, 25, 'scoreIcon');
        this.scoreIcon.setScrollFactor(0);

        this.scoreText = this.add.text(40, 16, 'Очки: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText.setScrollFactor(0);

        this.clock = this.physics.add.group({
            key: 'clock',
            repeat: 5,
            setXY: { x: 600, y: 550, stepX: 800 }
        });
        this.clock.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setOrigin(0.5, 0.5);
        });
        this.physics.add.overlap(this.clock, this.ball, this.cutTheBall, null, this);

        this.energy = this.physics.add.group({
            key: 'energy',
            repeat: 3,
            setXY: { x: 400, y: 400, stepX: 800 }
        });
        this.energy.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setOrigin(0.5, 0.5);
            child.setVelocityX(10);
            child.setBounce(0.5);
        });
        this.physics.add.overlap(this.energy, this.ball, this.bonusEnergy, null, this);
        this.physics.add.collider(this.energy, this.ground);

        this.anims.create({
            key: 'laserActive',
            frames: this.anims.generateFrameNumbers('laser'),
            frameRate: 16,
            repeat: -1
        });
        this.laser = this.physics.add.staticGroup();
        this.laser.create(400, 550, 'laser');
        this.laser.create(1500, 500, 'laser');
        this.laser.create(1700, 500, 'laser');
        this.laser.create(2700, 400, 'laser');
        this.laser.create(3600, 550, 'laser');
        this.laser.children.iterate(function (child) {
            child.play('laserActive');
        });
        this.physics.add.overlap(this.laser, this.ball, this.burn, null, this);
        
    }

    takeSpeedComponentOn(speedComponent, ball)
    {
        speedComponent.disableBody(true, true);

        this.ball.setMaxVelocity(160, 300);
    }

    boom(ball, bomb)
    {
        this.explosion = new Explosion(this, bomb.x, bomb.y);
        this.explosion = new Explosion(this, ball.x, ball.y);

        bomb.disableBody(true, true);
        ball.disableBody(true, true);

        bomb.setTexture('explosion');
        bomb.play('explode');
        
        ball.setTexture('explosion');
        ball.play('explode');

        this.cameras.main.shake(500);

        this.boomAudio = this.sound.add('boomAudio');
        var boomAudioSoundConfig = {
            mute: false,
            volume: 100,
            rate: 1,
            detune: 0,
            seek: 1,
            loop: false,
            delay: 0
        };
        this.boomAudio.play(boomAudioSoundConfig);
    }

    cutTheBall(ball, clock)
    {
        ball.disableBody(true, true);
    }

    bonusEnergy(ball, energy)
    {
        energy.disableBody(true, true);

        this.timedEventEnergyOn = this.time.delayedCall(0.001, this.onEventEnergyOn, [], this);
    }

    onEventEnergyOn()
    {
        this.ball.setMaxVelocity(560, 300);

        this.timedEventEnergyOff = this.time.delayedCall(5000, this.onEventEnergyOff, [], this);
    }

    onEventEnergyOff()
    {
        this.ball.setMaxVelocity(160, 300);
    }

    takeBonus(ball, bonus)
    {
        bonus.disableBody(true, true);

        this.violetSpark = this.add.particles('violetSpark');

        this.violetSparkEmitter = this.violetSpark.createEmitter({
            speed: 100,
            lifespan: 2000,
            scale: { start: 0.1, end: 1, random: true },
            alpha: { start: 0.1, end: 0 },
            particleAngle: { start: 0, end: 360 },
            active: true,
            blendMode: 'ADD'
        });

        this.violetSparkEmitter.startFollow(this.ball);
    }

    gettingScore(ball, score)
    {
        this.scoreCounter += 5;
        this.scoreText.setText('Очки: ' + this.scoreCounter);

        if(this.scoreCounter >=55)
        {
            this.scoreText.setText('УРА! ПОБЕДА!!! СОБРАНО МАКСИМУМ ОЧКОВ!');
        }

        score.disableBody(true, true);
    }

    bonusFunction()
    {
        this.bonusText = this.add.text(400, 150, 'БОНУС!', { fontSize: '64px', fill: '#000' });
        this.bonusText.setScrollFactor(0);

        this.bonusAudio = this.sound.add('bonusAudio');
        var bonusAudioMusicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 1,
            loop: false,
            delay: 0
        };
        this.bonusAudio.play(bonusAudioMusicConfig);
    }

    burn(ball, laser)
    {
        ball.disableBody(true, true);
    }

    update(time, delta)
    {
        this.bg.tilePositionX++;

        this.cameras.main.startFollow(this.ball, true);

        if (this.controls.left.isDown)
        { 
            this.ball.setVelocityX(-560);
            this.ball.anims.play('left', true);
        }

        else if (this.controls.right.isDown)
        {
            this.ball.setVelocityX(560);
            this.ball.anims.play('right', true);
        }

        else
        {
            this.ball.setVelocityX(0);
            this.ball.anims.play('stop');
        }

        if (this.controls.up.isDown && this.ball.body.touching.down)
        {
            this.ball.setVelocityY(-300);
        }

        if (this.controls.zoomOut.isDown)
        {
            this.cameras.main.zoom = 1;
        }

        if (this.controls.zoomIn.isDown)
        {
            this.cameras.main.zoom = 1.1;
        }

        if (this.controls.BonusScene.isDown)
        {
            this.bonusFunction();
        }

        Phaser.Actions.Rotate(this.clock.getChildren(), -0.05);
    }
}

class BonusSceneGame extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'BonusSceneGame' });

        this.background;
    }

    preload()
    {
        this.load.image('bonusScene', 'media/sprites/bonus_scene.png');
    }

    create()
    {
        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {

            this.scene.start('MainMenuScene');

        }, this);

        this.background = this.add.image(400, 300, 'bonusScene');
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 300 }
        }
    },
    scene: [ MainMenuScene, MainGameScene, BonusSceneGame ]
};

const game = new Phaser.Game(config);