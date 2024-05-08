$(document).ready(function() {
    let currentQuestion = 0;
    const totalQuestions = $('.video-question').length;
    const correctAnswers = ["Curveball", "Curveball", "Two-Seam", "Changeup", "Two-Seam", "Changeup", "Slider", "Slider", "Four-Seam", "Four-Seam"];
    let score = 0;
    let answeredCorrectly = Array(totalQuestions).fill(false);  // Tracking correct answers

    $('.video-question').eq(currentQuestion).show();
    updateNavigationButtons();

    window.checkAnswer = function(selector, index) {
        let selectedValue = $(selector).val();
        let feedbackDiv = $(selector).next('.feedback');
        if (selectedValue === correctAnswers[index]) {
            feedbackDiv.text('Correct!').css('color', 'green');
            answeredCorrectly[index] = true;
        } else {
            feedbackDiv.text('Incorrect.').css('color', 'red');
            answeredCorrectly[index] = false;
        }
    };

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
        score = answeredCorrectly.filter(isCorrect => isCorrect).length;
        $('#quiz-result').html(`<h3>Your Score: ${score} out of ${totalQuestions}</h3>`);
        $('.video-question').hide();
        $('#prevBtn').hide();
        $('#nextBtn').hide();
        $('#submitBtn').hide();
    };

    function updateNavigationButtons() {
        $('#prevBtn').toggle(currentQuestion > 0);
        $('#nextBtn').toggle(currentQuestion < totalQuestions - 1);
        $('#submitBtn').toggle(currentQuestion === totalQuestions - 1);
        $('#currentQuestionNumber').text(currentQuestion + 1);
    }
});
