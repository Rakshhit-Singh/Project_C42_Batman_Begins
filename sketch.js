//Project-42: Batman Begins

//Adding Modules from Matter.js
const {Engine, World, Body, Bodies} = Matter; 

//Creating variables
var myEngine, myWorld;

var thunder, thunderImg1, thunderImg2, thunderImg3, thunderImg4;
var thunderCreatedAt;

var uObj;
var drops = [];
var maxDrops = 100;

var walkImg = [];
var walkImg1, walkImg2, walkImg3, walkImg4, walkImg5, walkImg6, walkImg7;

var mode;
var leftMode = 0;
var rightMode = 6;

function preload(){
    thunderImg1 = loadImage("images/thunderbolt/1.png");
    thunderImg2 = loadImage("images/thunderbolt/2.png");
    thunderImg3 = loadImage("images/thunderbolt/3.png");
    thunderImg4 = loadImage("images/thunderbolt/4.png");

    walkImg1 = loadImage("images/Walking Frame/walking_1.png");
    walkImg2 = loadImage("images/Walking Frame/walking_2.png");
    walkImg3 = loadImage("images/Walking Frame/walking_3.png");
    walkImg4 = loadImage("images/Walking Frame/walking_4.png");
    walkImg5 = loadImage("images/Walking Frame/walking_5.png");
    walkImg6 = loadImage("images/Walking Frame/walking_6.png");
    walkImg7 = loadImage("images/Walking Frame/walking_7.png");
}

function setup(){
  canvas = createCanvas(700, 800); 

  //Creating Engine & World
  myEngine = Engine.create();
  myWorld = myEngine.world;

  uObj = new Umbrella(100, 530);

  //To create rain drops
  if(frameCount % 200 === 0) {
    for (let i = 0; i < maxDrops; i++) {
        drops.push(new RainDrop(random(0, 700), random(0, 800)));
    }
  }   
}

function draw(){
  background(40, 40, 40);  

  Engine.update(myEngine);

  //To create thunder
  var rand = Math.round(random(1, 4));

  if(frameCount % 80 === 0){

    randX = random(100, 700);
    randY = random(50, 70);

    thunder = createSprite(randX, randY);

    thunderCreatedAt = frameCount;
    
    switch(rand) {
        case 1: thunder.addImage(thunderImg1);
                break;
        case 2: thunder.addImage(thunderImg2);
                break;
        case 3: thunder.addImage(thunderImg3);
                break;
        case 4: thunder.addImage(thunderImg4);
                break;
        default: break;
    }

    thunder.scale = random(0.4, 0.6);

  }

  //To make the thunder to destroyed after few frame count
  if (thunderCreatedAt + 15 === frameCount) {
    thunder.destroy();
  }

  uObj.showWalkingMan();

  //To display rain drops
  for (let j = 0; j < maxDrops; j++) {
      drops[j].updatePos();
      drops[j].showRainDrop();
  }

  drawSprites();

}   

//Use left & right arrow to move
function keyPressed(){

    var objPos = uObj.body.position;

    if (objPos.x >= 100 || objPos.x <= 700) {

        if(keyCode === RIGHT_ARROW){
            if (leftMode === 0 || leftMode <= 6){
                leftMode = leftMode + 1;
                Body.setPosition(uObj.body, {x: objPos.x+100, y: 530});
                mode = leftMode;    
            }else{
                leftMode = 0;
            }
        }

        if(keyCode === LEFT_ARROW){
            if (rightMode > 0 || rightMode <= 6){
                rightMode = rightMode - 1;
                Body.setPosition(uObj.body, {x: objPos.x-100, y: 530});
                mode = rightMode;
            }else{
                rightMode = 6;    
            }    
        }

        //Apply different images based on the left & right mode
        switch(mode){
            case 1: uObj.changeImg(walkImg2);
                    break;
            case 2: uObj.changeImg(walkImg3);
                    break;
            case 3: uObj.changeImg(walkImg4);
                    break;
            case 4: uObj.changeImg(walkImg5);
                    break;
            case 5: uObj.changeImg(walkImg6);
                    break;
            case 6: uObj.changeImg(walkImg7);
                    break;
            default: break;
        }
    }
}

