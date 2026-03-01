# Cadastre Web GIS — Application Interactive

Bienvenue sur **Cadastre Web GIS**, une application web pour visualiser les parcelles cadastrales du département Aisne (02, France) de manière interactive et fluide.

Cette application est conçue pour être **rapide**, **intuitive** et **facile à déployer**, même avec un très grand nombre de parcelles (~1 million).

---

## 🌐 Aperçu

- Carte interactive avec Leaflet.js
- Affichage dynamique des parcelles selon la zone visible
- Popup avec ID et surface des parcelles
- Survol pour mise en évidence
- Chargement optimisé grâce aux filtres spatiaux (Bounding Box)
- Compatible Windows, Mac et Linux

---

## 🛠 Technologies utilisées

**Backend :**

- Node.js
- Express.js
- PostgreSQL
- PostGIS

**Frontend :**

- HTML / CSS / JavaScript
- Leaflet.js
- OpenStreetMap

**Fonctionnalités SIG :**

- Transformation EPSG:2154 → EPSG:4326
- Spatial Index (GIST)
- Simplification des géométries
- Limitation du nombre de résultats pour performance


---

## 🔧 Installation et utilisation

### 1. Installer PostgreSQL et PostGIS

Assurez-vous que PostgreSQL est installé et PostGIS activé :

```sql
CREATE DATABASE cadastre;
\c cadastre
CREATE EXTENSION postgis;
### 2. Importer les données
Importer le shapefile des parcelles :

shp2pgsql -I -s 2154 parcelle.shp parcelles | psql -U postgres -d cadastre

Créer un index spatial pour optimiser les requêtes :

CREATE INDEX parcelles_geom_idx ON parcelles USING GIST(geom);

### 3. Configurer le backend
Se placer dans le dossier backend :

cd backend
npm install
node server.js

Le serveur tourne sur :

http://localhost:3000

### 4. Ouvrir le frontend
Ouvrir simplement :

frontend/index.html

👨‍💻 Auteur
Projet développé par Mohammed Azhaf — Développeur Full-Stack






