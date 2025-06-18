function screenShotComponent(id) {
  let item = document.querySelector(`#${id}`);
  item.style = "padding: 50px";
  let box = document.querySelectorAll(".resultItemContainer");
  box.forEach((ib) => (ib.style = "height:30px; width: 30px"));

  html2canvas(item, {
    backgroundColor: "black",
  }).then((canvas) => {
    // alert(navigator.userAgent)
    // use ios webshare api to save to photos app instead of files
    webShareOrDownload(canvas, id);
  });

  item.style = "";
  box.forEach((ib) => (ib.style = ""));
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
