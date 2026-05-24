import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { defaultPyCode, memerizorKey, pyodideIndexUrl } from '../data/siteContent'

let pyodideRuntimePromise = null

function readStoredItems() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(memerizorKey)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function randomGridPoint(width, height, grid) {
  return {
    x: Math.floor(Math.random() * (width / grid)) * grid,
    y: Math.floor(Math.random() * (height / grid)) * grid,
  }
}

function drawCenteredImage(canvas, image) {
  const context = canvas.getContext('2d')
  const scale = Math.min(canvas.width / image.width, canvas.height / image.height)
  const width = image.width * scale
  const height = image.height * scale
  const offsetX = (canvas.width - width) / 2
  const offsetY = (canvas.height - height) / 2

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#06131a'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, offsetX, offsetY, width, height)
}

function drawImagePlaceholder(canvas, message) {
  const context = canvas.getContext('2d')
  context.fillStyle = '#06131a'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#c7dde5'
  context.font = '16px Space Grotesk, sans-serif'
  context.textAlign = 'center'
  context.fillText(message, canvas.width / 2, canvas.height / 2)
}

async function waitForPyodideScript() {
  if (typeof window.loadPyodide === 'function') {
    return
  }

  await new Promise((resolve, reject) => {
    const script = document.querySelector('script[src*="pyodide"]')

    if (!script) {
      reject(new Error('Pyodide script is missing.'))
      return
    }

    script.addEventListener('load', resolve, { once: true })
    script.addEventListener('error', () => reject(new Error('Pyodide failed to load.')), {
      once: true,
    })
  })
}

async function getPyodideRuntime() {
  await waitForPyodideScript()

  if (!pyodideRuntimePromise) {
    pyodideRuntimePromise = window.loadPyodide({ indexURL: pyodideIndexUrl })
  }

  return pyodideRuntimePromise
}

export default function BrowserProjectsPage() {
  return (
    <>
      <PageHeader
        actions={[{ label: 'Back Home', href: '#/home', variant: 'secondary' }]}
        description="These demos use browser-safe controls and canvas rendering to recreate the old Python projects without leaving the page."
        eyebrow="Python in Browser"
        slim
        title="Browser-safe recreations"
      />

      <section className="section-block">
        <div className="browser-grid">
          <MemerizorDemo />
          <ImageEditorDemo />
          <PongDemo />
          <RainbowDemo />
          <SnakeDemo />
          <PyodideLabDemo />
        </div>
      </section>
    </>
  )
}

