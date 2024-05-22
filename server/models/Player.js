const mongoose = require('mongoose');

/**
 * Définition du schéma pour les joueurs.
 * name : Nom du joueur. Ce champ est obligatoire.
 * email : Adresse email du joueur. Ce champ est obligatoire.
 * password : Mot de passe du joueur. Ce champ est obligatoire.
 */

const PlayersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }  
});
// Création du modèle Player basé sur le schéma
const PlayerModel = mongoose.model("players", PlayersSchema);
// Exportation du modèle pour l'utiliser dans d'autres fichiers
module.exports = PlayerModel;