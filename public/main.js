const textarea = document.getElementById('output');
const imgHappy = document.getElementById("img-happy");
const imgSad = document.getElementById("img-sad");

// recognition
let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    const results = event.results;
    const text = results[results.length-1][0].transcript;
    textarea.innerHTML = text.trim();

    evaluar(text.trim());
}

const startListening = () => {
    recognition.start();
}

const stopListening = () => {
    recognition.abort();
}

const evaluar = texto => {
    fetch('/evaluar/'+texto)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.output == 0) {
            console.log("feliz");
            imgHappy.classList.remove("disabled");
            imgSad.classList.add("disabled");
        } else if (data.output == 1) {
            console.log("triste");
            imgHappy.classList.add("disabled");
            imgSad.classList.remove("disabled");
        } else {
            console.log("otro");
            imgHappy.classList.add("disabled");
            imgSad.classList.add("disabled");
        }
    })
    .catch(err => {
        console.log('Hubo un problema con la petición Fetch:' + err.message);
        imgHappy.classList.add("disabled");
        imgSad.classList.add("disabled");
    });
}