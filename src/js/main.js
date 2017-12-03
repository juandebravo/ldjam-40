'use strict';

var PlayScene = require('./play_scene.js');
const utils = require('./utils.js');


var BootScene = {
    init: function () {
        // NOTE: change this to suit your preferred scale mode.
        //       see http://phaser.io/docs/2.6.2/Phaser.ScaleManager.html
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    },
    preload: function () {
        // load here assets required for the loading screen
        this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    },

    create: function () {
        this.game.state.start('preloader');
    }
};


var PreloaderScene = {
    preload: function () {
        this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
        this.loadingBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.loadingBar);

        // generate procedural assets
        this.game.cache.addBitmapData('walker',
            utils.makeImage(this.game, 48, 48, '#966b9d'));
        this.game.cache.addBitmapData('pickup',
            utils.makeImageCircle(this.game, 16, '#b8336a'));
        this.game.cache.addBitmapData('chara',
            utils.makeImage(this.game, 32, 32, '#0d1321'));

        // TODO: load here the assets for the game
        this.game.load.audio('sfx:pickup', 'audio/pickup.wav');
        this.game.load.audio('sfx:jump', 'audio/jump.wav');
        this.game.load.audio('sfx:reload', 'audio/tremolo.wav');
        this.game.load.audio('sfx:death', 'audio/hurt.wav');
    },

    create: function () {
        this.game.state.start('play');
    }
};


window.onload = function () {
    var game = new Phaser.Game(960, 600, Phaser.AUTO);

    game.state.add('boot', BootScene);
    game.state.add('preloader', PreloaderScene);
    game.state.add('play', PlayScene);

    game.state.start('boot');
};
