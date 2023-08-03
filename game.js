//Step 5--->
var gamePattern = [];


//Step 3 arrey
var buttonColor = ["red", "blue", "green", "yellow"];

//userClickedPattern
var userClickedPattern = [];

var started = false;

var level = 0;

//keypress
$(document).on("keypress" , function(event){
  if (event.key==="a") {
    $("#level-title").text("Level " + level);
    nextSequence();

  }
 
});
//click
$("h1").on("click", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").on("click",handler);

function handler(){
  $(".btn").on("click", function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

 var userChosenColour = $(this).attr("id");

 userClickedPattern.push(userChosenColour);

 playSound(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length-1);

}
function checkAnswer(currentLevel ){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    console.log("success");

  if (userClickedPattern.length === gamePattern.length){

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}
else if (userClickedPattern[currentLevel]!=gamePattern[currentLevel]) {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);
  $("h1").text("Game-Over press any key to start");
  startOver();
}else {
    console.log("wrong");
  }

}



// function of random number
function nextSequence(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber= Math.floor(Math.random()*4);

  //step 4::---
  var randomChosenColor = buttonColor[randomNumber];

  //Step 6:--->
  gamePattern.push(randomChosenColor);

  //select random color with same id
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //play sound:--->
  playSound(randomChosenColor);

}


function playSound(name){
  //play sound:--->
  var audio = new Audio("sounds/" + name +  ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
   gamePattern = [];
   started = true;


}