function MemerizorDemo() {
  const [items, setItems] = useState(() => readStoredItems())
  const [value, setValue] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(memerizorKey, JSON.stringify(items))
    } catch {
      return
    }
  }, [items])

  function addItem() {
    const nextValue = value.trim()

    if (!nextValue) {
      return
    }

    setItems((currentItems) => [...currentItems, nextValue])
    setValue('')
  }

  return (
    <article className="panel browser-card">
      <h3>Memerizor</h3>
      <p>A browser-safe list manager that mirrors the idea of the old Tkinter project. Add, remove, and organize items directly on the page.</p>

      <div className="browser-panel">
        <input
          className="browser-input"
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addItem()
            }
          }}
          placeholder="Type an item to remember"
          value={value}
        />
        <div className="button-row">
          <button type="button" onClick={addItem}>
            Add
          </button>
          <button type="button" onClick={() => setItems([])}>
            Clear
          </button>
        </div>
        <ul className="browser-list">
          {items.length === 0 ? (
            <li className="small-note">Nothing stored yet.</li>
          ) : (
            items.map((item, index) => (
              <li key={`${item}-${index}`}>
                <span>{item}</span>
                <button
                  className="inline-button"
                  type="button"
                  onClick={() => {
                    setItems((currentItems) =>
                      currentItems.filter((_, currentIndex) => currentIndex !== index),
                    )
                  }}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </article>
  )
}

function ImageEditorDemo() {
  const canvasRef = useRef(null)
  const originalImageRef = useRef(null)
  const [fileName, setFileName] = useState('No image selected')
  const [status, setStatus] = useState('Upload an image to start editing.')

  useEffect(() => {
    if (canvasRef.current) {
      drawImagePlaceholder(canvasRef.current, 'Upload an image to start editing.')
    }
  }, [])

  function applyPixelTransform(transformPixel) {
    const canvas = canvasRef.current

    if (!canvas || !originalImageRef.current) {
      return
    }

    const context = canvas.getContext('2d')
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const { data } = imageData

    for (let index = 0; index < data.length; index += 4) {
      const [red, green, blue, alpha] = transformPixel(
        data[index],
        data[index + 1],
        data[index + 2],
        data[index + 3],
      )

      data[index] = red
      data[index + 1] = green
      data[index + 2] = blue
      data[index + 3] = alpha
    }

    context.putImageData(imageData, 0, 0)
  }

  function rotateImage() {
    const sourceImage = originalImageRef.current

    if (!canvasRef.current || !sourceImage) {
      return
    }

    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = sourceImage.height
    tempCanvas.height = sourceImage.width

    const tempContext = tempCanvas.getContext('2d')
    tempContext.translate(tempCanvas.width / 2, tempCanvas.height / 2)
    tempContext.rotate(Math.PI / 2)
    tempContext.drawImage(
      sourceImage,
      -sourceImage.width / 2,
      -sourceImage.height / 2,
    )

    const rotatedImage = new Image()
    rotatedImage.onload = () => {
      drawCenteredImage(canvasRef.current, rotatedImage)
      setStatus('Image rotated.')
    }
    rotatedImage.src = tempCanvas.toDataURL()
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      originalImageRef.current = image
      setFileName(file.name)
      setStatus('Image ready.')

      if (canvasRef.current) {
        drawCenteredImage(canvasRef.current, image)
      }

      URL.revokeObjectURL(objectUrl)
    }

    image.onerror = () => {
      setStatus('Could not load the selected file.')
      URL.revokeObjectURL(objectUrl)
    }

    image.src = objectUrl
  }

  function resetImage() {
    const canvas = canvasRef.current

    if (!canvas || !originalImageRef.current) {
      return
    }

    drawCenteredImage(canvas, originalImageRef.current)
    setStatus('Image reset.')
  }

  return (
    <article className="panel browser-card">
      <h3>Image Editor</h3>
      <p>Upload an image and apply browser-safe edits like grayscale, invert, and rotation.</p>

      <div className="browser-panel">
        <input
          accept="image/*"
          className="browser-input"
          onChange={handleImageChange}
          type="file"
        />
        <div className="browser-meta">
          <span>{fileName}</span>
          <span className="small-note">{status}</span>
        </div>
        <div className="button-row">
          <button type="button" onClick={rotateImage}>
            Rotate
          </button>
          <button
            type="button"
            onClick={() => applyPixelTransform((red, green, blue, alpha) => {
              const gray = red * 0.299 + green * 0.587 + blue * 0.114
              return [gray, gray, gray, alpha]
            })}
          >
            Grayscale
          </button>
          <button
            type="button"
            onClick={() => applyPixelTransform((red, green, blue, alpha) => [255 - red, 255 - green, 255 - blue, alpha])}
          >
            Invert
          </button>
          <button type="button" onClick={resetImage}>
            Reset
          </button>
        </div>
        <canvas ref={canvasRef} width="420" height="300" />
      </div>
    </article>
  )
}

function PongDemo() {
  const canvasRef = useRef(null)
  const drawRef = useRef(() => {})
  const stateRef = useRef({
    leftY: 120,
    rightY: 120,
    ballX: 240,
    ballY: 150,
    ballVX: 3,
    ballVY: 2,
    scoreLeft: 0,
    scoreRight: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    const paddleHeight = 60
    const paddleWidth = 10
    const ballSize = 8

    function draw() {
      const state = stateRef.current

      context.fillStyle = '#06131a'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.strokeStyle = 'rgba(255,255,255,0.2)'
      context.setLineDash([6, 8])
      context.beginPath()
      context.moveTo(canvas.width / 2, 0)
      context.lineTo(canvas.width / 2, canvas.height)
      context.stroke()
      context.setLineDash([])

      context.fillStyle = '#ffd38f'
      context.fillRect(10, state.leftY, paddleWidth, paddleHeight)
      context.fillRect(canvas.width - 20, state.rightY, paddleWidth, paddleHeight)
      context.fillStyle = '#78d6e8'
      context.fillRect(state.ballX, state.ballY, ballSize, ballSize)

      context.fillStyle = '#eef7fb'
      context.font = '14px Space Grotesk, sans-serif'
      context.fillText(
        `${state.scoreLeft} - ${state.scoreRight}`,
        canvas.width / 2 - 15,
        18,
      )

      context.fillStyle = '#c7dde5'
      context.fillText('Buttons move the paddles and the rally keeps going.', 24, 286)
    }

    function resetBall(scoredByLeftPlayer) {
      const state = stateRef.current
      state.ballX = canvas.width / 2
      state.ballY = canvas.height / 2
      state.ballVX = scoredByLeftPlayer ? -3 : 3
      state.ballVY = 2
    }

    function step() {
      const state = stateRef.current

      state.ballX += state.ballVX
      state.ballY += state.ballVY

      if (state.ballY <= 0 || state.ballY >= canvas.height - ballSize) {
        state.ballVY *= -1
      }

      if (
        state.ballX <= 20 &&
        state.ballY + ballSize >= state.leftY &&
        state.ballY <= state.leftY + paddleHeight
      ) {
        state.ballVX = Math.abs(state.ballVX)
      }

      if (
        state.ballX >= canvas.width - 30 &&
        state.ballY + ballSize >= state.rightY &&
        state.ballY <= state.rightY + paddleHeight
      ) {
        state.ballVX = -Math.abs(state.ballVX)
      }

      if (state.ballX < 0) {
        state.scoreRight += 1
        resetBall(false)
      }

      if (state.ballX > canvas.width) {
        state.scoreLeft += 1
        resetBall(true)
      }

      draw()
    }

    drawRef.current = draw
    draw()

    const timerId = window.setInterval(step, 1000 / 60)

    return () => {
      window.clearInterval(timerId)
    }
  }, [])

  function movePaddle(side, delta) {
    const state = stateRef.current
    const maxY = 300 - 60

    if (side === 'left') {
      state.leftY = clamp(state.leftY + delta, 0, maxY)
    } else {
      state.rightY = clamp(state.rightY + delta, 0, maxY)
    }

    drawRef.current()
  }

  return (
    <article className="panel browser-card">
      <h3>Pong</h3>
      <p>
        A playable browser version inspired by the old Python Pong project.
        Use the controls below to move the paddles and keep the rally going.
      </p>

      <div className="browser-panel">
        <canvas ref={canvasRef} width="480" height="300" />
        <div className="button-row">
          <button type="button" onClick={() => movePaddle('left', -20)}>
            Left Up
          </button>
          <button type="button" onClick={() => movePaddle('left', 20)}>
            Left Down
          </button>
          <button type="button" onClick={() => movePaddle('right', -20)}>
            Right Up
          </button>
          <button type="button" onClick={() => movePaddle('right', 20)}>
            Right Down
          </button>
        </div>
      </div>
    </article>
  )
}

function RainbowDemo() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    const colors = ['#f94144', '#f3722c', '#f9c74f', '#43aa8b', '#577590', '#9b5de5', '#ff85a1']

    context.fillStyle = '#06131a'
    context.fillRect(0, 0, canvas.width, canvas.height)

    colors.forEach((color, index) => {
      context.beginPath()
      context.strokeStyle = color
      context.lineWidth = 16
      context.arc(210, 210, 80 + index * 12, Math.PI, 0, false)
      context.stroke()
    })

    context.fillStyle = '#c7dde5'
    context.font = '14px Space Grotesk, sans-serif'
    context.fillText('A simple visual recreation of the rainbow drawing project.', 24, 28)

    return undefined
  }, [])

  return (
    <article className="panel browser-card">
      <h3>RAINBOW</h3>
      <p>A simple visual recreation of the rainbow drawing project using browser canvas rendering.</p>

      <div className="browser-panel">
        <canvas ref={canvasRef} width="420" height="240" />
      </div>
    </article>
  )
}

