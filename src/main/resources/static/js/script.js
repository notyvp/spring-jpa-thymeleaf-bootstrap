$(document).ready(function() {
    changePageAndSize();
});

let qs = decodeURIComponent(location);
let menuItem = qs.replace("http://localhost:8080", "");

//making active links
$("a[href='" + menuItem + "']").parent("li").addClass("active");

if(menuItem.includes("adminPage")){
    $("a[href='/adminPage']").parent("li").addClass("active");
}
if(menuItem.includes("users")){
    $("a[href='/adminPage/users']").parent("li").addClass("active");
}
if(menuItem.includes("roles")){
    $("a[href='/adminPage/roles']").parent("li").addClass("active");
}

function changePageAndSize() {

    $('#pageSizeSelect').change(function(evt) {
        let selectedProperty = $("#search-user-dropdown option:selected").text();
        let value = $("#searchUserBar").val();

        if (value !== "" && value != null) {
            window.location.replace("/adminPage/users?usersProperty=" + selectedProperty + "&propertyValue=" + value + "pageSize=" + this.value + "&page=1");
        }

        else{
            window.location.replace("/adminPage/users?pageSize=" + this.value + "&page=1");
        }
    });
}

//region Keep searching parameters after page refresh
//=================================================================================================
$("#searchUserBar").val(getSavedValueForTextBox("searchUserBar"));
$("#search-user-dropdown").val(getSavedValueForDropDown("search-user-dropdown"));


function saveValue(e){
    let id = e.id;  // get the sender's id to save it .
    let val = e.value; // get the value.
    localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override .
}

function getSavedValueForTextBox  (v){
    let usersPropertyParam = new URL(location.href).searchParams.get('usersProperty');
    if (localStorage.getItem(v) === null) {
        return "";// You can change this to your defualt value.
    }
    else if(usersPropertyParam === null){
        return "";
    }

    return localStorage.getItem(v);
}

function getSavedValueForDropDown(v){
    let propertyValue = new URL(location.href).searchParams.get('propertyValue');
    if (localStorage.getItem(v) === null) {
        return "ID";// You can change this to your defualt value.
    }
    else if(propertyValue === null){
        return "ID";
    }

    return localStorage.getItem(v);
}
//=================================================================================================
//endregion

function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("user-table");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
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
                //if user clicks on id column, compare numbers
                if (n === 0) {
                    //compare numbers
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                //if user clicks on id column, compare numbers
                if (n === 0) {
                    //compare numbers
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch === true) {
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

//Search users on enter key pressed too
$("#searchUserBar").keypress(function (event) {
    if (event.which === 13) {
        searchUserByProperty();
    }
});