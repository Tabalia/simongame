//array to hold the button colours
var buttonColours = ["red", "blue", "green", "yellow"];
//array to store the pattern of highlighted buttons for the user to follow
var gamePattern = [];

//array to store the pattern of user-selected buttons
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//detect which button the user clicks
$(".btn").click(function() {

  //stores the id of user-selected button
  var userChosenColour = $(this).attr("id");
  //stores the pattern of user-selected buttons into userClickedPattern array
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    //what do do when user fails
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("OG you fail! Press Any Key to Restart");

    startOver();
  }


}

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  //generate nummbers randomly
  var randomNumber = Math.floor(Math.random() * 4);
  //assign the generated number to elements in buttonColours array
  var randomChosenColour = buttonColours[randomNumber];
  //stores the pattern of randomly highlighted buttons into gamePattern array
  gamePattern.push(randomChosenColour);

  //select a random button and make it flash and play its designated sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}