function SnakeDemo() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    const grid = 20
    const width = canvas.width
    const height = canvas.height

    function createState() {
      return {
        snake: [{ x: 200, y: 200 }],
        direction: { x: grid, y: 0 },
        food: randomGridPoint(width, height, grid),
        score: 0,
      }
    }

    stateRef.current = createState()

    function draw() {
      const state = stateRef.current

      context.fillStyle = '#06131a'
      context.fillRect(0, 0, width, height)

      context.fillStyle = '#ff9f43'
      context.fillRect(state.food.x, state.food.y, grid, grid)

      state.snake.forEach((part, index) => {
        context.fillStyle = index === 0 ? '#ffd38f' : '#78d6e8'
        context.fillRect(part.x, part.y, grid, grid)
      })

      context.fillStyle = '#eef7fb'
      context.font = '14px Space Grotesk, sans-serif'
      context.fillText(`Score: ${state.score}`, 10, 18)
    }

    function step() {
      const state = stateRef.current
      const head = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y,
      }

      state.snake.unshift(head)

      if (head.x === state.food.x && head.y === state.food.y) {
        state.score += 1
        state.food = randomGridPoint(width, height, grid)
      } else {
        state.snake.pop()
      }

      const hitsWall = head.x < 0 || head.x >= width || head.y < 0 || head.y >= height
      const hitsSelf = state.snake.slice(1).some((part) => part.x === head.x && part.y === head.y)

      if (hitsWall || hitsSelf) {
        stateRef.current = createState()
      }

      draw()
    }

    function handleKeyDown(event) {
      const state = stateRef.current
      let handled = false

      if (event.key === 'ArrowUp' && state.direction.y === 0) {
        state.direction = { x: 0, y: -grid }
        handled = true
      }

      if (event.key === 'ArrowDown' && state.direction.y === 0) {
        state.direction = { x: 0, y: grid }
        handled = true
      }

      if (event.key === 'ArrowLeft' && state.direction.x === 0) {
        state.direction = { x: -grid, y: 0 }
        handled = true
      }

      if (event.key === 'ArrowRight' && state.direction.x === 0) {
        state.direction = { x: grid, y: 0 }
        handled = true
      }

      if (handled) {
        event.preventDefault()
      }
    }

    draw()
    const timerId = window.setInterval(step, 120)

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearInterval(timerId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <article className="panel browser-card">
      <h3>Snake Game</h3>
      <p>A browser-friendly snake game inspired by both of the Python snake projects. Use the arrow keys to play.</p>

      <div className="browser-panel">
        <canvas ref={canvasRef} width="420" height="420" />
        <p className="small-note">Arrow keys to move. Eat the food and avoid the walls.</p>
      </div>
    </article>
  )
}

