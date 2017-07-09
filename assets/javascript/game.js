$(document).ready(function () {
    // start playing audio in background
    document.getElementById("instrument-audio").play();

    var userGuess;

    // This function is run whenever the user presses a key.
    document.onkeyup = function (event) {

        // Determines which key was pressed.
        userGuess = event.key;
    }


});



 /*   var Instruments = [
        {
            name: "Violin",
            img: "http://www.beginband.com/instruments/violin.jpg",
            sound: "http://www.beginband.com/sndclips/violin.mp3"
        },
        {
            name: "Viola",
            img: "http://www.beginband.com/instruments/viola.jpg",
            sound: "http://www.beginband.com/sndclips/viola.mp3"
        },
        {
            name: "Cello",
            img: "http://www.beginband.com/instruments/cello.jpg",
            sound: "http://www.beginband.com/sndclips/cello.mp3"
        },
        {
            name: "Trumpet",
            img: "http://www.beginband.com/instruments/trumpet.jpg",
            sound: "http://www.beginband.com/sndclips/trumpet.mp3"
        },
        {
            name: "French Horn",
            img: "http://www.beginband.com/instruments/horn.jpg",
            sound: "http://www.beginband.com/sndclips/horn.mp3"
        },
        {
            name: "Trombone",
            img: "http://www.beginband.com/instruments/trombone.jpg",
            sound: "http://www.beginband.com/sndclips/trombone.mp3"
        },
        {
            name: "Flute",
            img: "http://www.beginband.com/instruments/flute.jpg",
            sound: "http://www.beginband.com/sndclips/flute.mp3"
        },
        {
            name: "Clarinet",
            img: "http://www.beginband.com/instruments/clarinet.jpg",
            sound: "http://www.beginband.com/sndclips/clarinet.mp3"
        },
        {
            name: "Saxophone",
            img: "http://www.beginband.com/instruments/sax.jpg",
            sound: "http://www.beginband.com/sndclips/sax.mp3"
        },
        {
            name: "Bells",
            img: "http://www.beginband.com/instruments/bells.jpg",
            sound: "http://www.beginband.com/sndclips/bells.mp3"
        },
        {
            name: "Snare Drum",
            img: "http://www.beginband.com/instruments/snare.jpg",
            sound: "http://www.beginband.com/sndclips/snare.mp3"
        }

    ];*/


