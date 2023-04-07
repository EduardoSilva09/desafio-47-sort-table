const thPosition = document.getElementById("thPosition");
const thLogo = document.getElementById("thLogo");
const thTeam = document.getElementById("thTeam");
const thClass = document.getElementById("thClass");
const thScore = document.getElementById("thScore");
const thNote = document.getElementById("thNote");
const ASCENDANT = 1;
const DESCENDANT = 2;

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

function sortTextColumn(e) {
  if (e.target.classList.contains("desc")) {
    e.target.classList.remove("desc");
    sortColumn(e, testText);
  } else {
    e.target.classList.add("desc");
    sortColumn(e, testTextDesc);
  }
}

function sortNumericColumn(e) {
  if (e.target.classList.contains("desc")) {
    e.target.classList.remove("desc");
    sortColumn(e, testNumber);
  } else {
    e.target.classList.add("desc");
    sortColumn(e, testNumberDesc);
  }
}
