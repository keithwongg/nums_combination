MAX_LENGTH = 6;
THREE_COMBIS = [];
FOUR_COMBIS = [];

function generate() {
  var numbers = [];
  for (let i = 0; i < MAX_LENGTH; i++) {
    let val = document.getElementById(`i${i}`).value;
    numbers.push(val);
  }

  THREE_COMBIS = getCombinations(numbers, 3);
  showResults(3, THREE_COMBIS);

  FOUR_COMBIS = getCombinations(numbers, 4);
  showResults(4, FOUR_COMBIS);

  renderToCanvas();
}

// arr: given array
// choose: array all combinations for a given number of digits
// e.g if number is 3, and given list is 5, e.g {a, b, c, d, e}
// then, we want all permutations of 3 in the given set list.
function getCombinations(arr, choose) {
  let result = [];
  combine(0, [], arr, choose, result);
  return result;
}

function combine(start, path, arr, choose, result) {
  if (path.length === choose) {
    result.push([...path]);
    return;
  }

  for (let i = start; i < arr.length; i++) {
    path.push(arr[i]);
    combine(i + 1, path, arr, choose, result);
    path.pop(); // backtrack
  }
}

// function getPermutations(arr, choose) {
//   const result = [];
//   permute([], Array(arr.length).fill(false), arr, choose, result);
//   return result;
// }
//
// function permute(path, used, arr, choose, result) {
//   if (path.length === choose) {
//     result.push([...path]);
//     return;
//   }
//
//   for (let i = 0; i < arr.length; i++) {
//     if (used[i]) continue;
//
//     path.push(arr[i]);
//     used[i] = true;
//
//     permute(path, used, arr, choose, result);
//
//     path.pop();
//     used[i] = false;
//   }
// }
//

function showResults(choose, results) {
  let container;
  let countDisplay;
  if (choose === 3) {
    container = document.getElementById("threeContainer");
    countDisplay = document.getElementById("3Count");
  }
  if (choose === 4) {
    container = document.getElementById("fourContainer");
    countDisplay = document.getElementById("4Count");
  }

  for (let i = 0; i < results.length; i++) {
    let row = document.createElement("div");
    row.className = "resultBox";

    for (let j = 0; j < results[i].length; j++) {
      let item = document.createElement("div");
      item.className = "resultItemContainer";
      item.textContent = results[i][j];
      row.appendChild(item);
    }

    container.appendChild(row);
  }

  showExportContainer();
  showCounts(countDisplay, results.length);
}

function showExportContainer() {
  let con = document.getElementById("export");
  con.classList.remove("hide");
}

function showCounts(elem, count) {
  elem.textContent = `(${count}) items`;
}

function exportCsv() {
  let csvContent = "data:text/csv;charset=utf-8,";
  THREE_COMBIS.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
  FOUR_COMBIS.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

function saveToLs(inputId) {
  let value = document.getElementById(inputId).value;
  localStorage.setItem(inputId, value);
}

function loadInputsFromLs() {
  for (let i = 0; i < MAX_LENGTH; i++) {
    let valueFromLs = localStorage.getItem(`i${i}`);
    document.getElementById(`i${i}`).value = valueFromLs;
  }
}

function clickedGenerate() {
  let isContentsShown = document.getElementById("export").classList;
  if (isContentsShown.contains("hide")) {
    generate();
    return;
  }
  localStorage.setItem("runGenerateAfterReload", "1");
  // window.location = window.location;
  window.location.reload();
  return;
}

function clearAllInputs() {
  for (let i = 0; i < MAX_LENGTH; i++) {
    let input = document.getElementById(`i${i}`);
    input.value = "";
    localStorage.removeItem(`i${i}`);
  }
}

/* Event Listeners */
// for left right input box navigation
window.document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    clickedGenerate();
  }

  let currFocus = document.activeElement;
  if (currFocus.id === undefined) {
    return;
  }
  let currIndex = currFocus.id[1];
  if (e.key === "ArrowLeft" && currIndex > 0) {
    let newLeftFocus = document.getElementById(`i${Number(currIndex) - 1}`);
    newLeftFocus.focus();
  }
  if (e.key === "ArrowRight" && currIndex < MAX_LENGTH - 1) {
    let newFocus = document.getElementById(`i${Number(currIndex) + 1}`);
    newFocus.focus();
  }
});

window.addEventListener("load", () => {
  loadInputsFromLs();
  if (localStorage.getItem("runGenerateAfterReload") === "1") {
    generate();
    localStorage.removeItem("runGenerateAfterReload");
  }
});
