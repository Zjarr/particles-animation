const rgbColorRegexString = '(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9]), (25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9]), (25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])';
const rgbRegexString = `^rgb\\(${rgbColorRegexString}\\)$`;

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const rgbToRgba = (rgb, opacity) => {
  const color = rgb.match(rgbColorRegexString);

  return color[0] ? `rgba(${color[0]}, ${opacity})` : '';
};

const loop = (times, callback) => {
  for (let i = 0; i < times; i++) {
    callback(i);
  }
};

const checkParams = () => {
  const rgbRegex = new RegExp(rgbRegexString);

  if (
    !particleAmount ||
    !particleMinDirection ||
    !particleMaxDirection ||
    !particleMinSize ||
    !particleMaxSize ||
    !particleOpacity ||
    !particleColor ||
    !lineColor
  ) {
    return false;
  }

  if (particleOpacity < 0 || particleOpacity > 1) {
    return false;
  }

  if (
    !rgbRegex.test(particleColor) ||
    !rgbRegex.test(lineColor)
  ) {
    return false;
  }

  return true;
};
