const jwt = require("jsonwebtoken");
const User = require('../../models/users');

const createToken = async (user, role) => {
    const tokenPayload = {
        "username": user,
        "role": role
    }
    const token = await jwt.sign(
        tokenPayload, 
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_TTL}
    );

    return token;

}

const registerUser = async (payload) => {
    try {
        const newUser = new User(payload);
        await newUser.save();
        return newUser;
    }catch (error) {
        console.log(error);
        if (error.code === 11000) throw new error('Usuario no disponible');
        else throw error;
    }
};

const loginUser = async (username, password) => {

    const user = await User.findOne({ nickname: username });
    if (!user) throw new error('Usuario no encontrado.');

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new error('Contraseña invalida.');

    return await createToken(username, "normal");

};

const listUser = async (req, res) => {

    const listUser = await User.find();
    return listUser;

};

const listAll = async (req, res) => {
    try {
      const listAll  = await User.find();
      return listAll;
    } catch (error) {
        return 'Error';
    }
};

module.exports = { createToken, registerUser, loginUser, listUser, listAll }