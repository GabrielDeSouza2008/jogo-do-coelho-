const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var piscando;
var comendo;
var triste;

var somAmbiente;
var corteCorda;
var somTriste;
var somComemdo;
var arSoprado;

var botaoSoprador;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  comendo = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png" );
  triste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  piscando.playing = true;
  comendo.playing = true;
  triste.playing = true;
  comendo.looping = false;
  triste.looping = false;
  somAmbiente = loadSound("sound1.mp3");
  corteCorda = loadSound("rope_cut.mp3");
  somTriste = loadSound("sad.wav");
  somComendo = loadSound("eating_sound.mp3");
  arSoprado = loadSound("air.wav");
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);
/*
  botaoSoprador = createImg("blower.png");
  botaoSoprador.position(10, 250);
  botaoSoprador.size(150, 100)
  botaoSoprador.mouseClicked(soprador);
*/
  

  botaoMute = createImg("cut_button.png");
  botaoMute.position(400, 50);
  botaoMute.size(50, 50);
  botaoMute.mouseClicked(mute);



  rope = new Rope(8,{x:40,y:30});
  rope2= new Rope(8,{x:370,y:40});
  rope3= new Rope(8,{x:400,y:225});

  ground = new Ground(200,690,600,20);

  piscando.frameDelay = 20;
  comendo.frameDelay = 20;
  triste.frameDelay = 20; 
  bunny = createSprite(40,620,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  bunny.addAnimation("piscando", piscando)
  bunny.addAnimation("comendo", comendo)
  bunny.addAnimation("triste", triste)
  bunny.changeAnimation("piscando")

  somAmbiente.play()
  somAmbiente.setVolume(0.1)
  
  fruit = Bodies.circle(200,200,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2, fruit)
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() {
  background(51);
  image(bg_img,width/2,height/2,490,690);
  rope2.show()
  rope3.show()

  if (fruit){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  
  if (colisao(fruit, bunny)){
  bunny.changeAnimation("comendo");
  somComendo.play()
  }

  if (colisao(fruit, ground.body)){
    bunny.changeAnimation("triste");
    somTriste.play()
  }
  rope.show();
  Engine.update(engine);
  ground.show();

   drawSprites();
}

function drop(){

  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  corteCorda.play()

}
function drop2(){
rope2.break();
fruit_con2.dettach();
fruit_con2 = null;
corteCorda.play()
}
function drop3(){
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null;
  corteCorda.play()
  }

function colisao(objeto1, objeto2){
  if (objeto1 !== null){
    var distancia = dist(objeto1.position.x,objeto1.position.y, objeto2.position.x, objeto2.position.y);
    if (distancia <= 80){
      World.remove(world, fruit);
      fruit = null;
      return true;
    }else{
      return false;
    }
  }
  
}
function soprador (){
 Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0})
arSoprado.play()
}
function mute(){
  if (somAmbiente.isPlaying()){
  somAmbiente.stop()
  }else{
    somAmbiente.play()
  }
}

