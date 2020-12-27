import React, { useState } from "react";
import Axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Recipe from "./components/recipe";
import Alert from "./components/Alert";

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "88e62e6a";
  const APP_KEY = "81a7d7485d6a8f416b8667247b6448fc";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query != "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1>Outstanding Recipes</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert != "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map((recipe) => <Recipe recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;

// {recipes !== [] && recipes.map((recipe) => <Recipe recipe={recipe} />)}
