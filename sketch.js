var doodle ,doodle1img ,doodle2img ,pageimg ,page,doodle3img, rocketimg, doodle4img ;
var gamestate="play";
var greenGroup,brownGroup;
var invisibleBlock;
var gplatform,bplatform;
var edges;
var brownx = 0;
var browny = 0;
var flycounter = 0;
var allienattack = false;
var score = 0;
var highscore = 0;
var button;
//preload images
function preload(){  
  pageimg = loadImage("back.png");
  doodle1img = loadAnimation("doodle_left-removebg-preview.png");
  doodle2img = loadAnimation("right.png");
  doodle3img = loadAnimation("attack1.png","attack2.png","attack3.png","attack4.png");
   rocketimg = loadImage("rocket.png");
   doodle4img = loadAnimation("doodlefly.png");
   doodle5img = loadImage("Doodle_jump_icon.png")
  gplatform = loadImage("greenplatform.png");
  bplatform = loadAnimation("brownplatform.png");
  bplatform2 = loadAnimation("bplatform2.png")
  allien1img = loadImage("allien1.png");
  allien2img = loadImage("allien2.png");
  allien3img = loadImage("allien3.png");
  }
  // setup of characters
function setup(){
createCanvas(600,800)  
 page= createSprite (300,400,600,800);  
 page.addImage(pageimg);
 page.scale=1.25;
  doodle= createSprite(300,640,50,50);
 doodle.addAnimation("left",doodle1img);
 doodle.addAnimation("right",doodle2img);
 doodle.addAnimation("attack",doodle3img);
 doodle.addAnimation("fly",doodle4img);
 doodle.debug = true;
 doodle.setCollider("rectangle",0,0,100,100)
 doodle.scale = 0.6;
 invisibleBlock= createSprite(300,650,600,10);
 invisibleBlock.visible = false;
  //define Groups
   greenGroup= new Group(); 
  brownGroup= new Group();
  rocketGroup= new Group();
  allienGroup = new Group();
   edges =  createEdgeSprites();
   button = createButton("Replay")
   button.position(10,10)
}

