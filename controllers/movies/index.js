const express = require('express');
const router = express.Router();
const moviesMethods = require('./methods');
const authMiddleware = require('../../middlewares/authorization');

router.use(authMiddleware);



router.post('/list/:id/add', async (req, res) => {
    try {
        const movies = await moviesMethods.add(req.body);
        res.status(200).json({
            message: 'Pelicula registrada exitosamente.',
            data: movies
        });
    }catch (error) {
        res.status(400).json(error);
    }
});



router.get('/list/all', async (req, res) => {
    try {
        const listMoviesAll = await moviesMethods.listAll(req.body);
        res.status(200).json({
            message: 'List all movies.',
            data: listMoviesAll
        });
    }catch (error) {
        res.status(400).send(error);
    }
});


router.get('/list/:id', async (req, res) => {
    /*
    res.send("Endpoint para consultar la lista de peliculas de un usuario: " + 
    JSON.stringify(req.params.id));
    */
    try {        
        const id = req.params.id;
        const listMoviesById = await moviesMethods.listByID(id);
        res.status(200).json({
            message: 'List of movies by owner.' + id +'.',
            data: listMoviesById
        });
    }catch (error) {
        res.status(400).send(error);
    }    
});


router.delete('/list/:id/delete/:movie_id', (req, res) => {
    res.send("Endpoint para eliminar peliculas a una lista: ", 
    JSON.stringify(req.params));
});

router.put('/list/:id/rate', async(req, res) => {
    //res.send("Endpoint para calificar listas de otros usuarios");
    try {        
        const id = req.params.id;
        const UpdatelistMoviesById = await moviesMethods.listByIdAndUpdate(id, req);
        res.status(200).json({
            message: 'Update List of movies by owner.' + id +'.',
            data: UpdatelistMoviesById
        });
    }catch (error) {
        res.status(400).send(error);
    }  
});



module.exports = router;
