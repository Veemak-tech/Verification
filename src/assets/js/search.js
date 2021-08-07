

  function myFunction() {
    window.open("http://www.google.com/");
  }

  var elements = document.getElementsByClassName("column");
  var elements1 = document.getElementsByClassName("column-m");







  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();










  // Declare a loop variable
  var i;

  // List View
  function listView() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "77%";
    }
  }
// list -m
  function listView() {
    for (i = 0; i < elements1.length; i++) {
      elements1[i].style.width = "100%";
    }
  }

  // Grid View
  function gridView() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "25%";
    }
  }

  // List 2 view
      function list2View(){
        for (i=0; i<elements.length; i++){
          elements[i].style.width = "42%";
        }
      }

//select all check box
  function toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}


function getSelected(source) {
  var  items  = [];
  var gridlist = document.getElementById(source);


  var checkboxes =gridlist.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked)
        items.push( checkboxes[i].val);
  }
  return items;
}

// open and close form
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//




// sort by alphapet

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

  //---------------------------------------------------------


//test

// $(function(){
//   $('#filter').keyup(function(){
//       var val = $(this).val().toUpperCase();
//       $('#example > tbody > tr').each(function(index , element){
//           if($(this).text().toUpperCase().indexOf(val)<0)
//               $(this).hide();
//           else
//               $(this).show();
//       });
//   });
// });







// $(function () {
//   $('[data-toggle="popover"]').popover()
// })

// $(function () {
//   $('.example-popover').popover({
//     container: 'body'
//   })
// })




// show password
function Toggle() {
  var temp = document.getElementById("typepass");
  if (temp.type === "password") {
      temp.type = "text";
  }
  else {
      temp.type = "password";
  }
}





/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByClassName("hide");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}


















