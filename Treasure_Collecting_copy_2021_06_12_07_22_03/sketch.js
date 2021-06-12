var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var GameState = "play";

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
  // Moving background
  path=createSprite(windowWidth/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(1,windowHeight,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  boy.setCollider("circle",0,0,700)
  boy.debug = false;
  
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() {

  background(0);
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  boy.x = World.mouseX;
  
  if (GameState === "play") {
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = windowHeight/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createEND();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;      
    }
    if(swordGroup.isTouching(boy)) {
      GameState = "end";
  }
    
  }
  
 
 if (GameState === "end") {

        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        path.velocityY = 0;
        boy.destroy();
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        gameover.visible = true;
   
  
        
        if (mousePressedOver(gameover)){
    reset();
  }
    }
  
  
  
  

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(20, windowWidth),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = windowHeight;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(20, windowWidth),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = windowHeight;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(20, windowWidth),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = windowHeight;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(20, windowWidth),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = windowHeight;
  swordGroup.add(sword);
  }
}
function createEND(){
  gameover = createSprite(windowWidth/2,windowHeight/2,0,0);
  gameover.addImage(endImg);
  gameover.scale = 0.9;
  gameover.visible = false;
  
}

function reset(){
  
  GameState = "play";
  boy = createSprite(70,windowHeight,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  boy.setCollider("circle",0,0,700)
  boy.debug = false;
  gameover.visible = false;
  swordGroup.destroyEach();
  
  path.velocityY = 4;
  
  if(path.y > 400 ){
    path.y = windowHeight/2;
  }
  treasureCollection = 0;
}