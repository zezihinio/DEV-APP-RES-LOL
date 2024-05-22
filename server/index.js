// Importation des modules nécessaires
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path'); 

const ChampionsModel = require("./models/Champions");
const BuildModel = require("./models/build");
const PlayerModel = require("./models/Player");

// Middleware pour parser les requêtes en JSON et gérer les CORS
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexion à la base de données MongoDB
mongoose.connect(
    "mongodb+srv://53650:w2pSglFAkgmOErOi@loldb.exbly9c.mongodb.net/LOLDB?retryWrites=true&w=majority&appName=dev-app-res"
)

// Route GET pour récupérer tous les champions de la base de données
app.get("/Champions", async (req, res) => {
    try {
        const champions = await ChampionsModel.find({});
        console.log("Champions from DB:", champions);  

        res.json(champions);
        
    } catch (err) {
        console.error("Error fetching champions:", err);  

        res.status(500).json(err);
    }
});
// Route GET pour récupérer toutes les builds de la base de données
app.get("/Builds", async (req, res) => {
    try {
        const builds = await BuildModel.find({});

        res.json(builds);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route POST pour créer un nouveau joueur
app.post('/createPlayer', async(req, res) => {    
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json('All fields (name, email, password) are required');
    }

    try {
        const newPlayer = new PlayerModel({ name, email, password });

        await newPlayer.save();
        res.json('Player created successfully');

    } catch (error) {
        console.error('Error creating player:', error);
        res.status(500).json('An error occurred while creating the player');
    }

});
// Route POST pour la connexion d'un joueur
app.post('/loginPlayer', async(req, res) => {    
    const { email, password } = req.body;    

    try {
        const player = await PlayerModel.findOne( {email} );
       
        if (!player) {
            return res.json('LOGIN_FAILED EMAIL, you entered : '+ email);
        }

        const isPasswordValid = await bcrypt.compare(password, player.password);
        if (!isPasswordValid) {
            return res.json('LOGIN_FAILED PASSWORD');
        }

        return res.json('LOGIN_SUCCESS');
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json('An error occurred during login');
    }});
// Route POST pour créer une nouvelle build
app.post('/Build', async(req, res) => {    
    const build = req.body;
    const newBuild = new BuildModel(build);
    await newBuild.save();

    res.json("BUILD_SUCCESS")
});
// Route DELETE pour supprimer une build par son nom
app.delete('/Build/:buildName', async (req, res) => {
    const { buildName } = req.params;

    if (!buildName) {
        return res.status(400).json('buildName is required');
    }

    try {
        const result = await BuildModel.findOneAndDelete({ buildName: buildName });
        if (result) {
            return res.json('DELETE_SUCCESS');
        } else {
            return res.status(404).json('Build not found');
        }
    } catch (error) {
        console.error('Error deleting build:', error);
        return res.status(500).json('An error occurred during deletion');
    }
});
// Route PUT pour mettre à jour une build par son nom
app.put('/Build/:buildName', async (req, res) => {
    const { buildName } = req.params;
    const { newBuildName, newPrimaryRune, newSecondaryRune, email } = req.body;

    if (!buildName || !email) {
        return res.status(400).json('buildName and email are required');
    }

    try {
        const player = await PlayerModel.findOne({ email });

        if (!player) {
            return res.status(400).json('Player not found');
        }

        const filter = { buildName: buildName, author: email };
        const update = {
            $set: {
                buildName: newBuildName,                
                primaryRune: newPrimaryRune,
                secondaryRune: newSecondaryRune
            }
        };

        const options = { new: true };
        const result = await BuildModel.findOneAndUpdate(filter, update, options);

        if (result) {
            return res.json('UPDATE_SUCCESS');
        } else {
            return res.status(404).json('Build not found or you do not have permission to update this build');
        }
    } catch (error) {
        console.error('Error updating build:', error);
        return res.status(500).json('An error occurred during the update');
    }
});

// Route pour afficher la page d'authentification
app.get('/auth', (req, res) => {
    res.render('AuthentificationPage', {
        authState: true,
        nameValue: '',
        emailValue: '',
        passwordValue: '',
        repeatPassword: '',
        emailLoginValue: '',
        passwordLoginValue: ''
    });
});

// Lancement du serveur sur le port 3001
app.listen(3001, () =>{
    console.log("SERVER RUNS PERFECTLY!")
});

