let mediaRecorder;
let audioChunks = [];

// 🎤 Voice Recording Feature
document.getElementById("startRecord").addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
    
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById("audioPlayback").src = audioUrl;
        
        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = audioUrl;
        downloadLink.download = "voice_memo.mp3";
        downloadLink.style.display = "block";
    };
    
    mediaRecorder.start();
});

document.getElementById("stopRecord").addEventListener("click", () => {
    mediaRecorder.stop();
});

// 🗣️ Speech-to-Text Feature
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

document.getElementById("startSpeech").addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = event => {
    document.getElementById("output").innerText = event.results[0][0].transcript;
};
