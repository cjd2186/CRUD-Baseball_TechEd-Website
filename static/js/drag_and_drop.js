// drag_and_drop.js
$(document).ready(function () {
    var score = 0;
    var totalPitches = $('.drag-pitch').length;

    // Check if all pitches have been matched
    function checkCompletion() {
        if ($('.drag-pitch.ui-draggable-disabled').length === totalPitches) {
            // All pitches matched
            $('#score-board').append(`<p><strong>You scored ${score} out of 5</strong></p>`);
            
            if (score === 5) {
                $('#score-board').append(`<p><strong>Ready to move onto the next section?</strong></p>`);
                $('#score-board').append(`<button onclick="window.location.href='/part2'">Go to Part 2</button>`);
            } else {
                $('#score-board').append(`<p><strong>Want to try again?</strong></p>`);
                $('#score-board').append(`<button onclick="window.location.reload()">Try Again</button>`);
            }
        }
    }
    // Update total pitches on the score board
    $('#total-pitches').text(totalPitches);

    // Make the pitch names draggable
    $('.drag-pitch').draggable({
        revert: "invalid",
        start: function() {
            $(this).addClass("being-dragged");
        },
        stop: function() {
            $(this).removeClass("being-dragged");
        }
    });

    // Make the pitch paths droppable
    $('.droppable-pitch').droppable({
        accept: ".drag-pitch",
        drop: function(event, ui) {
            var pitchName = ui.draggable.text();
            var pitchId = ui.draggable.attr("id");
            var correctPitch = $(this).data("pitch");
            var $this = $(this);

            // Create feedback text element
            var feedbackText = $('<p>').addClass('feedback-text').text(pitchName);

            if (pitchId === correctPitch) {
                // Correct drop
                score++;
                $this.addClass('match-correct');
                feedbackText.addClass('text-success'); // Bold Green text for correct
                var newSrc = $this.find('img').attr('src').replace('.png', '-right.png');
                $this.find('img').attr('src', newSrc);
            } else {
                // Incorrect drop
                $this.addClass('match-incorrect');
                feedbackText.addClass('text-danger'); // Bold Red text for incorrect
            }

            // Add feedback text below the box
            $this.append(feedbackText);

            // Position the draggable and disable it
            ui.draggable.draggable("disable").position({
                my: "center",
                at: "center",
                of: $this,
                using: function(pos) {
                    $(this).animate(pos, "fast", "linear");
                }
            });

            // Disable the droppable so it can't accept any more pitches
            $this.droppable("disable");

            // Check if all pitches have been placed
            checkCompletion();
        }
    });

    // Function to randomize elements
    function randomizeElements(selector) {
        var parent = $(selector);
        var divs = parent.children().detach().get();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    }

    // Randomize the order of the pitches and the boxes
    randomizeElements("#pitch-names");
    randomizeElements(".row.text-center.mt-4");
});
