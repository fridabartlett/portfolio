//======Varibles======//

const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const startButton = document.querySelector(".btn__reset");

let missed = 0;

//===== 5 phrases array=====//
const phrases = [
  "dog food",
  "black coffee",
  "cool cat",
  "vegan food",
  "love is blind",
];

//===== Event list to start the game=====//

startButton.addEventListener("click", () => {
  if (startButton.textContent === "Start Game") {
    startGame();
    overlay.style.display = "none";
  } else {
    resetGame();
    startGame();
    overlay.style.display = "none";
  }
});

//=====getRandomPhraseAsArray function=====//
function getRandomPhraseAsArray(arr) {
  const random = Math.floor(Math.random() * arr.length);
  const randomPhrase = arr[random];
  return randomPhrase;
}

//=====addPhraseToDisplay=====//
function addPhraseToDisplay(arr) {
  const phraseUL = document
    .getElementById("phrase")
    .getElementsByTagName("ul")[0];
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.textContent = arr[i];
    phraseUL.appendChild(li);
    const letters = /^[0-9a-zA-z]+$/;
    if (li.textContent.match(letters)) {
      li.className = "letter";
    } else {
      li.className = "space";
      li.style.margin = "1 em";
    }
  }
}
//======resetGame function=====//
function resetGame() {
  const phraseUL = document
    .getElementById("phrase")
    .getElementsByTagName("ul")[0];
  phraseUL.innerHTML = "";
  missed = 0;

  const keys = qwerty.getElementsByTagName("button");
  for (let i = 0; i < keys.length; i++) {
    keys[i].className = "";
  }

  const ol = document
    .getElementById("scoreboard")
    .getElementsByTagName("ol")[0];
  const hearts = ol.getElementsByClassName("tries");

  for (let i = hearts.length; i < 5; i++) {
    ol.appendChild(createHeart());
  }

  const titles = overlay.getElementsByTagName("h3");
  for (let i = 0; i < titles.length; i++) {
    overlay.removeChild(titles[0]);
  }
}
//=====createHeart function=====//
function createHeart() {
  const heart = document.createElement("li");
  heart.className = "tries";

  const image = document.createElement("img");
  image.src = "images/liveHeart.png";
  image.width = 30;
  image.height = 35;

  heart.appendChild(image);

  return heart;
}

function startGame() {
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}

//======checkletter function======//
function checkletter(letter) {
  const liItems = document.getElementById("phrase").getElementsByTagName("li");
  var match = null;

  for (let i = 0; i < liItems.length; i++) {
    if (letter === liItems[i].textContent) {
      liItems[i].className += " show";
      match = letter;
    }
  }

  return match;
}

//=====Add event listner to keyboard=====//
qwerty.addEventListener("click", (event) => {
  if (
    event.target.tagName.toLowerCase() === "button" &&
    event.target.className !== "chosen"
  ) {
    event.target.className = "chosen";
    let match = checkletter(event.target.textContent);
    if (match === null) {
      const ol = document
        .getElementById("scoreboard")
        .getElementsByTagName("ol")[0];
      const hearts = ol.getElementsByClassName("tries");
      if (hearts.length > 0) {
        ol.removeChild(hearts[0]);
      }
      missed++;
    }
    checkWin();
  }
});
//=====checkWin function=====//
function checkWin() {
  const totalLetters = document.querySelectorAll(".letter");
  const showLetters = document.querySelectorAll(".show");

  const h3 = document.createElement("h3");

  if (showLetters.length === totalLetters.length) {
    overlay.className = "win";
    overlay.style.display = "flex";
    startButton.textContent = "Play Again";
    overlay.appendChild(h3);
    h3.textContent = "You Won!";
  } else if (missed > 4) {
    overlay.className += " lose";
    overlay.style.display = "flex";
    startButton.textContent = "Try Again!";
    overlay.appendChild(h3);
    h3.textContent = "You Lost!";
  }
}
