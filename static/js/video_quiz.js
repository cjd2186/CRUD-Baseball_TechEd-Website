$(document).ready(function() {
    let currentQuestion = 0;
    const totalQuestions = $('.video-question').length;
    $('.video-question').eq(currentQuestion).show();

    updateNavigationButtons();

    window.prevQuestion = function() {
        if (currentQuestion > 0) {
            $('.video-question').eq(currentQuestion).hide();
            currentQuestion--;
            $('.video-question').eq(currentQuestion).show();
            updateNavigationButtons();
        }
    };

    window.nextQuestion = function() {
        if (currentQuestion < totalQuestions - 1) {
            $('.video-question').eq(currentQuestion).hide();
            currentQuestion++;
            $('.video-question').eq(currentQuestion).show();
            updateNavigationButtons();
        }
    };

    window.submitQuiz = function() {
        var answers = [];
        $('.pitch-select').each(function() {
            answers.push($(this).val());
        });

        var correctAnswers = ["Changeup", "Changeup", "Curveball", "Curveball", "Four-Seam", "Four-Seam",  "Slider", "Slider", "Two-Seam", "Two-Seam"];
        var score = 0;
        for (var i = 0; i < answers.length; i++) {
            if (answers[i] === correctAnswers[i]) {
                score++;
            }
        }

        $('#quiz-result').html('<h3>Your Score: ' + score + ' out of ' + correctAnswers.length + '</h3>');
        $('.video-question').hide();
        $('#prevBtn').hide();
        $('#nextBtn').hide();
        $('#submitBtn').hide();
    };

    function updateNavigationButtons() {
        $('#prevBtn').toggle(currentQuestion > 0);
        $('#nextBtn').toggle(currentQuestion < totalQuestions - 1);
        $('#submitBtn').toggle(currentQuestion === totalQuestions - 1);
    }
});
