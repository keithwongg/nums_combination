/*
 * HARDCODED COPY PASTE STYLES FROM MAIN
 * convert html to xml using nativ js
 * */

function renderToCanvas() {
  const target = document.getElementById("ss-result");
  const width = target.offsetWidth;
  const height = target.offsetHeight;

  // Clone the element so you can safely manipulate it
  const cloned = target.cloneNode(true);
  cloned.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

  // Wrap cloned HTML in an SVG
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">

  <style>

.resultContainer {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 24px;

  background: #000000;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(2, 0, 36, 1) 100%);
  color: #B8B8B8;
  font-family: Arial, Helvetica, sans-serif;
}

.resultBox {
  padding: 4px;
  font-size: 28px;
  height: auto;
  width: fit-content;
  margin: 4px;
  border-radius: 10px;
  border: 2px solid #B8B8B8;
}

.resultItemContainer {
  display: inline-block;
  height: 50px;
  width: 50px;
  font-size: 20px;
  text-align: center;
  align-content: center;
}

.listContainer {
  display: flex;
  flex-direction: column;
  place-items: center;
}

.countDisplay {
  font-size: 24px;
}

@media (max-width: 600px) {

  h1 {
    font-size: 22px;
  }

  h2 {
    font-size: 18px;
  }

  .resultItemContainer {
    height: 40px;
    width: 40px;
  }

  .countDisplay {
    font-size: 16px;
  }
}

@media (max-width: 360px) {
  .inputBox {
    height: 45px;
    width: 45px;
  }

  .resultContainer {
    flex-direction: column;
  }

  .resultItemContainer {
    height: 30px;
    width: 30px;
  }

}

  </style>

      <foreignObject width="100%" height="100%">
        ${new XMLSerializer().serializeToString(cloned)}
      </foreignObject>
    </svg>
  `;

  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();

  img.onload = () => {
    const canvas = document.getElementById("outputCanvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0);

    URL.revokeObjectURL(url);
  };

  img.onerror = (e) => {
    console.error("Failed to load image from SVG blob.");
    console.log(e);
    URL.revokeObjectURL(url);
  };

  img.src = url;
}

function downloadCanvas() {
  const canvas = document.getElementById("outputCanvas");
  const link = document.createElement("a");
  link.download = "combinations.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
