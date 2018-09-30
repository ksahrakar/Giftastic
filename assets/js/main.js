
var api_key = "R9dyDzD5AFmrzh6cOKVjf7TBTQOh9rzg";
var queryURL = [];
var clickedMood;
var state="still";
var numOfGifs = 10;

// Premade mood buttons in array
var moods = ["happy","sad","mad","loving"];

for (j=0;j<(moods.length);j++){
    $("#btn-place").prepend($("<button>").attr("id",("btn-"+j)));
    //label each button
    $("#btn-"+j).text(moods[j]).attr("class","clickable btn btn-secondary");
    //add a value to each button corresponding to its location in array
    $("#btn-"+j).text(moods[j]).attr("value",j);
    //create search url for each button
    queryURL[j]="https://api.giphy.com/v1/gifs/search?q="+moods[j]+"&api_key="+api_key+"&limit="+numOfGifs;
};

// make buttons clickable
$(document.body).on("click",".clickable",function(){

    clickedMood = $(this).attr("value");

    // Make query through API and prepend gif's and ratings
    $.ajax({
        url: queryURL[parseInt(clickedMood)],
        method: "GET"
    }).then(function(response){
        //console.log(response);
        for (i=0;i<numOfGifs;i++){
            var gifClabel = "["+clickedMood+"]["+i+"]";

            var giphURLa = response.data[i].images.fixed_width.url;
            
            var giphURLs = response.data[i].images.fixed_width_still.url;
            var giphRating = response.data[i].rating;
            var giphTitle = response.data[i].title;

            var newElement = $("<span>").attr({class:"gif",id:gifClabel})
            
            newElement.prepend("<img class='pic' src="+giphURLs+" data-animate="+giphURLa+" data-still="+giphURLs+" data-state="+state+">");
            
            newElement.prepend($("<h6>").text(giphTitle));
            newElement.prepend($("<h6>").text("Rating: "+giphRating));

            $("#container").prepend(newElement);
            //$("#"+gifClabel).text("hi there")
        }
    });
});

// toggle animation on click
$(document.body).on("click",".pic",function(){
    localState=$(this).attr("data-state");

    if(localState==="still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// add a new mood
$("#newMoodBtn").on("click", function() {
    //get value of input field and add to array
    // numOfGifs = $("#resultNum").attr("value");
    // console.log(numOfGifs);
    y=moods.length;
    var x = $("#newMood").val();
    moods.push(x);
    $("#btn-place").prepend($("<button>").attr("id",("btn-"+y)));
    $("#btn-"+y).text(moods[y]).attr("class","clickable btn btn-secondary");
    $("#btn-"+y).text(moods[y]).attr("value",y);
    queryURL[y]="https://api.giphy.com/v1/gifs/search?q="+moods[y]+"&api_key="+api_key+"&limit="+numOfGifs;

})
