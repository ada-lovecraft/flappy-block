(function() {
  'use strict';

  function GameOver() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  GameOver.prototype = {

    create: function () {

      var x = this.game.width / 2 - 30
        , y = 100;

      this.newPersonalHigh = false;
      this.newWorldRecord = false;
      this.newDailyRecord = false;
      var self = this;
      
      refreshData().then(function() { self.setup() });

      var scoreObj = {time: new Date().toJSON(), score: this.game.score};
      highScoresRef.push(scoreObj);

      increaseGamesPlayed();

      if(this.game.score > getPersonalHighScore()) {
        console.debug('new personal best: ', this.game.score);
        setPersonalHighScore(this.game.score);
        this.newPersonalHigh = true;
      }

      this.titleTxt = this.add.bitmapText(this.game.width/2, y, 'Game Over', {font: '24px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);
      
      y = y + this.titleTxt.height + 10;
      this.scoreTxt = this.add.bitmapText(this.game.width/2, y, 'Score: ' + this.game.score, {font: '16px minecraftia', align: 'left'});
      this.scoreTxt.anchor.setTo(0.5, 0.5);

     
      y = y + this.scoreTxt.height + 10;
      this.localTxt = this.add.bitmapText(x-50, y, 'You:', {font: '18px minecraftia'});
    

      y = y + this.localTxt.height + 5;
      this.deathsTxt = this.add.bitmapText(x, y, 'Deaths: ' + getGamesPlayed(), {font: '16px minecraftia', align: 'left'});
      

      y = y + this.deathsTxt.height + 5;
      this.highScoreTxt = this.add.bitmapText(x, y, 'Record: ' + getPersonalHighScore(), {font: '16px minecraftia', align: 'left'});

      y = y + this.highScoreTxt.height + 40;
      this.loadingTxt = this.add.bitmapText(this.game.width/2, y, 'Loading World Wide Statistics...', {font: '18px minecraftia', align: 'left'});
      this.loadingTxt.anchor.setTo(0.5, 0.5);

      this.startTxt = this.add.bitmapText(this.game.width/2, this.game.height - 20, 'CLICK TO START', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      if(this.newPersonalHigh) {
        this.personalHighText = this.add.bitmapText(this.game.width/2 + 200,100, 'NEW PERSONAL BEST', { fill: '#ffc600', font: '16px minecraftia', align: 'center'})
        this.personalHighText.anchor.setTo(0.5, 0.5);
        this.personalHighText.angle = 45;
        this.personalHighText.scale.direct = 'grow';
      }

      this.input.onDown.add(this.onDown, this);

    },
    setup: function() {
      var x = this.game.width / 2 - 30
        , y = 100 ;

        this.loadingTxt.destroy();

        if(this.game.score > getGlobalHighScore()) {
          console.debug('new world record: ', this.game.score);
          this.newWorldRecord = true;
        }

        if(this.game.score > getGlobalDailyHighScore()) {
          console.debug('new daily record: ', this.game.score);
          this.newDailyRecord = true;
        }

        y = this.highScoreTxt.y + this.highScoreTxt.height + 20;
        this.worldTxt = this.add.bitmapText(x-130, y, 'The World:', {font: '18px minecraftia', align: 'left'});

        y = y + this.worldTxt.height + 10;
        this.globalDailyDeathsTxt = this.add.bitmapText(x, y, 'Daily Deaths: ' + getGlobalDailyGamesPlayed(), {font: '16px minecraftia', align: 'left'});

        y = y + this.globalDailyDeathsTxt.height + 5;
        this.globalDailyRecordTxt = this.add.bitmapText(x, y, 'Daily Record: ' + getGlobalDailyHighScore(), {font: '16px minecraftia', align: 'left'});
      
        y = y + this.globalDailyRecordTxt.height + 5;
        this.globalDeathsTxt = this.add.bitmapText(x, y, 'All Time Deaths: ' + getGlobalGamesPlayed(), {font: '16px minecraftia', align: 'left'});

        y = y + this.globalDeathsTxt.height + 5;
        this.globalRecordTxt = this.add.bitmapText(x, y, 'All Time Record: ' + getGlobalHighScore(), {font: '16px minecraftia', align: 'left'});
      
        if(this.newWorldRecord) {
          console.debug('creating worldHighText');
          this.worldHighText = this.add.bitmapText(this.game.width/2 - 200,100, 'NEW WORLD RECORD!', { fill: '#ffc600', font: '16px minecraftia', align: 'center'})
          this.worldHighText.anchor.setTo(0.5, 0.5);
          this.worldHighText.angle = -45;
          this.worldHighText.scale.direct = 'grow';
        }

        if(this.newDailyRecord) {
          this.worldDailyHighText = this.add.bitmapText(this.game.width/2 - 150, 125, 'NEW DAILY WORLD RECORD!', { fill: '#ffc600', font: '16px minecraftia', align: 'center'})
          this.worldDailyHighText.anchor.setTo(0.5, 0.5);
          this.worldDailyHighText.angle = -45;
          this.worldDailyHighText.scale.direct = 'grow';
        }
    },

    update: function () {
      if(this.newPersonalHigh) {
        this.pulse(this.personalHighText);
      }
      if(this.newWorldRecord && this.worldHighText) {

        this.pulse(this.worldHighText);
      }
      if(this.newDailyRecord && this.worldDailyHighText) {
        this.pulse(this.worldDailyHighText);
      }

    },
    pulse: function(txt) {
      if (txt.scale.direction == 'grow') {
        txt.scale.x += 0.005;
        txt.scale.y += 0.005;
        if(txt.scale.x >= 1.2) {
          txt.scale.direction = 'shrink';
        }
      } else {
        txt.scale.x -= 0.005;
        txt.scale.y -= 0.005;
        if(txt.scale.x <= 1) {
          txt.scale.direction = 'grow';
        }
      }
    },
    onDown: function () {
      cancelRefresh();
      this.game.state.start('game');
    }
  };

  window['flappy-block'] = window['flappy-block'] || {};
  window['flappy-block'].GameOver = GameOver;

}());
