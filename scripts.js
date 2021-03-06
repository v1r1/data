// Google Spreadsheet Parser
// window.onload = $.getJSON("https://spreadsheets.google.com/feeds/list/1Nnm95MR-H1jxa4IXSaPy6CogHPDan92VvCPkVBH1HMs/od6/public/values?alt=json", function (data) {
//
//   var sheetData = data.feed.entry;
//
//   var i;
//   for (i = 0; i < sheetData.length; i++) {
//
//     var name = data.feed.entry[i]['gsx$_cn6ca']['$t'];
//     var description = data.feed.entry[i]['gsx$_cokwr']['$t'];
//     var site = data.feed.entry[i]['gsx$_cpzh4']['$t'];
//
//     document.getElementById("projects").innerHTML += (`<tr><td>${name}</td><td>${description}</td><td>${site}</td></tr>`);
//
//   }
// })

class DataTable extends HTMLElement {
  render() {
    let src = this.getAttribute('src');
    let json;
    this.tbody = $q('tbody');

    fetch(src)
      .then(response => response.json())
      .then(data => json = data)
      .catch(console.error);

    console.log(json)

    var i;
    for (i = 0; i < json.feed.entry.length; i++) {

      var name = json.feed.entry[i]['gsx$_cn6ca']['$t'];
      var description = json.feed.entry[i]['gsx$_cokwr']['$t'];
      var site = json.feed.entry[i]['gsx$_cpzh4']['$t'];

      this.tbody += (`<tr><td>${name}</td><td>${description}</td><td>${site}</td></tr>`);
    }
  }
  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
  getJSON() {

  }
}

customElements.define("data-table", DataTable);

// Sort Table
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("TVShowTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// Filter Title
function filterTitle() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterTitle");
  filter = input.value.toUpperCase();
  table = document.getElementById("TVShowTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Filter Format
function filterFormat() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterFormat");
  filter = input.value.toUpperCase();
  table = document.getElementById("TVShowTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Filter Status
function filterStatus() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterStatus");
  filter = input.value.toUpperCase();
  table = document.getElementById("TVShowTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
