//Create variables here
var dog , dogImg, dogHappy;
var database;
var foodStock, foods;
var milkImg, foodObj;
var feedDog, addFood;
var fedTime, lastfed;


function preload()
{
  //load images here
  dogImg = loadImage("../images/dogImg.png");
  dogHappy = loadImage("../images/dogImg1.png");
  
}

function setup() {
  createCanvas(1100, 500);
  
  database = firebase.database();

  

  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  foodObj = new Food();

  feedDog = createButton("Feed The Dog");
  feedDog.position(700, 95);
  feedDog.mousePressed(FeedDog);

  addFood = createButton("Add Milk");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);

  foodObj.display();
  
  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastfed = data.val();
  });

  drawSprites();
  //add styles here
  fill(255, 255, 254)
  textSize(15);
  if(lastfed >= 12){
    text("Last Fed : " + lastfed%12 + "PM", 350, 30)
  } else if(lastfed == 0){
    text("Last Fed : 12 AM", 350, 30)
  } else {
    text("Last Fed: " + lastfed + "AM", 350, 30)
  }

}




function FeedDog(){
  dog.addImage(dogHappy)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
      food:foodObj.getFoodStock(),
      feedTime: hour()
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    food: foods
  })
}
