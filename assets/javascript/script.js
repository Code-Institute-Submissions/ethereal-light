/*---------------------------------------------------------------------Tutorial from Youtube - 'Web Dev Simplified' Card Matching Game*/
/*---------------------------------------------------------------------Game BGM*/
class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/audio/warrior-of-light.mp3');
        this.flipSound = new Audio('assets/audio/confirm.mp3');
        this.matchSound = new Audio('assets/audio/unlocked.mp3');
        this.victorySound = new Audio('assets/audio/win.mp3');
        this.gameOverSound = new Audio('assets/audio/failed.mp3');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.victorySound.pause();       
        this.victorySound.currentTime = 0;      
        this.gameOverSound.pause();     
        this.gameOverSound.currentTime = 0;     
        if (musicState == "on") {  
            this.bgMusic.play();
        }
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}
/*---------------------------------------------------------------------Game Card*/  
class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card) {
         if(this.canFlipCard(card)) {
             this.audioController.flip();
             this.totalClicks++;
             this.ticker.innerText = this.totalClicks;
             card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
         }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
        this.hideCards();
    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i --) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

let overlays = Array.from(document.getElementsByClassName('overlay-text')); 
let cards = Array.from(document.getElementsByClassName('card'));            
let game = new MixOrMatch(99, cards);                                      

function ready() {
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
/*---------------------------------------------------------------------Game*/
if(document.readyState === 'loading') {
    document.addEventListener('DOMcontentLoaded', ready());
} else {
    ready();
}

/*---------------------------------------------------------------------Tutorial from Youtube - 'Coding Market' and codeinstitute*/
/*---------------------------------------------------------------------Home Application*/
function validate(contactForm){
    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    var error_message = document.getElementById("error_message");

    error_message.style.padding = "10px";

    var text;
    if(name.length < 5){
      text = "Please Enter valid Name";
      error_message.innerHTML = text;
      return false;
    }

    if(message.length <= 10){
        text = "Please Enter More Than 10 Characters";
        error_message.innerHTML = text;
        return false;
    }
    
    emailjs.send('gmail', 'template', {
        "from_name": contactForm.name.value,
        "message": contactForm.message.value
    })
    alert("Form Submitted Successfully!")
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;
}


/*----------------------------------------------Audio Settings Modal*/

var modal = document.getElementById("myModal2");        
var audioSetting = document.getElementById("audio-settings");       
var span = document.getElementsByClassName("close")[0];     

audioSetting.onclick = function() {                     
    modal.style.display = "block";
}

span.onclick = function() {                             
    modal.style.display = "none";
}


/*----------------------------------------------Music Controls*/

var musicToggle = document.getElementById('music-toggle');
var musicState = "on";      //initial music state will be "on"

function muteMusic(){
    if (musicState == "off"){           
        musicState = "on";
        musicToggle.innerHTML = "<p>Toggle Background Music</p><br><button class=\"w-50 mx-auto\" onclick=\"muteMusic()\">ON</button>";                      
        game.audioController.startMusic();
    } else {
        musicState = "off";             
        musicToggle.innerHTML = "<p>Toggle Background Music</p><br><button class=\"w-50 mx-auto\" onclick=\"muteMusic()\">OFF</button>";                           
        game.audioController.stopMusic();
    }
}

//Volume control for background music --- taken from https://stackoverflow.com/questions/62160275/js-audio-volume-slider
var volumeSlider = document.querySelector('#volume-slider'); 
    volumeSlider.addEventListener('input', () => {     
        game.audioController.bgMusic.volume = volumeSlider.valueAsNumber / 100;
    });

var volumeSlider2 = document.querySelector('#volume-slider2'); 
    volumeSlider2.addEventListener('input', () => {    
        game.audioController.flipSound.volume = volumeSlider2.valueAsNumber / 100;
        game.audioController.matchSound.volume = volumeSlider2.valueAsNumber / 100;
        game.audioController.victorySound.volume = volumeSlider2.valueAsNumber / 100;
        game.audioController.gameOverSound.volume = volumeSlider2.valueAsNumber / 100;
    });