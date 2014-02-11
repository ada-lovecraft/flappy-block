(function() {
  'use strict';

  function GameOver() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  GameOver.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'Game Over', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);
      
      y = y + this.titleTxt.height + 5;
      this.scoreTxt = this.add.bitmapText(x, y, 'Score: ' + this.game.score, {font: '16px minecraftia', align: 'center'});
      this.scoreTxt.anchor.setTo(0.5, 0.5);

      y = y + this.scoreTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'CLICK TO START', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['flappy-block'] = window['flappy-block'] || {};
  window['flappy-block'].GameOver = GameOver;

}());
