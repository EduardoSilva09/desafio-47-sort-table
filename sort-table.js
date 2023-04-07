const thPosition = document.getElementById("thPosition");
const thLogo = document.getElementById("thLogo");
const thTeam = document.getElementById("thTeam");
const thClass = document.getElementById("thClass");
const thScore = document.getElementById("thScore");
const thNote = document.getElementById("thNote");

thPosition.addEventListener("click", sortNumericColumn);
thTeam.addEventListener("click", sortTextColumn);
thClass.addEventListener("click", sortTextColumn);
thScore.addEventListener("click", sortNumericColumn);
thNote.addEventListener("click", sortNumericColumn);

function sortColumn(e, callback) {
  const tBody = document.getElementById("data-ranking");
  const column = e.target.cellIndex;
  let isSorted, rows, row, nextRow, toggle, index;

  isSorted = false;
  while (!isSorted) {
    rows = tBody.rows;
    isSorted = true;

    for (index = 0; index < rows.length - 1; index++) {
      toggle = false;
      row = rows[index].getElementsByTagName("td")[column];
      nextRow = rows[index + 1].getElementsByTagName("td")[column];

      if (callback(row, nextRow)) {
        toggle = true;
        break;
      }
    }

    if (toggle) {
      rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
      isSorted = false;
    }
  }
}

function testText(row, nextRow) {
  return row.innerHTML.toLowerCase() > nextRow.innerHTML.toLowerCase();
}

function testTextDesc(row, nextRow) {
  return row.innerHTML.toLowerCase() < nextRow.innerHTML.toLowerCase();
}

function GetFloat(StrNumber) {
  return parseFloat(StrNumber.replace(",", "."));
}

function testNumber(row, nextRow) {
  return GetFloat(row.innerHTML) > GetFloat(nextRow.innerHTML);
}

function testNumberDesc(row, nextRow) {
  return GetFloat(row.innerHTML) < GetFloat(nextRow.innerHTML);
}

function sortTextColumnAsc(e) {
  sortColumn(e, testText);
}

function sortTextColumnDesc(e) {
  sortColumn(e, testTextDesc);
}

function toggleSort(e, ascSort, descSort) {
  if (e.target.classList.contains("desc")) {
    e.target.classList.remove("desc");
    ascSort(e);
  } else {
    e.target.classList.add("desc");
    descSort(e);
  }
}

function sortTextColumn(e) {
  toggleSort(e, sortTextColumnAsc, sortTextColumnDesc);
}

function sortNumericColumnAsc(e) {
  sortColumn(e, testNumber);
}

function sortNumericColumnDesc(e) {
  sortColumn(e, testNumberDesc);
}

function sortNumericColumn(e) {
  toggleSort(e, sortNumericColumnAsc, sortNumericColumnDesc);
}
