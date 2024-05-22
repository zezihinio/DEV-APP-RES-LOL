#!/bin/bash

# Définir les variables
DATABASE="LOLDB"
COLLECTION="champions"
CSV_FILE_PATH="/Champions_Data.csv"
MONGO_HOST="localhost"
MONGO_PORT="27017"

# Convertir le fichier CSV en collection MongoDB
mongoimport --host $MONGO_HOST --port $MONGO_PORT --db $DATABASE --collection $COLLECTION --type csv --headerline --file $CSV_FILE_PATH

# Vérifier si l'importation a réussi
if [ $? -eq 0 ]; then
    echo "Le fichier $CSV_FILE_PATH a été importé avec succès dans la collection $COLLECTION de la base de données $DATABASE."
else
    echo "Une erreur s'est produite lors de l'importation du fichier $CSV_FILE_PATH."
fi
# Pour rendre exectable : chmod +x import_champions.sh
# Pour executer : ./import_champions.sh

