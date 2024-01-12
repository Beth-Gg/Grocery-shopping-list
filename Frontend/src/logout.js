
document.addEventListener('DOMContentLoaded', function() {
    var anchor = document.getElementById('log-btn');
  
    // Add a click event listener to the anchor element
    anchor.addEventListener('click', function(event) {
      // Prevent the default behavior of the anchor
      event.preventDefault();
  
     
      window.location.href = 'login.html';
    });
  });