document.addEventListener('DOMContentLoaded', () => {
  // MODO CLARO/OSCURO
  const modoToggle = document.getElementById("modo-toggle");

  if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("dark-mode");
    modoToggle.textContent = "☀️ Modo claro";
  }

  modoToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const esOscuro = document.body.classList.contains("dark-mode");
    modoToggle.textContent = esOscuro ? "🌙 Modo oscuro" : "☀️ Modo claro";

    localStorage.setItem("modoOscuro", esOscuro);
  });

  //JUEGO DE MEMORIA
  const cardArray = [
    { name: 'cards_01', img: 'images/cartasFrogalone/cards_01.png' },
    { name: 'cards_01', img: 'images/cartasFrogalone/cards_01.png' },
    { name: 'cards_02', img: 'images/cartasFrogalone/cards_02.png' },
    { name: 'cards_02', img: 'images/cartasFrogalone/cards_02.png' },
    { name: 'cards_03', img: 'images/cartasFrogalone/cards_03.png' },
    { name: 'cards_03', img: 'images/cartasFrogalone/cards_03.png' },
    { name: 'cards_04', img: 'images/cartasFrogalone/cards_04.png' },
    { name: 'cards_04', img: 'images/cartasFrogalone/cards_04.png' },
    { name: 'cards_05', img: 'images/cartasFrogalone/cards_05.png' },
    { name: 'cards_05', img: 'images/cartasFrogalone/cards_05.png' },
    { name: 'cards_06', img: 'images/cartasFrogalone/cards_06.png' },
    { name: 'cards_06', img: 'images/cartasFrogalone/cards_06.png' },
    { name: 'cards_07', img: 'images/cartasFrogalone/cards_07.png' },
    { name: 'cards_07', img: 'images/cartasFrogalone/cards_07.png' },
    { name: 'cards_08', img: 'images/cartasFrogalone/cards_08.png' },
    { name: 'cards_08', img: 'images/cartasFrogalone/cards_08.png' }
  ]

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(cardArray)

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('card');
      cardContainer.setAttribute('data-id', i);

      const front = document.createElement('img');
      front.classList.add('front');
      front.setAttribute('src', cardArray[i].img);

      const back = document.createElement('img');
      back.classList.add('back');
      back.setAttribute('src', 'images/x3/card_back.png');

      cardContainer.appendChild(front);
      cardContainer.appendChild(back);
      cardContainer.addEventListener('click', flipcard);

      grid.appendChild(cardContainer);
    }
  }

  function disableAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.removeEventListener('click', flipcard));
  }

  function enableAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const cardId = card.getAttribute('data-id');
      if (!cardsWon.includes(cardArray[cardId].name)) {
        card.addEventListener('click', flipcard);
      }
    });
  }

  function checkforMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    const cardOne = cards[optionOneId];
    const cardTwo = cards[optionTwoId];

    if (cardsChosen[0] === cardsChosen[1]) {
      cardOne.removeEventListener('click', flipcard);
      cardTwo.removeEventListener('click', flipcard);
      cardsWon.push(cardsChosen[0]);
    } else {
      setTimeout(() => {
        cardOne.classList.remove('flipped');
        cardTwo.classList.remove('flipped');
      }, 500);
    }

    cardsChosen = [];
    cardsChosenId = [];

    enableAllCards();
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = '¡HAS GANADO!';
    }
  }

  function flipcard() {
    const cardId = this.getAttribute('data-id');
    if (cardsChosenId.includes(cardId)) return;

    this.classList.add('flipped');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);

    if (cardsChosen.length === 2) {
      disableAllCards();
      setTimeout(checkforMatch, 500);
    }
  }

  createBoard();
});
