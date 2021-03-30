img = "";
status = false;
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != false) {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected";
            fill("#FF4500");
            percentage = floor(objects[i].confidence * 100);
            text(object[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF4500");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}