const letterContainer = document.querySelector('#letter-container'),
      optionsContainer = document.querySelector('#options-container'),
      userInputSection = document.querySelector('#user-input-section'),
      newGameContainer = document.querySelector('#new-game-container'),
      newGameButton = document.querySelector('#new-game-button'),
      canvas = document.querySelector('#canvas'),
      resultText = document.querySelector('#result-text');

let options = {
    fruits: ["Apple", "Orange", "Mandarin", "Pineapple", "Banana", "Watermelon"],
    animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
    countries: ["India", "Hungary", "Ukraine", "France", "Zimbabwe", "Dominica"],
};

let winCount = 0,
    count = 0,
    chosenWord = '';

function displayOptions() {
    optionsContainer.innerHTML += `<h3>Please select an option</h3>`;

    let buttons = document.createElement('div');
    for (let value in options) {
        buttons.innerHTML += `<button class='options' onclick='generateWord("${value}")'>${value}</button>`;
    }
    optionsContainer.appendChild(buttons);
}

function blocker() {
    let optionsButtons = document.querySelectorAll('.options'),
        letterButtons = document.querySelectorAll('.letters');

        // disable all options
    optionsButtons.forEach( button => {
        button.disabled = true;
    });

        // disable all letters
        letterButtons.forEach( button => {
        button.disabled = true;
    });
    newGameContainer.classList.remove("hide");
}

function generateWord (optionValue) {
    let optionsButtons = document.querySelectorAll('.options');

    optionsButtons.forEach( button => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add('active');
        }
        button.disabled = true;
    });


    //initially hide letters, clear previous word
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    //choose random word
    chosenWord = optionArray[Math.floor(Math.random()*optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    userInputSection.innerHTML = displayItem;
}

function init() {

    winCount = 0;
    count = 0;

    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add('letters');
        button.innerText = String.fromCharCode(i);
        button.addEventListener('click', () => {
            let charArray = chosenWord.split('');
            let dashes = document.getElementsByClassName('dashes');

            if (charArray.includes(button.innerText)) {
                charArray.forEach( (char, index) => {
                    //if character in array is same as clicked button
                    if (char === button.innerText) {
                        dashes[index].innerText = char;
                        winCount++;
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<h2 class='win-msg'>You Win!
                            </h2><p>The word was <span>${chosenWord}</span></p>`;
                            blocker();
                        }
                    }
                });
            } else {
                count++;
                drawMan(count);
                if (count == 6) {
                    resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2>
                    <p>The word was <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }

            button.disabled = true;
        });
        letterContainer.append(button);
    }
    displayOptions();
    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
}

function canvasCreator() {
    let context = canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;


    function drawLine(fromX, fromY, toX, toY) {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    }

    function head() {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    function body()  {
        drawLine(70, 40, 70, 80);
    }
    
    function leftArm() {
        drawLine(70, 50, 50, 70);
    }
    
    function rightArm() {
        drawLine(70, 50, 90, 70);
    }
    
    function leftLeg() {
        drawLine(70, 80, 50, 110);
    }
    
    function rightLeg() {
        drawLine(70, 80, 90, 110);
    }

    //initial frame
    function initialDrawing() {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  }
  
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
}

function drawMan(count) {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        rightArm();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        break;
      default:
        break;
    }
}

//New Game
newGameButton.addEventListener("click", init());
window.onload = init();



