var balloon, database;
var position;

function preload(){
    balloonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
    back = loadImage("Hot Air Ballon-01.png");


}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  balloon = createSprite(250,250,10,10);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.7;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw(){
  background(back);
    textSize(10);
    text("Use Arrow keys to give the movement and Key 'H' to reduse size of balloon",5,50);

    if(keyDown(LEFT_ARROW)){
      balloon.x = balloon.x -10;
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.x = balloon.x +10;
    }
    else if(keyDown(UP_ARROW)){
      balloon.y = balloon.y -10;
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.y = balloon.y +10;
    }

    if(keyDown("h")){
      updateHeight(0,-10);
      balloon.addAnimation("balloon",balloonImg);
      balloon.scale = balloon.scale - 0.01;
    }


    drawSprites();
  
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readPosition(data){
  height = data.val();
  console.log(height.x);
  height.x = height.x;
  height.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}