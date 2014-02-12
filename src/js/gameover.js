(function() {
  'use strict';

  function GameOver() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  GameOver.prototype = {

    create: function () {

      var x = this.game.width / 2 - 30
        , y = 100
      this.newPersonalHigh = false;
      this.newWorldRecord = false;


      if(this.game.score > getPersonalHighScore()) {
        console.debug('new personal best: ', this.game.score);
        setPersonalHighScore(this.game.score);
        this.newPersonalHigh = true;
      }

      if(this.game.score > getGlobalHighScore()) {
        console.debug('new world record: ', this.game.score);
        this.newWorldRecord = true;
      }

      var scoreObj = {time: new Date().toJSON(), score: this.game.score};
      highScoresRef.push(scoreObj);

      increaseGamesPlayed();

      this.titleTxt = this.add.bitmapText(this.game.width/2, y, 'Game Over', {font: '24px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);
      
      y = y + this.titleTxt.height + 10;
      this.scoreTxt = this.add.bitmapText(this.game.width/2, y, 'Score: ' + this.game.score, {font: '16px minecraftia', align: 'left'});
      this.scoreTxt.anchor.setTo(0.5, 0.5);

     
      y = y + this.scoreTxt.height + 20;
      this.localTxt = this.add.bitmapText(x-50, y, 'You:', {font: '18px minecraftia'});
    

      y = y + this.localTxt.height + 5;
      this.deathsTxt = this.add.bitmapText(x, y, 'Deaths: ' + getGamesPlayed(), {font: '16px minecraftia', align: 'left'});
      

      y = y + this.deathsTxt.height + 5;
      this.highScoreTxt = this.add.bitmapText(x, y, 'Record: ' + getPersonalHighScore(), {font: '16px minecraftia', align: 'left'});

      y = y + this.highScoreTxt.height + 20;
      this.worldTxt = this.add.bitmapText(x-130, y, 'The World:', {font: '18px minecraftia', align: 'left'});
    
      y = y + this.worldTxt.height + 10;
      this.globalDeathsTxt = this.add.bitmapText(x, y, 'Deaths: ' + getGlobalGamesPlayed(), {font: '16px minecraftia', align: 'left'});

      y = y + this.globalDeathsTxt.height + 5;
      this.globalRecordTxt = this.add.bitmapText(x, y, 'Record: ' + getGlobalHighScore(), {font: '16px minecraftia', align: 'left'});
    
      y = y + this.globalRecordTxt.height + 20;
      this.startTxt = this.add.bitmapText(x, y, 'CLICK TO START', {font: '12px minecraftia', align: 'center'});
    
      if(this.newPersonalHigh) {
        this.personalHighText = this.add.bitmapText(this.game.width/2 + 200,100, 'NEW PERSONAL BEST', { fill: '#ffc600', font: '16px minecraftia', align: 'center'})
        this.personalHighText.anchor.setTo(0.5, 0.5);
        this.personalHighText.angle = 45;
        this.personalHighText.scale.direct = 'grow';
      }
      if(this.newWorldRecord) {
        this.worldHighText = this.add.bitmapText(this.game.width/2 - 200,100, 'NEW WORLD RECORD!', { fill: '#ffc600', font: '16px minecraftia', align: 'center'})
        this.worldHighText.anchor.setTo(0.5, 0.5);
        this.worldHighText.angle = -45;
        this.worldHighText.scale.direct = 'grow';
      }
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.newPersonalHigh == true) {
        if (this.personalHighText.scale.direction == 'grow') {
          this.personalHighText.scale.x += 0.005;
          this.personalHighText.scale.y += 0.005;
          if(this.personalHighText.scale.x >= 1.2) {
            this.personalHighText.scale.direction = 'shrink';
          }
        } else {
          this.personalHighText.scale.x -= 0.005;
          this.personalHighText.scale.y -= 0.005;
          if(this.personalHighText.scale.x <= 1) {
            this.personalHighText.scale.direction = 'grow';
          }
        }
      }
      if(this.newWorldRecord == true) {
        if (this.worldHighText.scale.direction == 'grow') {
          this.worldHighText.scale.x += 0.005;
          this.worldHighText.scale.y += 0.005;
          if(this.worldHighText.scale.x >= 1.2) {
            this.worldHighText.scale.direction = 'shrink';
          }
        } else {
          this.worldHighText.scale.x -= 0.005;
          this.worldHighText.scale.y -= 0.005;
          if(this.worldHighText.scale.x <= 1) {
            this.worldHighText.scale.direction = 'grow';
          }
        }
      }
    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['flappy-block'] = window['flappy-block'] || {};
  window['flappy-block'].GameOver = GameOver;

}());
