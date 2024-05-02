// lessons.js
function goToPage(path){
    window.location.href = window.location.origin + path;
};

function quiz() {
    var pitchName = $('#currentPitchName').val().trim().toLowerCase(); // Normalize the pitch name
    console.log("THIS", pitchName)
    if (pitchName === "changeup") {
        var $button = $('<button>', {
            text: 'Quiz your Understanding!',
            click: function() {
                window.location.href = '/quiz'; // Correct the path if necessary
            },
            class: 'btn btn-info' // Bootstrap button styling
        });

        $('#quizButtonContainer').append($button);
    }
};

$(document).ready(function(){
    quiz();
    console.log("QUIZ")
    toggleDropdown()
});