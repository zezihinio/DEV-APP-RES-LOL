const mongoose = require('mongoose');

// Définition du schéma pour les builds
/**
 * BuildSchema : 
 * championName : Nom du champion pour lequel la build est créée. Ce champ est obligatoire.
 * buildName : Nom de la build. Ce champ est obligatoire.
 * primaryRune : Objet représentant la rune primaire. Ce champ est obligatoire.
 * secondaryRune : Objet représentant la rune secondaire. Ce champ est obligatoire.
 * comment : Commentaire facultatif sur la build.
 * author : Auteur de la build, facultatif.
 */
const BuildSchema = new mongoose.Schema({
    championName: {
        type: String,
        required: true,
    },
    buildName: {
        type: String,
        required: true,
    },
    primaryRune: {
        type: Object,
        required: true,
    },
    secondaryRune: {
        type: Object,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    author: {
        type : String,
        required: false
    }
       

})
// Création du modèle Build basé sur le schéma
const BuildModel= mongoose.model("build", BuildSchema);
// Exportation du modèle pour l'utiliser dans d'autres fichiers
module.exports = BuildModel;