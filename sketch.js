var runner, jewellery, diamonds, sword, cash, gameover, road;
var runner_running, jewelleryImage, diamondsImage, swordImage, cashImage, gameoverImage, roadImage;
var Points = 0;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
runner_running = loadAnimation("Runner-1.png", "Runner-2.png");
jewelleryImage = loadImage("jwell.png");
diamondsImage = loadImage("diamonds.png");
swordImage = loadImage("sword.png");
cashImage = loadImage("cash.png");
gameoverImage = loadImage("gameOver.png");
roadImage = loadImage("Road.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  road = createSprite(windowWidth/2, 200, 1, 1);
  road.addImage(roadImage);
  road.scale = 1; 
 
  runner = createSprite(width/2, height - 20, 1, 1);
  runner.addAnimation("boyrunning", runner_running);
  runner.scale = 0.08;
  
  gameover = createSprite(width/2, height/2, 1, 1);
  gameover.addImage(gameoverImage);
  
  cashGroup = createGroup();
  jewelleryGroup = createGroup();
  diamondsGroup = createGroup();
  swordsGroup = createGroup();
}

function draw(){
  
  if(gameState == PLAY){
    road.velocityY = 3;
    
    //display functions
    money();
    jewels();
    makeDiamonds();
    makeObstacles();
    
    runner.visible = true;
    
    if(runner.isTouching(cashGroup)){
      Points = Points + 20;
      cashGroup.destroyEach();
    }
    
    if(runner.isTouching(diamondsGroup)){
      Points = Points + 40;
      diamondsGroup.destroyEach();
    }
    
    if(runner.isTouching(jewelleryGroup)){
      Points = Points + 60;
      diamondsGroup.destroyEach();
    }
    
    if(runner.isTouching(swordsGroup)){
      gameState = END;
      Points = 0;
    }
    
    if(road.y > 400){
     road.y = height/2;   
       }
    
    gameover.visible = false;
     runner.x = World.mouseX; 
     } 
  
  else if(gameState == END){
    gameover.visible = true;
    diamondsGroup.setVelocityEach(0);
    cashGroup.setVelocityEach(0);
    swordsGroup.setVelocityEach(0);
    jewelleryGroup.setVelocityEach(0);
    
    if(keyDown("S")){
      gameState = PLAY;
    }
    
    road.velocityY = 0;
    runner.visible = false;
  }

  drawSprites();
  textSize(15);
 stroke("red");
  text("Treasure Points: " + Points, 275, 50);
}

function money(){
  if(World.frameCount % 100 == 0){
  cash = createSprite(Math.round(random(50, width-50), 40, 1, 1));
  cash.velocityY = 3;
  cash.addImage(cashImage);
  cash.lifetime = 250;
  cash.scale = 0.1; 
  cashGroup.add(cash);
  }
}

function jewels(){
  if(World.frameCount % 250 == 0){
   jewellery = createSprite(Math.round(random(50, width-50), 40, 1, 1));
  jewellery.velocityY = 3;
  jewellery.addImage(jewelleryImage);
  jewellery.lifetime = 250;
  jewellery.scale = 0.1; 
  jewelleryGroup.add(jewellery);
 }
}

function makeDiamonds(){
  if(World.frameCount % 400 == 0){
    diamonds = createSprite(Math.round(random(50, width-50), 40, 1, 1));
  diamonds.velocityY = 3;
  diamonds.addImage(diamondsImage);
  diamonds.lifetime = 250;
  diamonds.scale = 0.03; 
  diamondsGroup.add(diamonds);
 }
}

function makeObstacles(){
  if(World.frameCount % 500 == 0){
    sword = createSprite(Math.round(random(50, width-50), 40, 1, 1));
  sword.velocityY = 3;
  sword.addImage(swordImage);
  sword.lifetime = 250;
  sword.scale = 0.1; 
  swordsGroup.add(sword);
     }
}
