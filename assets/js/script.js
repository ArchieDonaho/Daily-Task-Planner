//define the array to store the events
var myEvents = [];

//display roday's date on the jumbotron
var currentDay = $("#current-day");
currentDay.text(moment().format("dddd, MMMM Do YYYY"));

//generate the colored time blocks
var setStatus = function() {

}

//check the status of the hour
var checkStatus = function(){
    //create an array for each time block
    var timeBlockArray = jQuery.makeArray($(".time-block"));
    
    //create a variable for the current hour
    var currentTime = moment().format("H");
    
    //compare each time value to the current time
    //loop through the timeblockarray array
    $.each(timeBlockArray, function(index, item){
        // console.log($(timeBlockArray[index]).attr('id'));

        if(currentTime > ($(timeBlockArray[index]).attr('id'))){
            // console.log("the current time is after");
            $(timeBlockArray[index]).addClass("bg-secondary");
        } 
        else if(currentTime == ($(timeBlockArray[index]).attr('id'))){
            // console.log("the current time is now");
            $(timeBlockArray[index]).addClass("bg-warning");
        } 
        else if(currentTime < ($(timeBlockArray[index]).attr('id'))){
            // console.log("the current time is before");
            $(timeBlockArray[index]).addClass("bg-success");
        }
    })
}

var createEvents = function(index, item){
    //obtain all elements with ".time-task" and assign them to an array
    var timeBlockArray = jQuery.makeArray($(".time-task"));

    //assign the item to the selected index
    $(timeBlockArray[index]).text(item);
}

//loads the events into the timeblocks when called upon
var loadEvents = function(){
    //load the events back into the array
    myEvents = JSON.parse(localStorage.getItem("events"));

    //if there is no events saved, generate a new event
    if(!myEvents){
        myEvents = [];
    }

    // for each index in the array...
    $.each(myEvents, function(index, item) {
        //generate the events
        createEvents(index, item);
    });

    
}

//saves the myevents array when called upon
var saveEvents = function(){
    localStorage.setItem("events", JSON.stringify(myEvents));
    console.log("accessed save")
}


//edit the task by clicking the textbox
$(".time-block").on("click", ".time-task", function(){
    //retireve the current text
    var text = $(this).text().trim();
    console.log("text retrieved: " + text);
    
    //create a textarea class
    var textInput = $("<textarea>");
    textInput.addClass("col-10").val(text);

    //replace the div with the textarea
    $(this).replaceWith(textInput);

    //add focus to the box automatically
    textInput.trigger("focus");
});
//upon leaving the textarea, revert it back into a div
$(".time-block").on("blur", "textarea", function(){
    //retireve the newly added text
    var text = $(this).val().trim();
    console.log("text added: " + text);

    //create the div class
    var container = $("<div>");
    container.addClass("col-10 time-task d-flex justify-content-center align-items-center").text(text);

    //replace the textarea with the newly added text
    $(this).replaceWith(container);
});


//save the task upon clicking the save icon
$(".time-block").on("click", "img", function(){
    // obtain the textbox
    var textBlock = $(this).parent().siblings(".time-task");
    console.log(textBlock.text());
    //get the text within the textbox
    var task = textBlock.text();
    console.log("the task is " + task);

    //obtain the index
    var index = textBlock.parent().index();
    console.log("the index is " + index);

    //assign it to the array
    myEvents[index] = task;

    //then save the array
    saveEvents();

    
    checkStatus();

});

//load the task upon page load
loadEvents();

checkStatus();

