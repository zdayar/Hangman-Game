$(document).ready(function () {

    // hangmanGame is the object which contains everything needed for the game
    var hangmanGame = {
        instruments: [],                // array of instrument objects - will be init'ed at start of the game
        roundHasStarted: false,         // keeps track whether a round has been started by the user pressing a key
        roundHasEnded: false,           // keeps track of when a round ends (either by a win or loss)
        currentInstrumentIndex: 0,      // keeps the index of instrument to guess (re: instruments array)
        currentInstrumentName: "",      // keeps the name of the instrument to guess
        currentWordDisplay: "",         // this is what's displayed for the word on screen (with underscores, etc.)
        numGuessesRemaining: 12,        // each round, the user gets 12 guesses
        wins: 0,                        // keep track of # of wins here
        userGuess: "",                  // last letter key pressed by user (their current guess)
        lettersIncorrectlyGuessed: [],  // the list of incorrect letters user already guessed in this round
        lettersCorrectlyGuessed: [],    // the list of correct letters user already guessed in this round

        addInstrument: function (name, img, sound) {
            // Add an instrument object to the game's instruments array
            var instrument = {
                name: name,
                img: img,
                sound: sound
            };

            this.instruments.push(instrument);
        },

        initInstruments: function () {
            // Initialize all the instrument objects - their names and their image and sound clip URL's
            this.addInstrument("VIOLIN",
                "http://www.beginband.com/instruments/violin.jpg",
                "http://www.beginband.com/sndclips/violin.mp3");

            this.addInstrument("VIOLA",
                "http://www.beginband.com/instruments/viola.jpg",
                "http://www.beginband.com/sndclips/viola.mp3");

            this.addInstrument("CELLO",
                "http://www.beginband.com/instruments/cello.jpg",
                "http://www.beginband.com/sndclips/cello.mp3");

            this.addInstrument("TRUMPET",
                "http://www.beginband.com/instruments/trumpet.jpg",
                "http://www.beginband.com/sndclips/trumpet.mp3");

            this.addInstrument("FRENCH HORN",
                "http://www.beginband.com/instruments/horn.jpg",
                "http://www.beginband.com/sndclips/horn.mp3");

            this.addInstrument("TROMBONE",
                "http://www.beginband.com/instruments/trombone.jpg",
                "http://www.beginband.com/sndclips/trombone.mp3");

            this.addInstrument("FLUTE",
                "http://www.beginband.com/instruments/flute.jpg",
                "http://www.beginband.com/sndclips/flute.mp3");

            this.addInstrument("CLARINET",
                "http://www.beginband.com/instruments/clarinet.jpg",
                "http://www.beginband.com/sndclips/clarinet.mp3");

            this.addInstrument("SAXOPHONE",
                "http://www.beginband.com/instruments/sax.jpg",
                "http://www.beginband.com/sndclips/sax.mp3");

            this.addInstrument("XYLOPHONE",
                "http://www.beginband.com/instruments/bells.jpg",
                "http://www.beginband.com/sndclips/bells.mp3");

            this.addInstrument("SNARE DRUM",
                "http://www.beginband.com/instruments/snare.jpg",
                "http://www.beginband.com/sndclips/snare.mp3");
        },

        initForNewRound: function () {
            // Init everything for the start of a new round

            // Display wins
            document.getElementById("win-count").innerText = hangmanGame.wins;

            // 12 guesses to start with each round
            hangmanGame.numGuessesRemaining = 12;
            document.getElementById("remaining-guesses").innerText = hangmanGame.numGuessesRemaining;

            // pick random instrument
            hangmanGame.currentInstrumentIndex = Math.floor(Math.random() * hangmanGame.instruments.length);
            // find name of instrument to guess
            hangmanGame.currentInstrumentName = hangmanGame.instruments[hangmanGame.currentInstrumentIndex].name;

            // Display all underscores for letters (note: spaces stay as is)
            hangmanGame.currentWordDisplay = hangmanGame.currentInstrumentName.replace(/[A-Z]/gi, '_');
            document.getElementById("current-word").innerText = hangmanGame.currentWordDisplay;

            // no guesses yet
            hangmanGame.lettersIncorrectlyGuessed = [];
            document.getElementById("incorrect-guesses").innerText = "";
            hangmanGame.lettersCorrectlyGuessed = [];
            hangmanGame.userGuess = undefined;

            // Change status message
            document.getElementById("status-text").innerText = "Guess the instrument!";

            // put up default pic and music and start playing the music
            document.getElementById("instrument-pic").src = "assets/images/big-band-clip-art.png";
            document.getElementById("instrument-audio").src = "assets/audio/LouieLouie.mp3";
            document.getElementById("instrument-audio").play();

            // Set boolean for round started to true
            hangmanGame.roundHasStarted = true;
            hangmanGame.roundHasEnded = false;
        },

        allIndicesForLetterInWord: function (letter, word) {
            // finds all the occurrences (i.e. indices) of a letter (char) in a word (string) and returns them in an array.
            var indices = [], i = -1;
            while ((i = word.indexOf(letter, i + 1)) >= 0) indices.push(i);
            return indices;
        },

        wordReplaceAt: function (str, index, letter) {
            // Replaces char at specific index of string 'str' with 'letter' argument and returns the resulting string
            return str.substr(0, index) + letter + str.substr(index + 1);
        },


        processIncorrectGuess: function (letter) {
            // Process an incorrectly guessed letter

            // add letter to incorrect list and display it
            hangmanGame.lettersIncorrectlyGuessed.push(letter);
            document.getElementById("incorrect-guesses").innerText += " " + letter;

            // decrement remaining guesses and display
            hangmanGame.numGuessesRemaining--;
            document.getElementById("remaining-guesses").innerText = hangmanGame.numGuessesRemaining;

            // see if this was their last guess
            if (hangmanGame.numGuessesRemaining === 0) {
                // game over - user loses
                hangmanGame.processLoss();
            }
        },

        processCorrectGuess: function (letter, indices) {
            // Process a correctly guessed letter

            // add letter to correct list
            hangmanGame.lettersCorrectlyGuessed.push(letter);

            // place the letter they guessed everywhere it appears in the word
            // Need to do this via a utility fcn b/c a char in a string can't just be changed.
            // "Strings in js are immutable!"
            for (var i = 0; i < indices.length; i++) {
                hangmanGame.currentWordDisplay = hangmanGame.wordReplaceAt(hangmanGame.currentWordDisplay, indices[i], letter);
            }
            // now display on the screen
            document.getElementById("current-word").innerText = hangmanGame.currentWordDisplay;

            // Did they fully guess the word?
            if (hangmanGame.currentWordDisplay.indexOf('_') === -1) {
                // game over - user wins
                hangmanGame.processWin();
            }
        },

        processWin: function () {
            // increment wins and display
            hangmanGame.wins++;
            document.getElementById("win-count").innerText = hangmanGame.wins;
            // put up pic and music for the guessed instrument and start playing the music
            document.getElementById("instrument-pic").src = hangmanGame.instruments[hangmanGame.currentInstrumentIndex].img;
            document.getElementById("instrument-audio").src = hangmanGame.instruments[hangmanGame.currentInstrumentIndex].sound;
            document.getElementById("instrument-audio").play();
            // Change status message
            document.getElementById("status-text").innerText = "Good Job!!!";
            hangmanGame.roundHasEnded = true;

        },

        processLoss: function () {
            // put up pic and music for the loser and start playing the music
            document.getElementById("instrument-pic").src = "assets/images/loser.png";
            document.getElementById("instrument-audio").src = "assets/audio/fail-trombone.mp3";
            document.getElementById("instrument-audio").play();
            // Change status message
            document.getElementById("status-text").innerText = "It was " + hangmanGame.currentInstrumentName + "!";
            hangmanGame.roundHasEnded = true;
        },

        needToStartNewRound: function () {
            // if started and ended are both true, it means we just completed a round
            // if started and ended are both false, it means this is the very first round
            // the only other possibility is started:true and ended:false, which means a round is in progress
            return (hangmanGame.roundHasStarted === hangmanGame.roundHasEnded);
        }
    };

    // This is where the object definition ends and code logic begins

    // init all instruments
    hangmanGame.initInstruments();


    // This function is run whenever the user presses a key. It keeps the game going
    document.onkeyup = function (event) {

        var letterInWordIndices;
        var letterPressed = event.key.toUpperCase(); // keep/display everything in uppercase


        if (hangmanGame.needToStartNewRound()) {
            // init everything for new round
            hangmanGame.initForNewRound();
        }
        // during play, only act on letters (a-z, A-Z) and only if they haven't been played before
        else if ((letterPressed.match(/[a-z]/i)) &&
            (hangmanGame.lettersCorrectlyGuessed.indexOf(letterPressed) === -1) &&
            (hangmanGame.lettersIncorrectlyGuessed.indexOf(letterPressed) === -1)) {

            // save the pressed key as the user guess
            hangmanGame.userGuess = letterPressed;

            // see if there is a match
            letterInWordIndices = hangmanGame.allIndicesForLetterInWord(hangmanGame.userGuess, hangmanGame.currentInstrumentName);
            if (letterInWordIndices.length === 0) {
                // they guessed wrong
                hangmanGame.processIncorrectGuess(hangmanGame.userGuess);
            }
            else {
                // they guessed right
                hangmanGame.processCorrectGuess(hangmanGame.userGuess, letterInWordIndices);
            }
        }
    }

});

