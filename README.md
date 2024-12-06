# Test Technique - Développeur Fullstack

## Description
Ce projet est une application fullstack composée d'un backend en Symfony et d'un frontend en utilisant une technologie moderne (ReactJs). Le backend gère la logique serveur, la base de données et l'API, tandis que le frontend fournit l'interface utilisateur. Le projet a été développé dans le cadre du test technique pour le recrutement chez Teach'r.


## Instructions d'Installation

### Backend

1. **Accédez au dossier du backend** 
   cd backend
2. **Installez les dépendances avec Composer :** 
    composer install
3. **Lancez les conteneurs Docker pour la base de données :** 
   docker compose up -d
4. **Créer l abase de données:** 
   symfony console doctrine:database:create --if-not-exists
   symfony console doctrine:migrations:migrate
   symfony console doctrine:fixtures:load
5. **Lancez le serveur Symfony en mode détaché  :** 
   symfony serve -d 

### Frontend

1. **Accédez au dossier du frontend :** 
   cd frontend
2. **Installez les dépendances avec npm  :** 
    npm install
3. **Lancez le serveur de développement :** 
    npm run dev
    Ouvrez le projet dans votre navigateur : Allez sur http://localhost:5173/ pour voir l'application frontend en action.
