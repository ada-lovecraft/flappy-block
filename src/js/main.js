window.onload = function () {
  'use strict';

  var game
    , ns = window['flappy-block'];
  game = new Phaser.Game(400, 640, Phaser.AUTO, 'flappy-block-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.start('boot');
};
