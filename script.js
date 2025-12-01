// Your script here.
const synth = window.speechSynthesis;

const textArea = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");
const speakBtn = document.getElementById("speak");
const stopBtn = document.getElementById("stop");

const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");

let voices = [];
let currentUtterance = null;

// Load available voices
function loadVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";

  if (voices.length === 0) {
    const option = document.createElement("option");
    option.textContent = "No voices available";
    voiceSelect.appendChild(option);
    return;
  }

  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = ${voice.name} (${voice.lang});
    voiceSelect.appendChild(option);
  });
}

// Call load voices when available
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

// Speak function
function speakText() {
  const text = textArea.value.trim();

  // Prevent speaking empty text
  if (text === "") return;

  // Stop any ongoing speech
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const selectedIndex = voiceSelect.value;
  if (voices[selectedIndex]) {
    utterance.voice = voices[selectedIndex];
  }

  utterance.rate = rateInput.value;
  utterance.pitch = pitchInput.value;

  currentUtterance = utterance;
  synth.speak(utterance);
}

// Stop function
function stopSpeech() {
  synth.cancel();
}

// Event listeners
speakBtn.addEventListener("click", speakText);
stopBtn.addEventListener("click", stopSpeech);

// Restart speech when voice changes mid-speech
voiceSelect.addEventListener("change", () => {
  if (synth.speaking) speakText();
});

// Update dynamically while speaking
rateInput.addEventListener("input", () => {
  if (synth.speaking) speakText();
});

pitchInput.addEventListener("input", () => {
  if (synth.speaking) speakText();
});
