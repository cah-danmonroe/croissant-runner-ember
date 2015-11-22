import Ember from 'ember';

export default Ember.Component.extend({
  game: Ember.inject.service(),

  didInsertElement() {
    this.configureEventListeners();
    this.configureCanvas();
    const canvas = this.get('canvas');
    const level = this.get('level');
    const game = this.get('game');

    game.configureGame(canvas, level);

    if (!game.paused) {
      game.play();
    }

    Ember.run.scheduleOnce('afterRender', () => {
      this.resizeCanvas();
    });
  },

  willDestroyElement() {
    this.removeEventListeners();
  },

  configureCanvas() {
    var canvas = this.get('element').getElementsByClassName('game')[0];
    this.set('canvas', canvas);
  },

  configureEventListeners() {
    this.set('playOrPause', this._playOrPause.bind(this));
    this.set('resizeCanvas', this._resizeCanvas.bind(this));
  },

  addEventListeners() {
    window.addEventListener('keydown', this.playOrPause, false);
    window.addEventListener('resize', this.resizeCanvas, false);
  },

  removeEventListeners() {
    window.removeEventListener('keydown', this.playOrPause, false);
    window.removeEventListener('resize', this.resizeCanvas, false);
    const game = this.get('game');
    if (game) { game.removeEventListeners(); }
  },

  _playOrPause(e) {
    const game = this.get('game');
    if (e.keyCode === 67) {
      if(this.get('animReq')) {
        game.pause();
      } else {
        game.play();
      }
    }
  },

  _resizeCanvas() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasClass = 'canvas-tall';

    if (width > height) { canvasClass = 'canvas-wide'; }

    var canvas = this.get('canvas');
    canvas.className = canvasClass;
  }
});
