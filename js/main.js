let deckId = '';

// Load a deck

if (localStorage.getItem('deckId')) {
  deckId = localStorage.getItem('deckId');
} else {
  loadDeck();
}

function loadDeck() {

  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      deckId = data.deck_id;
      console.log(deckId);
      localStorage.setItem('deckId', deckId);
    })
    .catch(err => console.log(err));
}

const player1Card = document.querySelector('.player1Card');
const player2Card = document.querySelector('.player2Card');

const pickBtn = document.querySelector('.pickBtn');
const result = document.querySelector('.result');

function drawCards() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      player1Card.src = data.cards[0].image;
      player2Card.src = data.cards[1].image;

      let player1Value = data.cards[0].code[0];
      let player2Value = data.cards[1].code[0];

      const cardValueObj = {
        J: 11,
        Q: 12,
        K: 13,
        A: 14
      };

      if (player1Value == '0') {
        player1Value = 10;
      } else if (Object.keys(cardValueObj).includes(player1Value)) {
        player1Value = cardValueObj[player1Value];
      } else {
        player1Value = +player1Value;
      }

      if (player2Value == '0') {
        player2Value = 10;
      } else if (Object.keys(cardValueObj).includes(player2Value)) {
        player2Value = cardValueObj[player2Value];
      } else {
        player2Value = +player2Value;
      }

      if (player1Value > player2Value) {
        result.textContent = 'Player 1 Wins!';
      } else if (player2Value > player1Value) {
        result.textContent = 'Player 2 Wins!';
      } else {
        result.textContent = 'It\'s draw!';
      }
      console.log(player1Value, player2Value)
    })
    .catch(err => console.log(err));
}


pickBtn.addEventListener('click', drawCards);