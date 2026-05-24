let pyodideReady = null;

async function getPyodideInstance() {
  if (!pyodideReady) {
    pyodideReady = loadPyodide();
  }
  return pyodideReady;
}

function setupMemerizor() {
  const input = document.getElementById('mem-input');
  const list = document.getElementById('mem-list');
  const addButton = document.getElementById('mem-add');
  const clearButton = document.getElementById('mem-clear');

  const render = () => {
    const items = JSON.parse(localStorage.getItem('memerizor-items') || '[]');
    list.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  };

  addButton.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;
    const items = JSON.parse(localStorage.getItem('memerizor-items') || '[]');
    items.push(value);
    localStorage.setItem('memerizor-items', JSON.stringify(items));
    input.value = '';
    render();
  });

  clearButton.addEventListener('click', () => {
    localStorage.removeItem('memerizor-items');
    render();
  });

  render();
}

function setupImageEditor() {
  const input = document.getElementById('image-input');
  const canvas = document.getElementById('image-canvas');
  const context = canvas.getContext('2d');
  const buttons = {
    rotate: document.getElementById('img-rotate'),
    gray: document.getElementById('img-gray'),
    invert: document.getElementById('img-invert'),
    reset: document.getElementById('img-reset'),
  };

  let originalImage = null;

  function drawImage(image) {
    const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#08131a';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, x, y, width, height);
  }

  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) return;
    const image = new Image();
    image.onload = () => {
      originalImage = image;
      drawImage(image);
    };
    image.src = URL.createObjectURL(file);
  });

  buttons.rotate.addEventListener('click', () => {
    if (!originalImage) return;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = originalImage.height;
    tempCanvas.height = originalImage.width;
    const tempContext = tempCanvas.getContext('2d');
    tempContext.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempContext.rotate(Math.PI / 2);
    tempContext.drawImage(originalImage, -originalImage.width / 2, -originalImage.height / 2);
    const rotated = new Image();
    rotated.onload = () => drawImage(rotated);
    rotated.src = tempCanvas.toDataURL();
  });

  buttons.gray.addEventListener('click', () => {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    context.putImageData(imageData, 0, 0);
  });

  buttons.invert.addEventListener('click', () => {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    context.putImageData(imageData, 0, 0);
  });

  buttons.reset.addEventListener('click', () => {
    if (originalImage) {
      drawImage(originalImage);
    }
  });

  context.fillStyle = '#08131a';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#c7dde5';
  context.font = '16px Space Grotesk, sans-serif';
  context.fillText('Upload an image to start editing.', 95, 150);
}

