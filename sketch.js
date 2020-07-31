//PLayer characters
//that is the basketball and its image
var basketball, basketball_img;

//baskets
var basket1, basket1_img, basket1Group, basket2, basket2_img, basket2Group;

//background clouds
var cloud, cloud_img;

//score
var score = 0;

var ground;

//saving the images in a variable
function preload(){
basketball_img = loadImage("Basketball.png");
basket1_img = loadImage("basket1.jpg");
basket2_img = loadImage("basket2.jpg");
cloud_img = loadImage("cloud2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

//basketball
 basketball = createSprite(windowWidth/2, windowHeight/2);
 basketball.addImage(basketball_img);
  basketball.scale = 0.09

  //basket groups to use it anywhere we want
 basket1Group = new Group();
 basket2Group = new Group();
 
 ground = createSprite(windowWidth/2,windowHeight - 5,windowWidth,10);
 ground.shapeColor = "#0051C7";
}

function draw() {
  background("#0051C7");
  
//movement of baskeball on basis of arrows
    if(touches.length > 0 || keyCode === 38){
      basketball.y = basketball.y-6; 
      touches = [];  
    }
    if( touches.length > 0 || keyCode === 37){
      basketball.x = basketball.x -6;
      touches = [];
    }
  
    if( touches.length > 0 || keyCode === 40){
      basketball.y = basketball.y + 6;
      touches = []; 
      }
    if(touches.length > 0 || keyCode === 39){
        basketball.x = basketball.x + 6; 
        touches = [];
        }
    
    //if the basket hits the ball add score and remove the basket  
      for (var i = 0; i < basket1Group.length; i++) {
         if (basket1Group.isTouching(basketball)) {
           basket1Group.get(i).destroy();
          score++;
        }}

        for (var i = 0; i < basket2Group.length; i++) {
          if (basket2Group.isTouching(basketball)) {
          basket2Group.get(i).destroy();
          score++;
        }}
       
        //decreasing the score when basket crosses the screen
        for (var y = 0; y < basket1Group.length; y++) {
          if (basket1Group.get(y).isTouching(ground) ) {
           basket1Group.get(y).destroy();
           score--; 
          }}

          for (var y = 0; y < basket2Group.length; y++) {
            if (basket2Group.get(y).isTouching(ground) ) {
             basket2Group.get(y).destroy();
             score--; 
            }}
    
    
//if ball goes out of canvas decrease score
    if(basketball.x < 0 || basketball.x > windowWidth || basketball.y < 0 || basketball.y > windowHeight){
      score = score - 1;
    }   
    //spawning clouds
     spawnClouds();
     //spawning baskets 
    baskets();
    
    
  drawSprites();
  //instructions and score text display
  textSize(30);
  fill("yellow");
  text("Score: " + score,windowWidth/2,35);
  textSize(27.5);
  text("Move with arrow keys or joystick", 10 , windowHeight - 30);
}

//spawn clouds
function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    cloud = createSprite(200,-150);
    cloud.addImage(cloud_img);
    cloud.x = Math.round(random(10,windowWidth-30));
    cloud.scale = 0.1;
    cloud.velocityY = 3;
    cloud.depth = basketball.depth;
    basketball.depth = basketball.depth + 1;
  }
}

//function for baskets  
function baskets(){
 if(frameCount % 100 === 0 ){
  basket1 = createSprite(44,-10);
  basket1.addImage(basket1_img);
  basket1.scale = 0.2
  basket1.velocityY = 2;
  basket1.lifetime = 330;
  basket1Group.add(basket1);

  basket2 = createSprite(windowWidth - 50,-111);
  basket2.addImage(basket2_img);
  basket2.scale = 0.2
  basket2.velocityY = 2;
  basket2.lifetime = 444;
  basket2Group.add(basket2);
}
 }