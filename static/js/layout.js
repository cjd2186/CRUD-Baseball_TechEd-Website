function navigateToEndpoint() {
    var selectElement = document.getElementById('endpoints');
    var value = selectElement.value;
    if (value) {
      window.location.href = value; // Navigate to the selected endpoint
    }
  }

$(document).ready(function(){
    navigateToEndpoint()
});