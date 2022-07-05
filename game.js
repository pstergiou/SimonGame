
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("game: " + gamePattern);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    

}


function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("correct");
    if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    
}else{
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function (){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game over, press any key to start");
    startOver();
}
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
      
}


function animatePress(name){
$("#"+name).addClass("pressed");
setTimeout(function (){
    $("#"+name).removeClass("pressed");
},100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


$(".btn").click(function(e){
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    console.log("user " +userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1)


    
});



$(document).keypress(function (e){
    if(!started){
    
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
    }
});