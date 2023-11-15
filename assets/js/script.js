let maxStars = 10; // Numero massimo di stelle
  let currentRating = 0;

  function generateStars() {
    let starRatingDiv = document.getElementById('starRating');

    for (let i = 1; i <= maxStars; i++) {
      let star = document.createElement('img');
      star.className = 'star';
      star.src = "assets\star.svg"; 
      star.alt = 'Star';
      star.setAttribute('data-rating', i);

      // Aggiungi un gestore di eventi per il clic su ogni stella
      star.addEventListener('click', function() {
        rateStar(i);
      });

      starRatingDiv.appendChild(star);
    }
  }

  function rateStar(rating) {
    currentRating = rating;
    updateRatingDisplay();
  }

  function updateRatingDisplay() {
    document.getElementById('ratingValue').innerText = 'Rating: ' + currentRating;
  }

  window.onload = function() {
    generateStars();
  };


