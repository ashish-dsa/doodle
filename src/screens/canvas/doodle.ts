import {canvasScript} from './canvasScript';

const doodle = (imgUrl) => {
  const canvasString = canvasScript.toString();
  const functionBody = canvasString.slice(
    canvasString.indexOf('{') + 1,
    canvasString.lastIndexOf('}'),
  );
  const base64Img = 'data:' + imgUrl.type + ';base64,' + imgUrl.data;
  const height = imgUrl.height;
  const width = imgUrl.width;

  return `<html>
  <head>
    <title>Doodle</title>
    <meta
      name="viewport"
      content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />

    <script type="text/javascript">
      ${functionBody}
    </script>

    <style>
      #canvas {
        height: 400;
        width: 400;
        position: absolute;
        background-size: 100% auto;
        background-repeat: no-repeat;
        display: block;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
      }

      .tablink {
        background-color: #039be5;
        color: black;
        float: left;
        border: none;
        outline: none;
        font-size: 17px;
        width: 25%;
        position: relative;
        height: 100%;
        top: 60%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .tabs {
        position: relative;
        width: 105%;
        background-color: white;
        height: 6%;
        left: -2%;
        top: -5%;
      }
      .tabs-bottom {
        position: fixed;
        bottom: 0;
        width: 105%;
        background-color: white;
        height: 6%;
        left: -2%;
      }
      .tablink-bottom {
        background-color: #039be5;
        color: black;
        float: left;
        border: none;
        outline: none;
        font-size: 17px;
        width: 25%;
        position: relative;
        height: 100%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    </style>
  </head>

  <body onload="init('${base64Img}','${height}','${width}')">
    <div class="tabs">
      <button class="tablink" onclick="undo()">
        Undo
      </button>
      <button class="tablink" onclick="redo()">
        Redo
      </button>
      <button class="tablink" onclick="saveCanvas()">
        Save
      </button>
      <button class="tablink" onclick="clearCanvas()">
        Clear
      </button>
    </div>
    <div class="tabs-bottom">
      <button class="tablink-bottom" onclick="changePenColor();">
        Color
        <input
          type="color"
          name="myColor"
          value="Pen Color"
          class="tablink-bottom"
          id="changePenColor"
          onclick="changePenColor();"
          style="opacity: 0; position: absolute; left: 0; top: 0; width: 100%;"
        />
      </button>
      <button class="tablink-bottom" onclick="changePenWidth()">
        Width
        <select
          id="penWidth"
          name="penWidth"
          class="tablink-bottom"
          style="opacity: 0; position: absolute; left: 0; top: 0; width: 100%;"
        >
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12" selected="selected">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
        </select>
      </button>
      <button class="tablink-bottom" onclick="changePenCap()">
        Stroke
        <select
          id="penCap"
          name="penCap"
          class="tablink-bottom"
          style="opacity: 0; position: absolute; left: 0; top: 0; width: 100%;"
        >
          <option value="round">Round</option>
          <option value="butt">Butt</option>
          <option value="square">Square</option>
        </select>
      </button>
      <button class="tablink-bottom" onclick="filterImage()">
        Filter
        <select
          id="filterImage"
          name="filterImage"
          class="tablink-bottom"
          style="opacity: 0; position: absolute; left: 0; top: 0; width: 100%;"
        >
          <option  disabled selected value>
            Beta Feature - Android Only
          </option>

          <option value="blur">Blur</option>
          <option value="brightness">Brightness</option>
          <option value="contrast">Contrast</option>
          <option value="grayscale">Grayscale</option>
          <option value="opacity">Opacity</option>
          <option value="saturate">Saturate</option>
          <option value="sepia">Sepia</option>
        </select>
      </button>
    </div>
    <canvas id="canvas" />
  </body>
</html>

`;
};

export default doodle;
