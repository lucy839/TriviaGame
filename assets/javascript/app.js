// global variables
var qNA = {
    one: {
        question: "In Peter Pan, Captain Hook had a hook on which one of his hands?",
        theAnswer: "1",
        answers: ["left", "right", "no hook", "elbow", "shoulder"],
        image: "assets/images/captainhook.gif"
    },
    two: {
        question: "In Dumbo, where is Mrs. Jumbo when the stork delivers baby?",
        theAnswer: "3",
        answers: ["At home", "At hospital", "In the circus train", "In the circus tent", "In the garden"],
        image: "assets/images/dumbo.gif"
    },
    three: {
        question: "Who is Princess Aurora's prince? ",
        theAnswer: "2",
        answers: ["Prince Eric", "Prince Phillip", "Prince Charming", "Aladdin", "Beast"],
        image: "assets/images/princessaurora.gif"
    },
    four: {
        question: "Cinderella's glass slipper fell of which foot?",
        theAnswer: "1",
        answers: ["Left foot", "right foot"],
        image: "assets/images/cinderella.gif"
    },
    five: {
        question: "Who is Snow white's prince?",
        theAnswer: "5",
        answers: ["Prince Philip", "Prince Charming", "Prince Naveen", "Prince Eric", "Prince Florian"],
        image: "assets/images/snowwhite.gif"
    },
    six: {
        question: "What is Simba's mother's name?",
        theAnswer: "4",
        answers: ["Chief Tui", "Mother Gothel", "Agnarr", "Sarabi", "Ms.Davis"],
        image: "assets/images/sarabi.gif"
    },
    seven: {
        question: "What is Boo's real name?",
        theAnswer: "3",
        answers: ["Belle", "Julie", "Mary", "Sarah", "Emily"],
        image: "assets/images/boo.gif"
    },
    eight: {
        question: "How many brothers does Prince Hans have?",
        theAnswer: "2",
        answers: ["8", "12", "2", "11", "5"],
        image: "assets/images/princehans.gif"
    },
    nine: {
        question: "Which character has the fewest number of lines in a Disney film?",
        theAnswer: "2",
        answers: ["Donald Duck", "Dumbo", "Mickey Mouse", "Winnie the Pooh", "Olaf"],
        image: "assets/images/dumbo2.gif"
    },
    ten: {
        question: "Do you like disney?",
        theAnswer: "1",
        answers: ["yes", "no"],
        image: "assets/images/disney.gif"
    }
}
var questionNumber = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
var questionNum;
var count;
var currentQuestion;
var correct;
var wrong;
var time;
var intervalId;
var ans;
var ans1;
var ans2;
// set timer
function run() {
    time = 10;
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    $("#time-left").show();
    $("#time-left").html("00:10");
}
function decrement() {
    time--;
    if (time < 10) {
        $("#time-left").html("00:0" + time);
    } else {
        $("#time-left").html("00:" + time);
    }
    if (time === 0) {
        stop();
        $("#status").show();
        $("#status").text("Times Up!");
        displayAnswer();
        count++;
        setTimeout(nextQuestion, 1000);
    }
}
function stop() {
    clearInterval(intervalId);
    // clearing out the choices
    ans1.attr("name", "");
    $("#answerChoices").empty();
}

// when game starts..
function nextQuestion() {
    $("#image-holder").hide();
    // move on to next question
    questionNum++;
    // if we passed the last question
    if (questionNum > questionNumber.length) {
        // display report
        report();
    // else run the clock and game
    } else {
        run();
        $("#status").hide();
        $("#correct").hide();
        currentQuestion = questionNumber[count];
        $("#question").show();
        $(".form-check").show();
        $("#answerChoices").show();
        // show question
        $("#question").text(qNA[currentQuestion].question);
        // gives options
        for (var i = 0; i < qNA[currentQuestion].answers.length; i++) {
            ans = $("<div>");
            ans1 = $("<input>");
            ans1.addClass("form-check-input");
            ans1.attr("type", "radio").attr("name", "inlineRadioOptions");
            ans1.attr("value", i + 1);
            ans2 = $("<label>");
            ans2.attr("id", "a" + (i + 1));
            ans2.text(qNA[currentQuestion].answers[i]);
            $("#answerChoices").append(ans).append(ans1).append(ans2);
        }
        // wheen one of options is clicked
        $(".form-check-input").on("click", function () {
            stop();
            var userGuess = $(this);
            userGuess = $(userGuess).attr("value");
            currentQuestion = questionNumber[count];
            // if answer correct within timer
            $("#correct").show();
            if (userGuess === qNA[currentQuestion].theAnswer) {
                // congratuate, then move on to next questions
                set();
                $("#correct").text("That is correct!");
                $("#image-holder").show();
                $("#image-holder").html("<img src=" + qNA[currentQuestion].image + " width='400px'>");
                // move on to next question
                count++;
                correct++;
                setTimeout(nextQuestion, 1000);
            }
            // if answer is wrong within timer
            else {
                // let user know that it is a wrong answer, show correct answer, then move on to next questions
                $("#correct").text("You chose the wrong answer!");
                displayAnswer();
                count++
                wrong++;
                setTimeout(nextQuestion, 1000);
            }
        });
    }
}

// display correct answer
function displayAnswer() {
    set();
    $("#correct").show();
    var answer = (qNA[currentQuestion].theAnswer) - 1;
    $("#correct").append("<br> Correct answer is " + qNA[currentQuestion].answers[answer]);
    $("#image-holder").show();
    $("#image-holder").html("<img src=" + qNA[currentQuestion].image + " width='400px'>");
}

// report on final screen
function report() {
    set();
    $("#correct").hide();
    $("#report").show();
    $("#report").append("You answered " + correct + " questions right! \<br>");
    $("#report").append("You answered " + wrong + " questions wrong! \<br>")
    if (correct >= 8) {
        $("#report").append("You are a DISNEY MASTER!");
        $(".fa-crown").show();
        $('#play')[0].src = "https://www.youtube.com/embed/barWV7RWkq0?autoplay=1";
    } else {
        $("#report").append("Try again! You are not a DISNEY MASTER yet!");
    }
    $("#restart").show();
}

// reset to game mode
function reset() {
    $("#start").hide();
    $("#instruction").hide();
    $("#report").empty();
    $("#report").hide();
    $("#restart").hide();
    $(".fa-crown").hide();
    correct = 0;
    wrong = 0;
    count = 0;
    questionNum = 0;
    currentQuestion = questionNumber[count];
    $('#play')[0].src = "https://www.youtube.com/embed/";
    set();
    nextQuestion();
}

// when displaying result
function set() {
    $("#question").hide();
    $("#answerChoices").hide();
    $("#time-left").hide();
}

// actual
$(document).ready(function () {
    $("#restart").hide();
    $("#report").hide();
    $(".form-check").hide();
    $(".fa-crown").hide();
    $("#start").on("click", reset);
    $("#restart").on("click", reset);
});
