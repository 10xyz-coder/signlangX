//Variables
const camera = document.getElementById("camera");
const res = document.getElementById("result");
const checkbtn = document.getElementById("checkbtn");
const snapbtn = document.getElementById("snap");
const resName = document.getElementById("res_name");
const resAccu = document.getElementById("res_accu");
const classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/a1IRRRrH7/model.json", modelLoaded)
const emojiList = {1:"✋", 2:"👍",3: "👎", 4: "🤘", 5: "🙏",6: "🙌"}

//Data
Webcam.set({width:360,height:250,image_format:"png",png_quality:90});

//Functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function take_snapshot() {
  Webcam.snap(function(data_uri) {
    res.innerHTML = '<img id="res_img" src="'+data_uri+'"/>';
    console.log(data_uri);
  })
  Webcam.reset();
  checkbtn.classList.remove("disabled");
  snapbtn.classList.add("disabled");
}
function modelLoaded() {
  console.log("Model Loaded!")
}
function check() {
  img = document.getElementById("res_img");
  classifier.classify(img, gotResult)
}
function gotResult(error, results) {
  if(error) {throw new Error("Image Identification Error - " + error)}
  else {
    //resName.innerText = results[0].label;
    //resAccu.innerText = ((results[0].confidence.toFixed(4)*100)+"%");
    document.getElementById("ress").innerText = emojiList[results[0].label]
    var sync = window.speechSynthesis
    sync.speak(new SpeechSynthesisUtterance(`${emojiList[results[0].label]}`))
    console.log(results)
    checkbtn.classList.add("disabled");
    snapbtn.classList.remove("disabled");
    Webcam.attach(document.getElementById("cam"));
  }
}

//Calls
document.getElementById('body').onload = (function(){
  checkbtn.classList.add("disabled");
  snapbtn.classList.remove("disabled");
  Webcam.attach(document.getElementById("cam"));
})

//Local Code
console.log('Currently using ML5 version: ' + ml5.version)
