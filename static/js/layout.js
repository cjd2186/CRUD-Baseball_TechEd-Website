// layout.js
function navigateToEndpoint() {
    var selectElement = document.getElementById('endpoints');
    var value = selectElement.value;
    if (value) {
      window.location.href = value; // Navigate to the selected endpoint
    }
  }

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


$(document).ready(function(){
    toggleMenu()
    navigateToEndpoint()
});