function draw(){
  background(0);
  doodle.collide(edges[0]);
  doodle.collide(edges[1]);
  doodle.collide(edges[2]);

  if(gamestate==="play"){
    //reset background
 if (page.y>500){
  page.y=400; 
 }
  page.velocityY = 3;
  button.hide();
  doodle.collide(invisibleBlock);
    if(keyDown("right")){
    doodle.x = doodle.x + 8;
    doodle.changeAnimation("right",doodle2img);
    doodle.scale = 0.6;
    doodle.setCollider("rectangle",0,0,100,100)
  }
  if(keyDown("left")){
    doodle.x = doodle.x - 8;
    doodle.changeAnimation("left",doodle1img);
    doodle.scale = 0.6;
    doodle.setCollider("rectangle",0,0,100,100)
  }
  if(keyDown("space") ){
    doodle.y = doodle.y - 8;
    doodle.changeAnimation("attack",doodle3img);
    doodle.setCollider("rectangle",0,0,100,300)
    doodle.frameDelay = 10;
    doodle.scale = 0.7;
    allienattack = true;
  }
  //doodle comes down
  doodle.velocityY = doodle.velocityY + 0.8;

  if(greenGroup.isTouching(invisibleBlock)){
   
      invisibleBlock.destroy();

            
  }

  if(greenGroup.isTouching(doodle)){
    doodle.velocityY = 0;
    score = score + 10;
    if(keyDown("up")){
      doodle.velocityY = -15;
    }
  }

   for(var i=0; i< brownGroup.length;i++){
      if(doodle.isTouching(brownGroup.get(i))){
        brownGroup.get(i).changeAnimation("2", bplatform2);
        brownGroup.get(i).scale = 0.9;
  score = score + 5;
          doodle.velocityY = doodle.velocityY + 0.8;
        
       
      }
    }
    if(allienGroup.isTouching(doodle)) {
      if(allienattack){
        allienGroup.destroyEach();
        score = score + 50;
        allienattack = false;
      
      }
      else {
        gamestate = "end"
      }
    }
     
  if(rocketGroup.isTouching(doodle)){
    gamestate = "fly";
    score = score +100;
  }
  SpawnAllien();
  SpawnRocket();
  SpawnGreen();
  SpawnBrown();
  drawSprites(); 
  textSize(25);
  fill("grey");
  textFont("Arial");
  text("Score : "+score,50,50);

  if(doodle.y>800){
    gamestate = "end"
    
  }
  //***** play ends here**********/
  }
   
 if (gamestate==="end"){

   image(pageimg,0,0,600,800)
   image(doodle5img,250,400,150,150)
   button.show();
  stroke("black"); 
   fill("blue");
   textSize(40);
   text("Game Over", 230,280) 
  
   textSize(25);
  fill("grey");
  textFont("Arial");
  text("Score : "+score,250,200);
  text("High Score: " + highscore,250,230)
   button.mousePressed(
     function(){
      
      gamestate = "play";
      doodle.y = 600;
      invisibleBlock= createSprite(300,650,600,10);
      invisibleBlock.visible = false;
      if( score>highscore){
        highscore = score;
      }
      score = 0;
     });    
                         
 }
 if(gamestate === "fly"){
  rocketGroup.destroyEach();
  doodle.changeAnimation("fly",doodle4img);
  doodle.setCollider("rectangle",0,0,100,100)
  doodle.velocityY = -25;
  doodle.scale = 0.4
  drawSprites(); 
  flycounter++
  page.velocityY = 3;
  if (page.y>500){
    page.y=400; 
   }
 }

 if(flycounter === 25){
   flycounter = 0;
   doodle.changeAnimation("fly",doodle1img);
   doodle.setCollider("rectangle",0,0,100,100)
   gamestate = "play"
 }
  
}
//generate/spawn the green platform
function SpawnGreen(){
  
if(frameCount%60===0){
  green= createSprite(300,-10,50,10);
 // green.shapeColor = "green";
  green.addImage(gplatform);
  
  green.setCollider("rectangle",0,0,120,20)
  green.velocityY =2 ;
  green.x=Math.round(random (100,500));
  green.depth=doodle.depth;
  doodle.depth++;
  green.lifetime=1000;
  
 greenGroup.add(green);
   
}  
}
function SpawnBrown(){
  
  if(frameCount%150===0){
    brown= createSprite(300,-10,50,10);
    brown.shapeColor = "brown";
   brown.addAnimation("1", bplatform);
   brown.addAnimation("2", bplatform2);
   brown.scale = 2;
   
  brown.setCollider("rectangle",0,0,50,10)
  brown.velocityY =2 ;
  brown.x=Math.round(random (100,500));
  brown.depth=doodle.depth;
  doodle.depth++;
  brown.lifetime=1000;
    
   brownGroup.add(brown);  
  }  
  
} 
function SpawnRocket(){
  
  if(frameCount%300===0){
    rocket= createSprite(300,-10,50,10);
    //green.shapeColor = "green";
    rocket.addImage(rocketimg);
    rocket.scale = 0.75;
  rocket.velocityY =2 ;
  rocket.x=Math.round(random (100,500));
  rocket.depth=doodle.depth;
  rocket.depth++;
  rocket.lifetime=1000;
    
  rocketGroup.add(rocket);
     
  }  
  }

  function SpawnAllien(){
  
    if(frameCount%500===0){
      allien= createSprite(300,50,50,10);
      //green.shapeColor = "green";
      var n = Math.round(random(1,3));
      switch(n){
        case 1:   allien.addImage(allien1img);
                  allien.scale = 0.8;
                  allien.setCollider("rectangle",0,0,80,200)
                  break;
        case 2: allien.addImage(allien2img);
                allien.scale = 0.8;
                allien.setCollider("rectangle",0,0,80,200)
                  break;
        case 3: allien.addImage(allien3img);
  //              allien.scale = 0.5;
                allien.setCollider("rectangle",0,0,80,200)
                  break;
      }
    allien.debug = true
    //  rocket.scale = 0.75;
    allien.velocityY =2 ;
    allien.x=Math.round(random (100,500));
    allien.lifetime=1000;
      
    allienGroup.add(allien);
       
    }  
    }


