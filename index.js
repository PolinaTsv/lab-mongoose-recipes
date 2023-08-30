const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
data.push({
  title: "Polina's Chocolate Chip Cookies",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup light brown sugar",
    "1 large egg",
    "2 tablespoons milk",
    "1 1/4 teaspoons vanilla extract",
    "2 cups semisweet chocolate chips",
  ],
  cuisine: "French",
  dishType: "dessert",
  image:
    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
  duration: 30,
  creator: "Chef Jennifer",
});

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

mongoose.set("strictQuery", false);

(async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${connection.connection.name}"`);

    await Recipe.deleteMany();

    const recipes = await Recipe.create(data);
    recipes.forEach((recipe) => {
      console.log(recipe.title, recipe.duration);
    });

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { returnDocument: "after" } // This option returns the updated document
    );

    const removedRecipe = await Recipe.findOneAndDelete(
      { title: "Carrot Cake" },
    );

    console.log(removedRecipe);
  } catch (error) {
    console.error("Error:", error);
  }
})();
