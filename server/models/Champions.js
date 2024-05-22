const mongoose = require('mongoose');

/**
 * Définition du schéma pour les champions.
 * id : Identifiant unique du champion. Ce champ est obligatoire.
 * name : Nom du champion. Ce champ est obligatoire.
 * title : Titre du champion. Ce champ est obligatoire.
 */
const ChampionsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },title: {
        type: String,
        required: true,
    },

})
// Création du modèle Champions basé sur le schéma
const ChampionsModel= mongoose.model("champions", ChampionsSchema);
// Exportation du modèle pour l'utiliser dans d'autres fichiers
module.exports = ChampionsModel;