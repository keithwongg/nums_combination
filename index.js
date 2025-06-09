MAX_LENGTH = 5
THREE_COMBIS = []
FOUR_COMBIS = []

function generate() {
  var numbers = []
  for (let i = 0; i < MAX_LENGTH; i++) {
    let val = document.getElementById(`i${i}`).value
    numbers.push(val)
  }

  THREE_COMBIS = getPermutations(numbers, 3);
  showResults(3, THREE_COMBIS);

  FOUR_COMBIS = getPermutations(numbers, 4);
  showResults(4, FOUR_COMBIS);
}

// arr: given array
// choose: array all combinations for a given number of digits
// e.g if number is 3, and given list is 5, e.g {a, b, c, d, e}
// then, we want all combinations of 3 in the given set list.
function getCombinations(arr, choose) {
  const result = [];
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

function getPermutations(arr, choose) {
  const result = [];

  function permute(path, used) {
    if (path.length === choose) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;

      path.push(arr[i]);
      used[i] = true;

      permute(path, used);

      path.pop();
      used[i] = false;
    }
  }

  permute([], Array(arr.length).fill(false));
  return result;
}

function showResults(choose, results) {
  let container;
  if (choose === 3) {
    container = document.getElementById("threeContainer")
  }
  if (choose === 4) {
    container = document.getElementById("fourContainer")
  }

  for (let i = 0; i < results.length; i++) {
    let row = document.createElement("div")
    row.textContent = results[i].join(",")
    container.appendChild(row)
  }

  showExportButton()
}

function showExportButton() {
  let btn = document.getElementById("export")
  btn.classList.remove("hide")
}

function exportCsv() {
  let csvContent = "data:text/csv;charset=utf-8,";
  THREE_COMBIS.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
  FOUR_COMBIS.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

/* Event Listeners */
// for left right input box navigation
window.document.addEventListener("keydown", (e) => {
  let currFocus = document.activeElement
  if (currFocus.id === undefined) {
    return
  }
  let currIndex = currFocus.id[1]
  if (e.key === "ArrowLeft" && currIndex > 0) {
    let newLeftFocus = document.getElementById(`i${Number(currIndex) - 1}`)
    newLeftFocus.focus()
  }
  if (e.key === "ArrowRight" && currIndex < MAX_LENGTH - 1) {
    let newFocus = document.getElementById(`i${Number(currIndex) + 1}`)
    newFocus.focus()
  }
})


