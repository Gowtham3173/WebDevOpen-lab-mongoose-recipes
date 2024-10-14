const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Add new recipes after existing ones are deleted
    return Recipe.insertMany(data);
  })
  .then(() => {
    // Find and display all recipes
    return Recipe.find();
  })
  .then(recipes => {
    recipes.forEach(r => {
      console.log(r.title);
    });

    // Update a recipe
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, 
      { duration: 100 },
      { new: true }
    );
  })
  .then(updatedRecipe => {
    console.log('Updated recipe:', updatedRecipe);

    // Delete a recipe
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Carrot Cake recipe has been successfully deleted!');
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
