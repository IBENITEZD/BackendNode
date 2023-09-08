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

// retorna la lista de peliculos por id
const listByID = async (id) => {
    try {
      const listMoviesById  = await movieList.findById(id);
      //return 'Error:'+ owner;
      return listMoviesById;
    } catch (error) {
        return 'Error:'+ id;
    }
};

// actualiza la lista de peliculas por id
const listByIdAndUpdate = async (id, req) => {
    try {
      const listByIdAndUpdate  = await movieList.findByIdAndUpdate(id, req.body);
      //return 'Error:'+ owner;
      if (!listByIdAndUpdate) {
        return res.status(404).json({ message: 'Lista no encontrada por id '+id });
      };
      return listByIdAndUpdate;
    } catch (error) {
        return 'Error:'+ id;
    }
};

// borrar la lista de peliculas por id
const RemoveMoviesById = async (id) => {
    try {
      const RemoveMovies  = await movieList.findByIdAndRemove(id);
      //return 'Error:'+ owner;
      if (!RemoveMovies) {
        return res.status(404).json({ message: 'Registro no encontrado por id '+id });
      };
      return RemoveMovies;
    } catch (error) {
        return 'Error:'+ id;
    }
};



//adiciona lista de peliculas
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

module.exports = { listAll, add, listByID, listByIdAndUpdate, RemoveMoviesById }