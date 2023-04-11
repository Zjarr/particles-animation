const particleAmount = 100;

const particleMinDirection = -1;
const particleMaxDirection = 1;

const particleMinSize = 2;
const particleMaxSize = 4;

const particleColor = 'rgba(255, 255, 255, 1)';

const lineMaxSize = 250;

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}

const loop = (times, callback) => {
  for (let i = 0; i < times; i++) {
    callback(i);
  }
};
