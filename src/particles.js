(() => {
  const canvas = document.querySelector('.particles');
  const ctx = canvas.getContext('2d');

  let animationReq;
  let lineMaxSize;

  /**
   * Built particles.
   * Object: { x: number, y: number, size: number, dx: number, dy: number }
   */
  let particles = [];

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getLineSize = (particle, neighbor) => {
    const c1 = Math.abs(particle.y - neighbor.y);
    const c2 = Math.abs(particle.x - neighbor.x);

    return Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2));
  }

  const getLineColor = (lineSize) => {
    const result = 1 - (lineSize / lineMaxSize);

    return rgbToRgba(lineColor, result);
  };

  const drawLines = (particle) => {
    for (const neighbor of particles) {
      const lineSize = getLineSize(particle, neighbor);

      if ((particle.x !== neighbor.x || particle.y !== neighbor.y) && lineSize < lineMaxSize) {
        ctx.beginPath();
        ctx.strokeStyle = getLineColor(lineSize);
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(neighbor.x, neighbor.y);
        ctx.stroke();
      }
    }
  };

  const drawParticle = (particle) => {
    ctx.beginPath();
    ctx.fillStyle = rgbToRgba(particleColor, particleOpacity);
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };

  const animateParticles = () => {
    clearCanvas();

    for (const particle of particles) {
      if (particle.y - particle.size < 0 || particle.y + particle.size > canvas.height) {
        particle.dy = -particle.dy;
      }

      if (particle.x - particle.size < 0 || particle.x + particle.size > canvas.width) {
        particle.dx = -particle.dx;
      }

      particle.x += particle.dx;
      particle.y += particle.dy;

      drawLines(particle);
      drawParticle(particle);
    }

    animationReq = window.requestAnimationFrame(animateParticles);
  }

  const createParticles = () => {
    loop(particleAmount, () => {
      const dy = getRandomNumber(particleMinDirection, particleMaxDirection);
      const dx = getRandomNumber(particleMinDirection, particleMaxDirection);
      const size = getRandomNumber(particleMinSize, particleMaxSize);
      const y = getRandomNumber(size + 1, canvas.height - (size + 1));
      const x = getRandomNumber(size + 1, canvas.width - (size + 1));

      const particle = { x, y, size, dx, dy };

      particles.push(particle);
    });
  };

  const setCanvasSize = () => {
    const parent = ctx.canvas.parentNode;
    const styles = getComputedStyle(parent);

    canvas.height = parseInt(styles.getPropertyValue('height'), 10);
    canvas.width = parseInt(styles.getPropertyValue('width'), 10);
  };

  const setCanvasColor = () => {
    canvas.style.backgroundColor = backgroundColor;
  }

  const setLineMaxSize = () => {
    // TODO: Improve based on are and particle amount
    lineMaxSize = (canvas.height * canvas.width) * (0.012 / particleAmount);
  };

  const drawCanvas = () => {
    createParticles();
    animateParticles();
  };

  const resetCanvas = () => {
    particles = [];
    window.cancelAnimationFrame(animationReq);

    clearCanvas();

    setCanvasSize();
    setLineMaxSize();
    drawCanvas();
  }

  const addAditionalParticle = (event) => {
    const particle = { x: event.clientX, y: event.clientY, size: particleMaxSize, dx: 0, dy: 0 }

    particles.length === particleAmount ? particles.push(particle) : particles[particleAmount] = particle;
  }

  const initEvents = () => {
    window.onresize = resetCanvas;
    window.onmousemove = addAditionalParticle;
  };

  const areParamsCorrect = checkParams();

  if (areParamsCorrect) {
    setCanvasSize();
    setCanvasColor();
    setLineMaxSize();
    drawCanvas();
    initEvents();
  }
})();