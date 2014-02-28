(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      // game Setup
      this.game.stage.backgroundColor = '#71c5cf';
      this.game.physics.gravity.y = 1000;

      // game switches
      this.started = false;

      // collision group setup
      this.birdCG = this.game.physics.createCollisionGroup();
      this.pipeCG = this.game.physics.createCollisionGroup();

      // background setup
      this.background = this.game.add.tileSprite(0,0,800,800, 'background');
      

      // player setup
      this.bird = this.game.add.sprite(100, 245, 'player');
      this.bird.checkWorldBounds = true;
      this.bird.outOfBoundsKill = true;
      this.bird.physicsEnabled = true;
      this.bird.body.fixedRotation = true;
      this.bird.body.setCollisionGroup(this.birdCG);
      this.bird.body.collides([this.pipeCG]);
      this.bird.body.createGroupCallback(this.pipeCG, this.hitPipe, this);
      this.bird.body.static = true;
      this.bird.anchor.setTo(-0.2, 0.5);

      
      // pipes setup
      this.pipes = this.game.add.group();
      this.pipes.createMultiple(20, 'pipe');
      this.pipes.setAll('checkWorldBounds', true);
      this.pipes.setAll('outOfBoundsKill', true);
      this.pipes.setAll('physicsEnabled', true);
      this.pipes.forEach(function(pipe){
        pipe.body.fixedRotation = true;
        pipe.body.setCollisionGroup(this.pipeCG);
        pipe.body.collides([this.birdCG]);
        pipe.body.immovable = true;
      },this);
      

      // input setup
      var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      
      spaceKey.onDown.add(function() {
        if(this.started) {
          this.jump();
        } else {
          this.started = true;
          this.bird.body.static = false;
          this.jump();
          this.promptLabel.visible = false;
          this.background.autoScroll(-200,0);
        }
      },this);

      // event setup
      this.bird.events.onKilled.add(function() {
        this.game.state.start('game');
        this.game.time.events.remove(this.timer);
      },this);

      // timer setup
      this.timer = this.game.time.events.loop(1500, function() {
        if(this.started) {
          this.addPipeRow();
        }
      }, this);

      // score setup 
      this.score = 0;
      this.scoreLabel = this.add.bitmapText(20,20, 'minecraftia', '0', 30);

      // prompt setup
      
      this.promptLabel = this.add.bitmapText(2, this.game.height-225, 'minecraftia','Press Space to Flap', 30);

      // sound setup
      this.jumpSound = this.game.add.audio('jump');



    },
    update: function() {
      // currently, there's no way to tell a sprite to ignore
      // gravity. So we have to make constant adjustments
      // upwards
      this.pipes.forEachAlive(function(pipe) {
        pipe.body.moveUp(17);
      });

      // rotate our bird downwards
      if(this.bird.angle < 20) {
        this.bird.angle += 1;
      }

      this.scoreLabel.text = this.score;
    },
    jump: function() {
      if(!this.started) {

      }
      if(this.bird.alive) {
        this.jumpSound.play();
        // move the bird
        this.bird.body.moveUp(400);

        // create an animation on the bird
        var animation = this.game.add.tween(this.bird);

        // set the animation to change the angle to -20 degrees over 100 milliseconds
        animation.to({angle: -20}, 100);

        //and start the animation
        animation.start();
      }
    },
    addOnePipe: function(x, y) {
      var pipe = this.pipes.getFirstDead();
      pipe.reset(x,y);
      pipe.body.moveUp(17);
      pipe.body.moveLeft(350);
    },
    addPipeRow: function() {
      this.score++;
      var hole = this.game.rnd.integerInRange(1,5);
      for (var i = 0; i < 11; i++) {
        if(i !== hole && i !== hole+1) {
          this.addOnePipe(432, i*64);
        }
      }
    },
    hitPipe: function() {
      this.bird.alive = false;
      this.bird.body.clearCollision(true);
      this.game.time.events.remove(this.timer);
      this.background.stopScroll();
      this.pipes.forEachAlive(function(pipe) {
        pipe.body.setZeroVelocity();
      });

    }

  };

  window['flappy-block'] = window['flappy-block'] || {};
  window['flappy-block'].Game = Game;

}());
