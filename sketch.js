var play = 1;      
var end = 0;
var gameState = play;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score, survivalTime;
var ground;
var play;
var end;
var gameState = play;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(500,500);
  
 foodGroup = new Group();
 obstacleGroup = new Group();
  
  monkey = createSprite(50,250,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(70,350,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;  
  
  //score
  score = 0;
  //survival time
  survivalTime = 0;
  
}

function draw() {
  background(180);
  
   //display survival time
    stroke("black");
    fill("black");
    textSize(20);

   text("Survival Time: "+  survivalTime, 100, 50);
  
  //display score  
   stroke("black");
   fill("black");
   textSize(20);
  
  text("Score: "+  score, 300, 100);
  
   monkey.collide(ground);
  
 if(gameState === play) {
    
     // survival time
    survivalTime = survivalTime + Math.round(getFrameRate()/65);
     
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    // to make the monkey jump when space bar is pressed
    if(keyDown("space")&& monkey.y >=300) {
        monkey.velocityY = -16;
    }    
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score+1;
    }
       
     
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
   
  //groups lifetime
  obstacleGroup.setLifetimeEach(150);
     
     //Adding Functions
  food();
  obstacles();
  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.velocityY = 0; 
    gameState = end;
  }
}
  
  if (gameState === end) {
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
      ground.velocityX = 0;
      monkey.velocityY = 0;
    
     if (keyDown("R")){
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      survivalTime = 0;
      Score = 0;
      gameState = play; 
    }
    
    
     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 150, 200);
     
      stroke("black");
    fill("black");
       textSize(20);
     text("press 'R' to restart " , 150, 240); 
  }
 drawSprites(); 
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }
}

