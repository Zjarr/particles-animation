const particleAmount = 100;

const particleMinDirection = -2;
const particleMaxDirection = 2;

const particleMinSize = 2;
const particleMaxSize = 4;

const particleColor = 'rgba(255, 255, 255, 1)';

const lineMaxSize = 200;

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}

const loop = (times, callback) => {
  for (let i = 0; i < times; i++) {
    callback(i);
  }
};
