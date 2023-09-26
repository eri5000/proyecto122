x = 0;
y = 0;
screenWidth= 0;
screenHeight= 0;
speak_data= 0;
draw_apple = "";
apple = "";
to_number= 0;

function preload(){
  apple=loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "El sistema está escuchando. Por favor, habla.";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "La voz se reconoció como: " + content; 
 to_number=Number(content);
 if(Number.isInteger(to_number)){
  document.getElementById("status").innerHTML="Se empezo a dibujar la manzana";
  draw_apple="set";
 }else{
  document.getElementById("status").innerHTML="no se reconocio un numero";
 }

}

function setup() {
 screenWidth=window.innerWidth;
 screenHeight=window.innerHeight;
 canvas=createCanvas(screenWidth,screenHeight-150);
 canvas.position(0,150);
}

function draw() {
  if(draw_apple == "set")
  {
    for(var z=1;z <= to_number; z++){
      x=Math.floor(Math.random()*700);
      y=Math.floor(Math.random()*400);
      image(apple,x,y,100,100);
    }
    document.getElementById("status").innerHTML = to_number + " manzanas dibujadas";
    speak_data=to_number + "manzanas dibujadas";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
