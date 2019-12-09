# BookLookUp 
<p>This project is a search engine which allows users to search for books or authors of their choice.
The search results return a picture of the book, the books title, the books author, an average rating 
(out of 5) for the book and a description of the book where available. The project makes use of the Google Books API to 
achieve this result.</p>

## UX
<p>This site is designed for people who are interested in reading books and would like to find out some information
on the books they are planning to read before reading them.
As a user, I want to get some information on a particular book. This is done by typing in the name of the book and the results
for the book will show the title, author, average rating, description and picture of the book.
As a user, I want to find out some book titles of a particular author, which I would achieve by typing the authors name 
into the searchbar. The results will contain multiple books which that author has written.
As a user, I want to find what the average rating of a book is. This is achieved by typing in the name of the book and the 
results will show an average rating for the book.
As a user, I want to read some book descriptions for various books. This is done by typing a search query into the searchbar
and the results will have descriptions for the results.
The site is also designed towards people who may be looking for recommendation for books to read which I have included in 
the navigation bar of the page. All the navigation headings lead to corresponding Amazon book pages containing book recommendations.
As a user, I want to find some newly released books which I can achieve by clicking on the New Releases header in the navigation
bar which will take me to Amazons list of newly released books.
As a user, I want to find some books which are best sellers. I can achieve this by clicking on the Best Sellers header in 
the navigation bar which will take me to a list of Amazons best selling books.
As a user, I want to find a good book released this month which I can achieve by clicking on the Book of the Month header
in the navigation bar which will take me to a page containing Amazons book of the month.</p>

### Wireframes

#### Before searching for anything
![image](static/img/wireFrame/home.png)

#### After searching for something
![image](static/img/wireFrame/afterSearch.png)
<br>
I chose the background image as a cartoon-like library with an open space in between two bookshelves. I chose this as I
thought the open space in between the two bookshelves would look good bordering the search results output and thought the 
colors of the image really suited the purpose of the website.
When the search results are returned these search results are output onto the open space between the two bookshelves which
frames the search results. 
Before doing the search, there is a quote from Dr. Seuss which highlights an advantage of reading.
Once the search function is in progress, this quote disappears from the screen and the search bar area jumps to the top of 
the screen. 
I chose to have 10 book results per page with each book area containing the title, author, description, picture and rating
for the book. When the user selects either the previous or next page the screen scrolls to the top of the list again
allowing ease of use.
I decided to put pagination buttons on both the top and bottom of the search results area due to if sanyone seen a book they
liked but then went to the next page, if the pagination buttons were only at the bottom they would have to
scroll down the entire page to select the previous page button.
The pagination buttons change font and background color with a smooth transition when they are hovered over and the mouse
cursor also changes to a pointer. 

