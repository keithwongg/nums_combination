function screenShotComponent(id) {
  html2canvas(document.querySelector(`#${id}`), {
    backgroundColor: "black",
  }).then((canvas) => {
    // alert(navigator.userAgent)
    // use ios webshare api to save to photos app instead of files
    webShareOrDownload(canvas, id);
  });
}

function webShareOrDownload(canvas, title) {
  if (navigator.userAgent.includes("Apple")) {
    canvas.toBlob(function (blob) {
      const file = new File([blob], `${title}.png`, { type: "image/png" });

      // Check if sharing is supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator
          .share({
            files: [file],
            title: title,
          })
          .catch(function (error) {
            console.error("Sharing failed:", error);
          });
      } else {
        // alert("Sharing not supported, please save manually.");
        let dataURL = canvas.toDataURL("image/png", 1.0);
        downloadImage(dataURL, `${title}.png`);
      }
    }, "image/png");
  } else {
    let dataURL = canvas.toDataURL("image/png", 1.0);
    downloadImage(dataURL, `${title}.png`);
  }
}

function downloadImage(data, filename = "untitled.png") {
  var a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}
