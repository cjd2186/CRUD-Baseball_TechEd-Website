function submitQuiz() {
    var answers = [];
    $('.pitch-select').each(function() {
        answers.push($(this).val());
    });

    // Placeholder logic for checking answers
    // In reality, you might have a server-side check or a more complex client-side validation
    var correctAnswers = ["Curveball", "Curveball", "Four-Seam", "Four-Seam", "Changeup", "Changeup", "Slider", "Slider", "Two-Seam", "Two-Seam"];  // Example correct answers
    var score = 0;
    for (var i = 0; i < answers.length; i++) {
        if (answers[i] === correctAnswers[i]) {
            score++;
        }
    }

    $('#quiz-result').html('<h3>Your Score: ' + score + ' out of ' + correctAnswers.length + '</h3>');
}

$(document).ready(function() {
    // You might want to randomize the order of the videos or options here
});
