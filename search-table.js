const search = document.getElementById("search");
search.addEventListener("input", searchTheList);
const COL_TEAM = 2;

function searchTheList() {
  const filter = search.value.toUpperCase();
  const tBody = document.getElementById("data-ranking");
  const rows = tBody.getElementsByTagName("tr");
  let td;

  for (let index = 0; index < rows.length; index++) {
    td = rows[index].getElementsByTagName("td")[COL_TEAM];
    if (td) {
      if ((td.textContent || td.innerText).toUpperCase().indexOf(filter) > -1) {
        rows[index].style.display = "";
      } else {
        rows[index].style.display = "none";
      }
    }
  }
}
