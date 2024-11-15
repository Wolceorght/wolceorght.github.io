var ftype = 0;
BtnAction(ftype);

function filter() {
  let value = document.getElementById("search").value.toUpperCase();
  let albums = document.getElementById("albums");
  let frows = albums.getElementsByTagName("tr");

  for (i = 0; i < frows.length; i ++) {
    let column = frows[i].getElementsByTagName("td")[ftype];
    let name = column.textContent;
    frows[i].style.display = name.toUpperCase().indexOf(value) > -1 ? "" : "none";
  }
}

function BtnAction(inputtype) {
  ftype = inputtype;
  let alltext = document.getElementsByClassName("button");
  for (i = 0; i <= 4; i++) {
      alltext[i].style.fontWeight = 500;
  }
  if (ftype == 0) {
    ftext = document.getElementById("names");
  } else if (ftype == 1) {
    ftext = document.getElementById("artists");
  } else if (ftype == 2) {
    ftext = document.getElementById("regions");
  } else if (ftype == 3) {
    ftext = document.getElementById("dates");
  } else if (ftype == 4) {
    ftext = document.getElementById("comments");
  }
  ftext.style.fontWeight = 700;
}

function ZhAndEn(a, b) {
  let reg = /[a-zA-Z0-9]/;
  if (reg.test(a) || reg.test(b)) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  } else {
    return a.localeCompare(b);
  }
}

function Sort(stype) {
  let count = 0, i = 0;
  let table = document.getElementById("albums");
  let switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    let srows = table.rows;
    for (i = 0; i < srows.length - 1 ; i ++) {
      s = false; 
      let a = srows[i].getElementsByTagName("td")[stype];
      let b = srows[i+1].getElementsByTagName("td")[stype];
      if (dir == "asc") {
        if (ZhAndEn(a.innerHTML.toUpperCase(), b.innerHTML.toUpperCase()) > 0) { /*a.innerHTML.toUpperCase() > b.innerHTML.toUpperCase()*/
          s = true;
          break;
        }
      } else if (dir == "desc") {
        if (ZhAndEn(a.innerHTML.toUpperCase(), b.innerHTML.toUpperCase()) < 0) {
          s = true;
          break;
        }
      }
    }
    if (s) {
      srows[i].parentNode.insertBefore(srows[i+1], srows[i]);
      switching = true;
      count ++;
    } else {
      if (count == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  SortArrow(stype);
}

const th = document.getElementsByClassName("th");

function SortArrow(stype) {
  for (i = 0; i < th.length; i ++) {
    th[i].classList.remove("asc");
    th[i].classList.remove("desc");
  }
  if (dir == "asc") {
    th[stype].classList.remove("desc");
    th[stype].classList.add("asc");
    dir = "desc";
  } else if (dir == "desc") {
    th[stype].classList.remove("asc");
    th[stype].classList.add("desc");
    dir = "asc";
  }
}

document.getElementById("search").addEventListener("keyup", filter);
