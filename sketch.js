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
  database.ref('food').on('value',(data)=>{
    foodStock=data.val()
  })
}

function draw() {
  background(46,139,87);

  food.display();
  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);

  food.updateStock(food.getFoodStock()-1);
  database.ref('/').update({
    food:food.getFoodStock()
  })
}

//function to add food in stock
function addFoods(){
  var foods=food.getFoodStock()
  console.log(foods)
  
  database.ref('/').update({
    food:foods +1
  });

}