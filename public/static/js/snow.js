window.onload = function () {
  // Get the canvas and context and store in vars
  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");

  // Set canvas dims to windows height and width
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  // Generate the snowflakes and apply attributes
  var mf = 300; // Maximum flakes
  var flakes = [];

  const generateFlake = (
    maxX = W,
    maxY = H,
    r = Math.random() * 2 + 0.5,
    d = Math.random() * 1
  ) => {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    return { x, y, r, d };
  };

  const generateNewFlake = (r, d) => {
    return generateFlake(W, 0, r, d);
  };

  // Loop throgh the empty flakes and apply attributes
  for (var i = 0; i < mf; i++) {
    flakes.push(generateFlake());
  }

  // Draw flakes onto canvas
  function drawFlakes() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "white";
    ctx.beginPath();
    flakes.forEach((f) => {
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    });
    ctx.fill();
    moveFlakes();
  }

  // Animate the flakes
  var angle = 0;

  function moveFlakes() {
    angle += 0.03;
    flakes.forEach((f, index) => {
      // Update X and Y coordinates of each snowflake
      f.y += Math.pow(f.d, 1) + 0.3;
      f.x += Math.sin(angle) * 1.5;

      // If the snowflake reaches the bottom, send a new one to the top
      if (f.y > H) {
        flakes[index] = generateNewFlake(f.r, f.d);
      }
    });
    // for (let i = 0; i < mf; i++) {
    // }
  }
  // console.log("alive?");
  setInterval(drawFlakes, 25);
};
