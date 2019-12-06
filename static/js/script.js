//jQuery
$(document).ready(function() {
// Code to hide loader GIF once search button is clicked
    $(".btn-primary").click(function() {
        $("#loader").css("visibility","hidden")
        $(".quote").fadeOut("fast")
        $(".hiddenUntil").css("visibility", "visible")
        $("#pagination_id").css("visibility", "visible")
    })
// Following code was taken from stack overflow:
// https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box    
    $("#searchField").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchClick").click();
    }
});
})

var _maxResults = 10;
var _startIndex = 0;

//Code to show gif while user is typing into search field
function loader() {
    $("#output").html(
        `<div id="loader">
            <img src="static/css/loader.gif" alt="loading..." />
        </div>`);
}

//Code which allows a user to search for a book and see the results returned by the Google Books API
function getBookInfo() {
  //Text typed into searchbox is assigned to the itemSearch variable
  var itemSearch = $("#searchField").val();
  //If nothing is typed into the search field when button is clicked the user will be prompted to type a book name
  if (!itemSearch) {
    alert ("Please enter a Book Name")
  return;
  }
  // When Statement with Google Books API address
  $.when(
    $.getJSON(`https://www.googleapis.com/books/v1/volumes?q=${itemSearch}&startIndex=${_startIndex}&maxResults=${_maxResults}`  )
  ).then( 
    function(response)   {
// Assigning JSON data to the variable bookData and sending this response to iterate function which goes through the array
// returned and created HTML out of it which is then used in this function.
      var bookData = response;
      $("#output").html(iterate(bookData))
;
    }, function(errorResponse) {
//If the JSOn response is 404 the user will be informed that there is no book found for their search
            if (errorResponse.status !== 200) {
                $("#output").html(
                    `<h2>No Book found for ${itemSearch}</h2>`);
            } else {
// If the error is any other code the user will be informed there is an error using the built in error response of the JSON file
                console.log(errorResponse);
                $("#output").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

// Code which iterates throug the response array and assigns the array to HTML code 
function iterate(bookInfo){
  if (bookInfo.length == 0)
  // if the JSON response array doesnt exist the user the be informed that there are no books matching the search 
  {
    return `
    <div>
     <h4> No books matching that search.</h4>
    </div>`;
  }
    var list = bookInfo.items.map(function(list) {
      
        list.volumeInfo.averageRating = list.volumeInfo.averageRating || 
        'No Ratings for this Book yet.';
        return `
        <div class ="arrayReturn">
        <div class = "bookPic col-sm-12 col-lg-2">
          <img src ="${list.volumeInfo.imageLinks.thumbnail}" alt = "No Picture found for this Book"/>
        </div>
        <div class = "row titleSection">
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
   
    return `${list}`
    
}

function load_next_page() {
  _startIndex+=_maxResults+1;
  return getBookInfo();
}