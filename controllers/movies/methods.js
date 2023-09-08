const jwt = require("jsonwebtoken");
const User = require('../../models/users');
const movieList = require("../../models/movieList");

const listAll = async (req, res) => {
    try {
      const listAllMovies  = await movieList.find();
      return listAllMovies;
    } catch (error) {
        return 'Error';
    }
};


const listByID = async (id) => {
    try {
      owner = JSON.stringify(id);
      const listMoviesById  = await movieList.find({ owner: owner });
      //return 'Error:'+ owner;
      return listMoviesById;
    } catch (error) {
        return 'Error:'+ id;
    }
};




const add = async (req, res) => {
    try {
        const newMovies = new movieList(req);
        await newMovies.save();
        return newMovies;
    }catch (error) {
        console.log(error);
        if (error.code === 11000) throw new error('Error insertando pelicula');
        else throw error;
    }
};

module.exports = { listAll, add, listByID }