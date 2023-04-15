let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

// keypress to start the game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// every click: push userClickedPattern, play sound, play animation, check answer
$(".btn").on("click", function (event) {
  let userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Array starts at index 0
  checkAnswer(userClickedPattern.length - 1);
});

// Check Answer at every click
function checkAnswer(currentLevel) {
  // Check if current level is correct
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check if all answer correct
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // wrong answer
    $("body").addClass("game-over");
    playSound("wrong");
    $("h1").text(`Game Over, Press Any Key to Restart`);

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

/**
 * Flash a new color every time
 */
function nextSequence() {
  // empty userClickedPattern when starting next sequence
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  // flash the random color
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// playsound

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// animation

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");

  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