function PyodideLabDemo() {
  const [code, setCode] = useState(defaultPyCode)
  const [output, setOutput] = useState('Ready.')
  const [status, setStatus] = useState('Loads Python on demand through Pyodide.')
  const [isRunning, setIsRunning] = useState(false)

  async function runPython() {
    setIsRunning(true)
    setStatus('Running Python...')
    setOutput('')

    try {
      const pyodide = await getPyodideRuntime()
      let capturedOutput = ''

      pyodide.setStdout({
        batched: (text) => {
          capturedOutput += text
          setOutput(capturedOutput)
        },
      })

      pyodide.setStderr({
        batched: (text) => {
          capturedOutput += text
          setOutput(capturedOutput)
        },
      })

      await pyodide.runPythonAsync(code)

      if (!capturedOutput.trim()) {
        setOutput('Finished with no output.')
      }

      setStatus('Ready.')
    } catch (error) {
      setOutput(String(error))
      setStatus('Pyodide failed to run.')
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <article className="panel browser-card browser-card-wide">
      <h3>Pyodide Python Lab</h3>
      <p>
        This console runs standard Python in the browser. It is best for simple
        scripts, experimentation, and learning.
      </p>

      <div className="browser-panel">
        <textarea
          className="browser-textarea"
          onChange={(event) => setCode(event.target.value)}
          rows="10"
          spellCheck="false"
          value={code}
        />
        <div className="button-row">
          <button disabled={isRunning} type="button" onClick={runPython}>
            {isRunning ? 'Running...' : 'Run Python'}
          </button>
          <button type="button" onClick={() => setCode(defaultPyCode)}>
            Reset
          </button>
        </div>
        <div className="browser-meta">
          <span>{status}</span>
        </div>
        <pre className="browser-output">{output}</pre>
      </div>
    </article>
  )
}