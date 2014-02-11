(function() {
  'use strict';


  function Pipe(game, y, direction) {
    this.game = game;
    Phaser.Sprite.call(this, game, game.world.width+64, y, 'pipe');
    if(direction == 'top')
      this.anchor.setTo(0,1);
    else
      this.anchor.setTo(0,0);
    var scale = game.world.height/64;
      this.scale.setTo(1,game.world.height/(64));
    this.body.immovable = true;
    game.add.existing(this);
  }

  Pipe.prototype = Object.create(Phaser.Sprite.prototype);

  Pipe.prototype.constructor = Pipe;

  Pipe.prototype.update = function() {
    this.body.velocity.x = -200;
  }


  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      this.game.score = 0;
      this.game.physics.setBoundsToWorld(true, true, true, true);
      this.player = this.add.sprite(48, 100, 'player');
      this.player.body.gravity.y = 1500;
      this.player.anchor.setTo(0.5, 0.5);
      this.player.body.collideWorldBounds = true;


      this.pipes = this.game.add.group();

      
      
      this.input.onDown.add(this.flap, this);

      this.pipeTimer = 0;
      this.lastPipePopsition = null;

      this.scoreTxt = this.add.bitmapText(10, 10, 'Score: 0', {font: '16px minecraftia', align: 'left'});
    },

    update: function () {
      var pipe, bottompipe;
      if(this.game.time.now > this.pipeTimer) {
        this.generatePipes();
        this.pipeTimer = this.game.time.now + 1200;
      }
      pipe = this.pipes.getFirstAlive();
      if(pipe) {
        if(pipe.body.x <= -32) {
          pipe.kill();
          this.game.score++;
          bottompipe = this.pipes.getFirstAlive();
          bottompipe.kill();
          this.scoreTxt.setText('Score: ' + this.game.score);
        }
      }
      if(this.player.body.y >= this.game.height - this.player.body.height) {
        this.deathHandler();
      }
      this.game.physics.overlap(this.player, this.pipes, this.deathHandler, null, this);

    },
    flap: function() {
      this.player.body.velocity.y = -500;
    },
    generatePipes: function() {
      var top, bottom, pipePosition;
      if(this.lastPipePosition) {
        top = parseInt(this.lastPipePosition * .25);
        bottom = parseInt(this.lastPipePosition * 1.75);
        if (top < 64 ) {
          top = 64
        }
        if (bottom > this.game.world.height - 128)
          bottom = this.game.world.height - 128;
      } else {
        top = 64;
        bottom = this.game.world.height - 128;
      }
      pipePosition = this.game.rnd.integerInRange(top, bottom);
      this.pipes.add(new Pipe(this.game, pipePosition, 'top'));
      this.pipes.add(new Pipe(this.game, pipePosition + 128, 'bottom'));

      this.lastPipePosition = pipePosition;

    },
    resetPipes: function(pipe) {
      pipe.kill();
    },
    deathHandler: function() {
      this.game.state.start('gameover');

    },
    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['flappy-block'] = window['flappy-block'] || {};
  window['flappy-block'].Game = Game;

}());
