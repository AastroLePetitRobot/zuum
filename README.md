# zuum

Zuum est un projet réalisé dans le cadre de notre projet d'Ingénierie LOGicielle en année de M2 à l'IMT Nord Europe.

Ce projet a pour vocation la création d'un application web permettant l'upload de fichiers sous forme d'URL ou de fichiers au sein d'espaces de travail (référencés sous le terme de Rooms par la suite) consultables par plusieurs utilisateurs 

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## Features attendues

- Un utilisateur de l'application ayant créé une salle virtuelle est un conférencier 
- Une salle virtuelle est identifiée par un lien 
- Le conférencier peut entrer dans une salle qu'il a créée :
  - Pour préparer la conférence
  - Pour l'ouvrir au public au moment de la conférence 

- Le lien de la salle virtuelle est diffusé au public de la conférence
- Les utilisateurs présents dans une salle sont appelés membres ;

- Le conférencier peut entrer dans la salle virtuelle pour :
  - préparer une liste d'urls à diffuser lors de la conférence 
  - téléverser des documents dans la salle virtuelle 

- Chaque page de document téléversé insère une url dans la liste ;
- Des urls externes peuvent aussi être insérées dans la liste ;
- L'ordre des urls dans la liste peut être modifié ;
- Une url peut être dupliquée et déplacée pour apparaître plusieurs fois dans la liste.

## Notre réalisation 

Actuellement le projet comporte deux composantes majeures :

- Un système d'authentification où il est possible de créer des comptes et de s'y connecter 

- Les "rooms" qui permettent de charger des documents sous la forme d'URL de fichiers
  - Il est possible de supprimer des documents de la room
  - Il est possible d'ouvrir des documents, lorsqu'un utilisateur ouvre un document, il est ouvert sur les navigateurs de tous les utilisateurs connectés à l'application

## Les technologies utilisées 

Le projet utilise plusieurs technologies pour son bon fonctionnement : 

- Nuxt.js qui est un framework SPA qui permet la création rapide d'une application web ainsi que d'un serveur API dans le même projet pour gagner en efficacité. 

- Socket.io qui est un package permettant l'implémentation de WebSockets qui sont critique à un fonctionnement synchrone de notre application. 

- MongoDB, afin de stocker toutes les données afférentes aux utilisateurs ainsi qu'aux Rooms

- Une version d'essai de l'application a été déployée sur un conteneur orchestré via Kubernetes

- Docker afin de pouvoir lancer l'application sur un conteneur Docker sans avoir besoin de gérer des problèmes d'environnements / dépendences 

- Github Actions afin de construire automatiquement les images Docker du projet et les mettre à disposition dans le cadre de déploiements continus.

- Azure Storage, afin de stocker les documents sous forme de blob en ligne 


## Nos difficultés 

- Nous avons été un peu ambitieux sur l'usage des technologies pour faire fonctionner le site web, l'usage des Websockets et les subtilités associées (créer un serveur Websocker, créer des sous-divisions par espaces de travail pour les sockets) a nécéssité un temps conséquent d'apprentissage en plus du temps d'implémentation sur l'application finale, réduisant les possibilités pour développer toutes les features attendues sur le site.

- La partie Websocket a notamment était compliquée à transcrire en TypeScript dû à un certain manque d'exemple et de documentation pour du TypeScript

- Ayant avancé sur le projet séparemment suite à des besoins d'entreprise / créneaux d'autoformation différents, nous avons eu des difficultés à rassembler nos travaux en un ensemble cohérent (notamment sur l'affectation de droit sur les rooms à différent types d'utilisateurs)