function loader () {
      $("#output").html(
        `<div id="loader">
            <img src="static/css/loader.gif" alt="loading..." />
        </div>`);
}


function getBookInfo() {
  //Text typed into searchbox is assigned to the itemSearch variable
  var itemSearch = $("#searchField").val();
  //If nothing is typed into the search field when button is clicked the user will be prompted to type a book name
  if (!itemSearch) {
        alert ("Please enter a Book Name")
        return;
    }

}