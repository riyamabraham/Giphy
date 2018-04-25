var animals = ["Cat", "Lion", "Tiger","pigeon","bird","frog","cow","goat","pig","wolf","dinosaur","skunk","sheep"];
var gifcount = 0;
var gifLocation;
var clickCount = 0;

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#animals").empty();
        console.log(response);
        
        for (var i = 0; i < response.data.length; i++) {
           // gifcount = gifLocation;

            var animalDiv = $("<div class='unit' data-state='still'>");
            var p = $("<p>");
            p.text("Rating : " + response.data[i].rating);
            var animalImage = $("<img id='animalImage'>");
            animalImage.attr("src", response.data[i].images.fixed_height_still.url);
            animalImage.attr({ 'data-animate': response.data[i].images.fixed_height.url });
            animalImage.attr({ 'data-state': "still" });
            animalImage.attr({ 'data-still': response.data[i].images.fixed_height_still.url });
            // animalImage.attr("src", response.data[i].images.fixed_height_still.url);
            animalDiv.append(p);
            animalDiv.append(animalImage);
            animalDiv.append(gifLocation);

           // gifcount++;

            $("#animals").prepend(animalDiv);
        

        animalImage.on("click", function () {

            console.log("iam clicked");
            var state = $(this).attr('data-state');
            console.log(state);

            if (state === "still") {
                
                $(this).attr("src", $(this).attr("data-animate"));
                console.log(this);
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                console.log(this);
                $(this).attr("data-state", "still");
            }
            //clickCount++;
        });
    }

    });
}
// Function for displaying animal data
function renderButtons() {

            // Deleting the animals prior to adding new animals
            // (this is necessary otherwise you will have repeat buttons)
            $("#animalButton").empty();

            // Looping through the array of movies
            for (var i = 0; i < animals.length; i++) {
                console.log(animals.length);

                // Then dynamicaly generating buttons for each animal in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<button>");
                // Adding a class of movie-btn to our button
                a.addClass("animal-btn");
                // Adding a data-attribute
                a.attr("data-name", animals[i]);
                // Providing the initial button text
                a.text(animals[i]);
                // Adding the button to the buttons-view div
                $("#animalButton").append(a);
            }
            $("#animal-input").val('');

        }

// This function handles events where a animal button is clicked
$("#addanimal").on("click", function (event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var animal = $("#animal-input").val().trim();

            // Adding movie from the textbox to our array
            animals.push(animal);

            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
        });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".animal-btn", displayAnimalInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

