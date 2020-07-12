export const canvasScript = () => {
  let canvas, ctx;
  let canvasSnapshots = [];
  let currentStep = -1;
  let touchX, touchY;
  let lastX,
    lastY = -1;
  let baseState;
  let penWidth = 12;
  let penColor = '#000000';
  let penCap = 'round'; //butt,round,square
  const filterEffects = {
    none: 'none',
    blur: 'blur(5px) opacity(0.6)',
    brightness: 'brightness(2)',
    contrast: 'contrast(1.4)',
    grayscale: 'grayscale(1)',
    opacity: 'opacity(0.5)',
    saturate: 'saturate(1.5)',
    sepia: 'sepia(1)',
  };
  const takeSnapshot = () => {
    currentStep++;
    if (currentStep < canvasSnapshots.length) {
      canvasSnapshots.length = currentStep;
    }
    canvasSnapshots.push(canvas.toDataURL());
  };
  const undo = () => {
    if (currentStep > 0) {
      currentStep--;
      // eslint-disable-next-line no-undef
      var canvasPic = new Image();
      canvasPic.src = canvasSnapshots[currentStep];
      canvasPic.onload = function () {
        ctx.drawImage(canvasPic, 0, 0);
      };
    }
  };
  const redo = () => {
    if (currentStep < canvasSnapshots.length - 1) {
      currentStep++;
      // eslint-disable-next-line no-undef
      var canvasPic = new Image();
      canvasPic.src = canvasSnapshots[currentStep];
      canvasPic.onload = () => {
        ctx.drawImage(canvasPic, 0, 0);
      };
    }
  };

  const drawLine = (x, y) => {
    if (lastX === -1) {
      lastX = x;
      lastY = y;
    }
    ctx.lineCap = penCap;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.lineWidth = penWidth;
    ctx.strokeStyle = penColor;
    ctx.stroke();
    ctx.closePath();
    lastX = x;
    lastY = y;
  };

  const clearCanvas = () => {
    ctx.filter = 'none';
    // eslint-disable-next-line no-undef
    let canvasPic = new Image();
    canvasPic.src = baseState;
    canvasPic.onload = () => {
      ctx.drawImage(canvasPic, 0, 0);
      canvasSnapshots.length = 0;
      currentStep = -1;
      takeSnapshot();
    };
  };

  const changePenColor = () => {
    const theInput = document.getElementById('changePenColor');
    theInput.addEventListener(
      'input',
      () => {
        penColor = theInput.value;
        ctx.strokeStyle = penColor;
      },
      false,
    );
  };

  const changePenWidth = () => {
    const theInput = document.getElementById('penWidth');
    theInput.addEventListener(
      'input',
      () => {
        penWidth = theInput.value;
        ctx.lineWidth = penWidth;
      },
      false,
    );
  };

  const changePenCap = () => {
    const theInput = document.getElementById('penCap');
    theInput.addEventListener(
      'input',
      () => {
        penCap = theInput.value;
        ctx.lineCap = penCap;
      },
      false,
    );
  };

  const filterImage = () => {
    const theInput = document.getElementById('filterImage');
    theInput.addEventListener(
      'input',
      () => {
        takeSnapshot();
        // eslint-disable-next-line no-undef
        var canvasPic = new Image();
        canvasPic.src = canvasSnapshots[currentStep];
        canvasPic.onload = () => {
          ctx.filter = filterEffects[theInput.value];
          ctx.drawImage(canvasPic, 0, 0);
          ctx.filter = 'none';
        };
      },
      false,
    );
  };

  const saveCanvas = () => {
    window.ReactNativeWebView.postMessage(canvas.toDataURL('image/png'));
  };

  const canvasTouchStart = (e) => {
    getTouchPos();
    drawLine(touchX, touchY);
    e.preventDefault();
  };

  const canvasTouchEnd = (e) => {
    lastX = -1;
    lastY = -1;
    takeSnapshot();
    e.preventDefault();
  };

  const canvasTouchMove = (e) => {
    getTouchPos(e);
    drawLine(touchX, touchY);
    e.preventDefault();
  };

  const getTouchPos = (e) => {
    if (e.touches) {
      if (e.touches.length === 1) {
        let touch = e.touches[0];
        touchX = touch.pageX - touch.target.offsetLeft;
        touchY = touch.pageY - touch.target.offsetTop;
      }
    }
  };

  const drawBackground = (imgUrl, imgHeight, imgWidth) => {
    // eslint-disable-next-line no-undef
    let background = new Image();
    background.src = imgUrl;
    background.onload = () => {
      let scale = Math.min(canvas.width / imgWidth, canvas.height / imgHeight);
      canvas.height = imgHeight * scale;
      canvas.style.height = imgHeight * scale;
      canvas.style.width = imgWidth * scale;
      canvas.width = imgWidth * scale;
      scale = Math.min(canvas.width / imgWidth, canvas.height / imgHeight);
      let x = canvas.width / 2 - (imgWidth / 2) * scale;
      let y = canvas.height / 2 - (imgHeight / 2) * scale;
      ctx.drawImage(background, x, y, imgWidth * scale, imgHeight * scale);
      takeSnapshot();
      baseState = canvas.toDataURL();
    };
  };

  const fitToContainer = () => {
    canvas.style.width = '100%';
    canvas.style.height = '86%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  const init = (imgUrl, imgHeight, imgWidth) => {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
    }
    if (ctx) {
      canvas.addEventListener('touchstart', canvasTouchStart, false);
      canvas.addEventListener('touchend', canvasTouchEnd, false);
      canvas.addEventListener('touchmove', canvasTouchMove, false);
    }
    fitToContainer();
    drawBackground(imgUrl, imgHeight, imgWidth);
  };
};
