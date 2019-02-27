#Air bnb Design

* Component tree

    * Header
        
    * Homepage 
        * State - Editors pick array, search results array, search input.
        * Filter
        * Editors Pick

    * Search Results
        * State - Search results array
        * SideBar
        * Main

    * House
        * State - Booking date, booked dates. 
        * Props - House details from DB
        * Book panel (props - price)
        * Reviews 
        * Similar Listings
    * Footer



* db schema

   ``` json
    {
    "id": 1,
    "latitude": 9.9153112,
    "longtitude": 123.6091507,
    "image": "http://dummyimage.com/235x188.jpg/dddddd/000000",
    "rating": 89,
    "price": 1287,
    "description": "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
    "reviews": [
      {
        "review": "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        "rating": 3
      }
    ],
    "booked": 4,
    "amenities": "phasellus sit amet erat nulla tempus vivamus in felis",
    "rooms": [
      {
        "beds": 2,
        "bathroom": 2,
        "guests": 9
      }
    ],
    "host": "Koren Heibel",
    "hostinfo": "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum."
    ```


* rest api

|method|url|request body params|response body|
|:---:|:---:|:---:|:---:|
|GET|/houses/|`none`|db|
|GET|/houses/:id|`none`|`{single record}`|
|POST|/houses/:id/book|`{startDate,endDate,guests}`|success / fail|
|POST|/houses/:key|`none`| `{single record}`|