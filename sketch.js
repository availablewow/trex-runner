var gameoversound,hop,ok
var gameoverimg,gameover,restoort,restart;
var PLAY =1;
var END=0;
var gameState = PLAY;
var trex, trex_running, trex_collided, trex_jump, pizzadeliveryman;
var ground, invisibleGround, groundImage, cloudy, cloud, cacti, catus, cacti2, catus2, catus3, cacti3, cacti5, catus5, sun, sans, mon, moon,cactigroup,cloudygroup,pteradactylGroup;
var score = 0;
localStorage["HighScore"] = 0;
function preload() {
  ok=loadSound("okay.wav")
  hop=loadSound("hop.wav")
  gameoversound=loadSound("game-over-sound.wav")
  gameoverimg=loadImage("gameover.png")
  restoort=loadImage("restart.png")
  mon = loadImage("moon.png")
  sans = loadAnimation("sun.png");
  trex_running = loadAnimation("trex2.png", "trex1.png", "trex3.png", "trex4.png")
  pizza = loadAnimation("pizzadeliveryman.png")
  trex_collided = loadImage("trex_collided.png");
  trex_jump = loadAnimation("trex1.png");
  groundImage = loadImage("ground2.png")
  cloudy = loadImage("cloud.png")
  cacti =  loadImage("cactus.png")
  cacti2 = loadImage("cactus2.png")
  cacti3 = loadImage("cactus3.png")
  cacti5 = loadImage("cactus5.png")
  
}

function setup() {

  
  createCanvas(600, 300);
  //creates sun
  sun = createSprite(500, 10, 20, 50);
  sun.addAnimation("sun", sans);
  sun.scale = 0.09;
  //creates ground
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);

  ground.x = ground.width / 2;
  pizzadeliveryman = createSprite(70, 200, 20, 50);
  //creates man
  pizzadeliveryman.addAnimation("pizzadeliveryman", pizza);
  pizzadeliveryman.scale = 0.08;
  trex = createSprite(170, 160, 20, 50);
  //trex
  trex.addAnimation("running", trex_running);
  
  trex.scale = 0.35;
 
  trex.addAnimation("trex_jump", trex_jump);
  
  gameover=createSprite(300,160);
  gameover.addImage("gameover", gameoverimg);
  restart=createSprite(300,250);
  restart.addImage("restart", restoort);
  invisibleGround = createSprite(200, 200, 400, 20);
  invisibleGround.visible = false

  var rand = Math.round(random(1, 100));
  cloudyGroup=createGroup();
  cactiGroup=createGroup();
  pteradactylGroup=createGroup();
  
  trex.setCollider("circle",0,0,80)
 restart.scale=0.3;
}


function draw() {
  //background
  background("lightblue");
  text("score:" + score, 500,50);
  textSize(12);
    
  textFont("comic sans");
  text("HIGH SCORE : " + localStorage["HighScore"],380,50);

  if(gameState === PLAY){
    restart.visible=false;
    gameover.visible=false;
     ground.velocityX = -(7+score/100);
    //day and night 
    if (score > 800) {
    background("darkblue");
    
  }


  if (score > 900) {
    background("black");
    
  }

  if (score > 1000) {
    background("darkblue");
    
  }
  if (score > 1200) {
    background("lightblue");
   
  }
  if (score > 1400) {
    background("lightblue");
    sun.setVelocity(0, 0)
    
  }
    //jumping
     if (keyDown("space") && trex.y>142||keyDown("up") && trex.y>142) {
  trex.velocityY = -15;
       hop.play();
    } 
   if(trex.y<142){
      trex.changeAnimation("trex_jump",trex_jump);
     
    
    }
    
    else {
      trex.changeAnimation("running", trex_running);
      
    }
  score += Math.round(getFrameRate() / 60);
  spawnClouds();
  spawnObstacle();
  spawnObstacle2();
    trex.velocityY = trex.velocityY + 1
   //checkpoint
    if (score % 100 === 0 && score>0){
      ok.play();
    }
    //reseting ground
    if (ground.x < -450) {
    ground.x = ground.width / 3;
      //trex is kill
  }    if(trex.isTouching(cactiGroup)){
    gameState=END;
gameoversound.play();
    
  } 
  }//after trex is kill
  else if(gameState === END){
    
    ground.velocityX =0;
    sun.setVelocity(0, 0);     
    trex.setVelocity(0,0);
    cactiGroup.setVelocityXEach(0);
    pteradactylGroup.setVelocityXEach(0);  
    cloudyGroup.setVelocityXEach(0);
    cactiGroup.setLifetimeEach(-1);
    cloudyGroup.setLifetimeEach(-1);  
    pteradactylGroup.setLifetimeEach(-1);
    trex.changeAnimation("trex_jump",trex_jump);
    gameover.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)) {
      reset();
    }
     }

  trex.collide(invisibleGround);
  pizzadeliveryman.collide(invisibleGround);
  
  drawSprites();

}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(610, Math.round(random(20, -10)), 40, 10);
    cloud.velocityX = -7
    cloud.addImage("cloud", cloudy)
    cloud.scale = 0.05
    cloud.depth = trex.depth;
    trex.depth += 1;
    cloud.lifetime = 86;
    cloudyGroup.add(cloud);
  }
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
    cactus = createSprite(Math.round(random(650, 730)), 160, 40, 10);
    cactus.velocityX =-(7+score/100);
    var selectImage = Math.round(random(1, 3))
    switch (selectImage) {
      case 1:
        cactus.addImage("cactus", cacti);
        break
      case 2:
        cactus.addImage("cactus2", cacti2);
        break
      case 3:
        cactus.addImage("cactus3", cacti3);
        break
      default:
        break
        
        
    }
    
     cactus.lifetime = 100;    
     cactus.scale = 0.3;
     cactiGroup.add(cactus)   
      trex.depth=gameover.depth;
      cactus.depth=gameover.depth;
      gameover.depth+=1

      cactus.setCollider("rectangle",0,0,50,100);
  }
}
function spawnObstacle2() {
  if (frameCount % 110 === 0) {
    cactus5 = createSprite(1000 , Math.round(random(30, 100)), 40, 10);
    cactus5.velocityX =  -(8+score/100);
    cactus5.addImage("cactus5", cacti5)
    cactus5.scale = 0.75;
    cactus5.lifetime = 190;    
    pteradactylGroup.add(cactus5)
     cactus5.setCollider("circle",0,0,30)
  }
}   
  
  
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  pteradactylGroup.destroyEach();
  cactiGroup.destroyEach();
  cloudyGroup.destroyEach();

  trex.changeAnimation("running",trex_running);
  if(localStorage["HighScore"]< score){
    localStorage["HighScore"] =  score
  }
  
  score = 0;

 }