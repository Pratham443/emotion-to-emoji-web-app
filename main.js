prediction1 = "";
prediction2 = "";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90
})

camera = document.getElementById("camera");
Webcam.attach(" #camera ");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img src='" + data_uri + "' id='captured_image'/>";
    })
}

console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UfHnBVvUb/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!")
}

function speak() {
    var synth = window.speechSynthesis;
    speakdata1 = "The first prediction is " + prediction1;
    speakdata2 = "And the second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(results);
        document.getElementById("prediction_1").innerHTML = results[0].label;
        document.getElementById("prediction_2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(results[0].label == "Happy") {
            document.getElementById("emoji_1").innerHTML = "&#128522;";
        }

        if(results[0].label == "Sad") {
            document.getElementById("emoji_1").innerHTML = "&#128532;";
        }

        if(results[0].label == "Angry") {
            document.getElementById("emoji_1").innerHTML = "&#128548;";
        }

        if(results[1].label == "Happy") {
            document.getElementById("emoji_2").innerHTML = "&#128512;";
        }

        if(results[1].label == "Sad") {
            document.getElementById("emoji_2").innerHTML = "&#128532;";
        }

        if(results[1].label == "Angry") {
            document.getElementById("emoji_2").innerHTML = "&#128548;";
        }
    }
}