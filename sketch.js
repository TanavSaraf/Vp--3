var dog,sadDog,happyDog;
var feedButton, addFoodButton;
var food, foodStock;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedButton = createButton("Feed Dog")
  feedButton.position(800,150)
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton("Add Food")
  addFoodButton.position(880,150);
  addFoodButton.mousePressed(addFoods);

  food = new Food();

}

function draw() {
  background(46,139,87);

  food.display();
  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock()
  })
}

//function to add food in stock
function addFoods(){
  food++;
  database.ref('/').update({
    Food:food
  });

}