function setupPong() {
  const canvas = document.getElementById('pong-canvas');
  const context = canvas.getContext('2d');
  const paddleHeight = 60;
  const paddleWidth = 10;
  const ballSize = 8;
  const state = {
    leftY: canvas.height / 2 - paddleHeight / 2,
    rightY: canvas.height / 2 - paddleHeight / 2,
    ballX: canvas.width / 2,
    ballY: canvas.height / 2,
    ballVX: 3,
    ballVY: 2,
    scoreLeft: 0,
    scoreRight: 0,
  };

  document.querySelectorAll('[data-pong]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.pong;
      if (action === 'up') state.leftY -= 20;
      if (action === 'down') state.leftY += 20;
      if (action === 'rightup') state.rightY -= 20;
      if (action === 'rightdown') state.rightY += 20;
      state.leftY = Math.max(0, Math.min(canvas.height - paddleHeight, state.leftY));
      state.rightY = Math.max(0, Math.min(canvas.height - paddleHeight, state.rightY));
    });
  });

  function draw() {
    context.fillStyle = '#06131a';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(255,255,255,0.2)';
    context.setLineDash([6, 8]);
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
    context.setLineDash([]);

    context.fillStyle = '#ffd38f';
    context.fillRect(10, state.leftY, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - 20, state.rightY, paddleWidth, paddleHeight);
    context.fillStyle = '#78d6e8';
    context.fillRect(state.ballX, state.ballY, ballSize, ballSize);

    context.fillStyle = '#eef7fb';
    context.font = '14px Space Grotesk, sans-serif';
    context.fillText(`${state.scoreLeft} - ${state.scoreRight}`, canvas.width / 2 - 15, 18);

    state.ballX += state.ballVX;
    state.ballY += state.ballVY;

    if (state.ballY <= 0 || state.ballY >= canvas.height - ballSize) {
      state.ballVY *= -1;
    }

    if (state.ballX <= 20 && state.ballY + ballSize >= state.leftY && state.ballY <= state.leftY + paddleHeight) {
      state.ballVX *= -1;
    }

    if (state.ballX >= canvas.width - 30 && state.ballY + ballSize >= state.rightY && state.ballY <= state.rightY + paddleHeight) {
      state.ballVX *= -1;
    }

    if (state.ballX < 0) {
      state.scoreRight += 1;
      state.ballX = canvas.width / 2;
      state.ballY = canvas.height / 2;
    }

    if (state.ballX > canvas.width) {
      state.scoreLeft += 1;
      state.ballX = canvas.width / 2;
      state.ballY = canvas.height / 2;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

function setupRainbow() {
  const canvas = document.getElementById('rainbow-canvas');
  const context = canvas.getContext('2d');
  const colors = ['#f94144', '#f3722c', '#f9c74f', '#43aa8b', '#577590', '#9b5de5', '#ff85a1'];
  context.fillStyle = '#06131a';
  context.fillRect(0, 0, canvas.width, canvas.height);
  colors.forEach((color, index) => {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 16;
    context.arc(210, 210, 80 + index * 12, Math.PI, 0, false);
    context.stroke();
  });
}

function setupSnake() {
  const canvas = document.getElementById('snake-canvas');
  const context = canvas.getContext('2d');
  const grid = 20;
  let snake = [{ x: 200, y: 200 }];
  let direction = { x: grid, y: 0 };
  let food = { x: 100, y: 100 };
  let score = 0;

  function randomFood() {
    return {
      x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
      y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
    };
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -grid };
    if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: grid };
    if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -grid, y: 0 };
    if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: grid, y: 0 };
  });

  function draw() {
    context.fillStyle = '#06131a';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ff9f43';
    context.fillRect(food.x, food.y, grid, grid);
    context.fillStyle = '#78d6e8';
    snake.forEach((part) => context.fillRect(part.x, part.y, grid, grid));
    context.fillStyle = '#eef7fb';
    context.font = '14px Space Grotesk, sans-serif';
    context.fillText(`Score: ${score}`, 10, 18);

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 1;
      food = randomFood();
    } else {
      snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
      snake = [{ x: 200, y: 200 }];
      direction = { x: grid, y: 0 };
      score = 0;
      food = randomFood();
    }

    setTimeout(() => requestAnimationFrame(draw), 120);
  }

  draw();
}

async function setupPyodideLab() {
  const output = document.getElementById('py-output');
  const code = document.getElementById('py-code');
  const runButton = document.getElementById('py-run');
  const resetButton = document.getElementById('py-reset');
  const defaultCode = code.value;

  runButton.addEventListener('click', async () => {
    const pyodide = await getPyodideInstance();
    output.textContent = 'Running...';
    try {
      pyodide.setStdout({
        batched: (text) => {
          output.textContent += text;
        },
      });
      pyodide.setStderr({
        batched: (text) => {
          output.textContent += text;
        },
      });
      output.textContent = '';
      await pyodide.runPythonAsync(code.value);
      if (!output.textContent) {
        output.textContent = 'Finished with no output.';
      }
    } catch (error) {
      output.textContent = String(error);
    }
  });

  resetButton.addEventListener('click', () => {
    code.value = defaultCode;
    output.textContent = 'Ready.';
  });
}

function init() {
  setupMemerizor();
  setupImageEditor();
  setupPong();
  setupRainbow();
  setupSnake();
  setupPyodideLab();
}

window.addEventListener('DOMContentLoaded', init);