import Sprite from './sprite';
import { getRandomInt } from './util';

export default class extends Sprite {
  constructor(context) {
    var y = getRandomInt(0, 120);
    var path = '../images/cloud.png';
    super(path,
          context,
          { x: 320, y: y },
          { width: 6, height: 4 },
          { x: -0.5, y: 0 } );
  }

  get currentFrame() {
    return 0;
  }
}
