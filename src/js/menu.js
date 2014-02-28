(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia','FLAPPY BLOCK',16);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia','Click To Start', 12);
      

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['flappy-block'] = window['flappy-block'] || {};
  window['flappy-block'].Menu = Menu;

}());
