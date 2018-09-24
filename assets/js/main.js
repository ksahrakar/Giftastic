
var api_key = "R9dyDzD5AFmrzh6cOKVjf7TBTQOh9rzg";
var queryURL = [];
var clickedMood;
var state="still";

// Premade mood buttons in array
var moods = ["happy","sad","mad","loving"];
for (j=0;j<(moods.length);j++){
    $("#btn-place").prepend($("<button>").attr("id",("btn-"+j)));
    //label each button
    $("#btn-"+j).text(moods[j]).attr("class","clickable");
    //add a value to each button corresponding to its location in array
    $("#btn-"+j).text(moods[j]).attr("value",j);
    //create search url for each button
    queryURL[j]="https://api.giphy.com/v1/gifs/search?q="+moods[j]+"&api_key="+api_key+"&limit=10";
};

// make buttons clickable
$(".clickable").on("click",function(){
    clickedMood = $(this).attr("value");

    // Make query through API and prepend gif's and ratings
    $.ajax({
        url: queryURL[parseInt(clickedMood)],
        method: "GET"
    }).then(function(response){
        //console.log(response);
        for (i=0;i<10;i++){
            var gifClabel = "["+clickedMood+"]["+i+"]";
            //var gifLocation = "g"+gifClabel;
            $("#container").prepend($("<div>").attr({class:"gif",id:gifClabel}));
            var giphURLa = response.data[i].images.downsized_medium.url;
            //$("#gifs").prepend("<img src="+giphURLa+" width=200px height=200px>");
            var giphURLs = response.data[i].images.downsized_still.url;
            $("#gifs").prepend("<img class=pic src="+giphURLs+" data-animate="+giphURLa+" data-still="+giphURLs+" data-state="+state+">");
            var giphRating = response.data[i].rating;
            var giphTitle = response.data[i].title;
            //$("#"+gifClabel).text("hi there")
            $("#gifs").prepend($("<h6>").text("Title: "+giphTitle));
            $("#gifs").prepend($("<h6>").text("Rating: "+giphRating));
        }
    });
});

// toggle animation on click
$(".pic").on("click",function(){
    console.log("pic clicked");
    localState=$(this).attr("data-state");
    console.log(localState);

    if(localState==="still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//