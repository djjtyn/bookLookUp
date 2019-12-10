//jQuery
$(document).ready(function () {
  $(".btn-primary").click(function () {
    $("#loader").css("visibility", "hidden")
    $(".quote").fadeOut("fast")
    $(".hiddenUntil").css("visibility", "visible")
  }) 
// Code above to hide loader GIF, quote image and show search results area until search query is submitted
  
$("#searchField").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#searchClick").click();
      }
    }); 
// Code above taken from  https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
// Used to allow enter key to have the same function as search button
})

var _maxResults = 10;
var _startIndex = 0;
//Variables above to be used for JSON url. _startIndex  inside functions

function loader() {
  $("#output").html(`
    <div id="loader">
      <img src="static/css/loader.gif" alt="loading..." />
    </div>`
);} 
//Code above to show gif while user is typing into search field

function getBookInfo() {
  var itemSearch = $("#searchField").val(); //Text typed into searchbox is assigned to the itemSearch variable
  if (!itemSearch) {
    alert("Please enter a Book Name") //If nothing is typed into the search field when button is clicked the user will be prompted to type a book name
    return;
  }
  $.when(  //When Statement with Google Books API address
    $.getJSON(`https://www.googleapis.com/books/v1/volumes?q=${itemSearch}&startIndex=${_startIndex}&maxResults=${_maxResults}`)
  ).then(
    function (response) {
      var bookData = response; //JSON response assigned to variable bookData
      $("#output").html(iterate(bookData));},//bookData variable used as argument for iterate function
      function (errorResponse) {  //Error handling
        if (this.readyState == 4 && this.status == 200) {
          $("#output").html(`
          <h2 class="searchHeader">
            No Book found for ${itemSearch}
          </h2>`);}
        else {  // If the error is any other code the user will be directed back to starting page
          console.log(errorResponse);
            $("#output").html(`
            <h2 class = "searchHeader">
              Error: Please try another search by clicking on the book icon in the navigation bar
            </h2>`);}
       });
  return;
} 
//Code above to get JSON data from API, send data to iterate function to then add to the HTML document and to  handle errors 
 
function iterate(bookInfo) {
  if (bookInfo.length == 0){  // if there is no data return that theres no books matching the search
    return `
      <div>
       <h4> No books matching that search.</h4>
      </div>`;}
 var list = bookInfo.items.map(function (list) { // for each loop which handles undefined responses
  list.volumeInfo.description = list.volumeInfo.description ||'No description available for this book yet';
  list.volumeInfo.averageRating = list.volumeInfo.averageRating ||'No Ratings for this Book yet.';
  return ` 
    <div class ="arrayReturn">
      <div class = "bookPic col-sm-12 col-lg-2">
        <img src ="${list.volumeInfo.imageLinks.thumbnail}" alt = "No Picture found for this Book"/>
      </div>
      <div class = "row">
        <ul class = "col-sm-12 col-lg-10">
          <li class = "title">
            <h6>Title: ${list.volumeInfo.title}</h6>
          </li>
          <li class = "author">
            <h6>Author(s): ${list.volumeInfo.authors}</h6>
          </li>
          <li class = "rating">
            <p>Rating: ${list.volumeInfo.averageRating}</p>
          </li>
        </ul>
      </div>
      <div class="desc">
        ${list.volumeInfo.description}
      </div>
    </div>`
    })
    if (_startIndex == 0){
      return `
        <div id="pagination_id">
          <button class="nxt" onclick="timedNextLoad()">Next Page</button>
        </div>
        <div class="searchHeader">
          <h2>Search Results</h2>
        </div>
        ${list}
        <div id="pagination_id">
          <button class="nxt" onclick="timedNextLoad()">Next Page</button>
        </div>`} 
    else return `
        <div id="pagination_id">
          <button class="nxt" onclick="timedNextLoad()">Next Page</button>
          <button class="prev" onclick="timedPrevLoad()">Previous Page</button>
        </div>
        <div class="searchHeader">
          <h2>Search Results</h2>
        </div>
        ${list}
        <div id="pagination_id">
          <button class="nxt" onclick="timedNextLoad()">Next Page</button>
          <button class="prev" onclick="timedPrevLoad()">Previous Page</button>
        </div>`
}
//Code above to iterate through the API response array and format HTML output

function timedNextLoad() {
  setTimeout(load_next_page, 500)
  setTimeout(scrollToTop, 1000)
}
//Code above to set timeouts for both the loading of the page and the scroll to the top of the list after the next button is clicked

function timedPrevLoad() {
  setTimeout(load_prev_page, 500)
  setTimeout(scrollToTop, 1000)
}
//Code above to set timeouts for both the loading of the page and the scroll to the top of the list after the previous button is clicked

function scrollToTop() {
  window.scrollTo(0, 0);
}
//Code above to scroll to the top of the page

function load_next_page() {
  _startIndex += _maxResults + 1;
  return getBookInfo();
}
//Code above to load the next page after next is clicked

function load_prev_page() {
  _startIndex = _startIndex - _maxResults - 1;
  return getBookInfo();
}
//Code above to load the previous page after previous is clicked


