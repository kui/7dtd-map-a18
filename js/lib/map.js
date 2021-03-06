import forEachRight from 'lodash/forEachRight';
import lazy from './lazy-invoker';

const signChar = '✘';
const markChar = '🚩️';

export default class Map {
  constructor(window, canvas) {
    this.window = window;
    this.canvas = canvas;
    this.showBiomes = true;
    this.showSplat3 = true;
    this.showSplat4 = true;
    this.showRad = true;
    this.showPrefabs = true;
    this.biomesImg = null;
    this.splat3Img = null;
    this.splat4Img = null;
    this.radImg = null;
    this.waterImg = null;
    this.brightness = '100%';
    this.scale = '0.1';
    this.signSize = 200;
    this.prefabs = [];

    const fontFace = new window.FontFace('Noto Sans', 'url(NotoEmoji-Regular.ttf)');
    fontFace.load().then((a) => window.fonts.add(a));
    this.fontFace = fontFace.load();

    // flag
    this.markCoords = {};

    this.lazyUpdater = lazy(window, () => this.updateImmediately());
  }

  get width() {
    return Math.max(
      this.biomesImg ? this.biomesImg.width : 0,
      this.splat3Img ? this.splat3Img.width : 0,
      this.splat4Img ? this.splat4Img.width : 0,
    );
  }

  get height() {
    return Math.max(
      this.biomesImg ? this.biomesImg.height : 0,
      this.splat3Img ? this.splat3Img.height : 0,
      this.splat4Img ? this.splat4Img.height : 0,
    );
  }

  update() {
    this.lazyUpdater();
  }

  async updateImmediately() {
    this.canvas.width = this.width * this.scale;
    this.canvas.height = this.height * this.scale;
    const context = this.canvas.getContext('2d');
    context.scale(this.scale, this.scale);
    context.filter = `brightness(${this.brightness})`;
    if (this.biomesImg && this.showBiomes) {
      context.drawImage(this.biomesImg, 0, 0, this.width, this.height);
      if (this.waterImg) {
        context.drawImage(this.waterImg, 0, 0, this.width, this.height);
      }
    }
    if (this.splat3Img && this.showSplat3) {
      context.drawImage(this.splat3Img, 0, 0, this.width, this.height);
    }
    if (this.splat4Img && this.showSplat4) {
      context.drawImage(this.splat4Img, 0, 0, this.width, this.height);
    }
    context.filter = 'none';
    if (this.radImg && this.showRad) {
      context.imageSmoothingEnabled = false;
      context.drawImage(this.radImg, 0, 0, this.width, this.height);
      context.imageSmoothingEnabled = true;
    }
    if (this.showPrefabs) {
      await drawPrefabs(this, context);
    }
    if (this.markCoords && this.markCoords.x && this.markCoords.z) {
      await drawMark(this, context);
    }
  }
}

async function drawPrefabs(map, ctx) {
  ctx.font = `${map.signSize}px ${(await map.fontFace).family}`;
  ctx.fillStyle = 'red';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const offsetX = map.width / 2;
  const offsetY = map.height / 2;

  const charOffsetX = Math.round(map.signSize * 0.01);
  const charOffsetY = Math.round(map.signSize * 0.05);

  forEachRight(map.prefabs, (prefab) => {
    const x = offsetX + prefab.x + charOffsetX;
    // prefab vertical positions are inverted for canvas coodinates
    const y = offsetY - prefab.y + charOffsetY;
    putText({
      ctx, text: signChar, x, y, textSize: map.signSize,
    });
  });
}

async function drawMark(map, ctx) {
  ctx.font = `${map.signSize}px ${(await map.fontFace).family}`;
  ctx.fillStyle = 'red';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  const offsetX = map.width / 2;
  const offsetY = map.height / 2;
  const charOffsetX = -1 * Math.round(map.signSize * 0.32);
  const charOffsetY = -1 * Math.round(map.signSize * 0.1);

  const x = offsetX + map.markCoords.x + charOffsetX;
  // prefab vertical positions are inverted for canvas coodinates
  const y = offsetY - map.markCoords.z + charOffsetY;

  putText({
    ctx, text: markChar, x, y, textSize: map.signSize,
  });
  ctx.strokeText(markChar, x, y);
  ctx.fillText(markChar, x, y);
}

function putText({
  ctx, text, x, y, textSize,
}) {
  ctx.lineWidth = Math.round(textSize * 0.2);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.strokeText(text, x, y);

  ctx.lineWidth = Math.round(textSize * 0.1);
  ctx.strokeStyle = 'white';
  ctx.strokeText(text, x, y);

  ctx.fillText(text, x, y);
}
