var buttonColours = ["red", "blue", "green", "yellow"];
var sounds = [
    new Audio("./sounds/red.mp3"),
    new Audio("./sounds/blue.mp3"),
    new Audio("./sounds/green.mp3"),
    new Audio("./sounds/yellow.mp3"),
    new Audio("./sounds/wrong.mp3")
];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function (e) {
    if (!started) {
        nextSequence();
        started = true;
    }
});


function nextSequence() {
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    level++;
    $("h1#level-title").text("Level " + level);

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function (i) {
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, i * 500, i);
    }

}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour);

})

function playSound(name) {
    var index = buttonColours.indexOf(name);
    sounds[index].play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (arrayEqual(gamePattern, userClickedPattern)) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence()
            }
                , 1000)
        }
    }
    else {
        sounds[4].play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);

        $("h1#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function arrayEqual(a, b) {
    for (var i = 0; i < b.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = []
}