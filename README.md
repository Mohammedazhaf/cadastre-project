# 🗺️ Cadastre Web GIS

Application Web SIG permettant la visualisation interactive des **parcelles cadastrales du département de l’Aisne (02, France)**.

Le projet est conçu pour gérer un très grand volume de données (~1 million de parcelles) tout en restant rapide, fluide et optimisé grâce aux requêtes spatiales côté serveur.


---

## 🛠️ Technologies utilisées

### Backend
- Node.js
- Express.js
- PostgreSQL
- PostGIS

### Frontend
- HTML5
- CSS3
- JavaScript
- Leaflet.js
- OpenStreetMap

### Optimisations SIG
- Transformation EPSG:2154 → EPSG:4326
- Index spatial GIST
- Simplification des géométries
- Limitation dynamique des résultats
- Filtrage spatial via Bounding Box

---

## 📦 Installation Complète

### 1️⃣ Installer PostgreSQL et PostGIS

Créer la base de données :

```sql
CREATE DATABASE cadastre;
\c cadastre
CREATE EXTENSION postgis;
```

---

### 2️⃣ Importer les données cadastrales

Importer le shapefile :

```bash
shp2pgsql -I -s 2154 parcelle.shp parcelles | psql -U postgres -d cadastre
```

Créer un index spatial (si nécessaire) :

```sql
CREATE INDEX parcelles_geom_idx ON parcelles USING GIST(geom);
```

---

### 3️⃣ Lancer le Backend

```bash
cd backend
npm install
node server.js
```

Le serveur démarre sur :

```
http://localhost:3000
```

---

### 4️⃣ Ouvrir le Frontend

Ouvrir le fichier :

```
frontend/index.html
```

---

## 📈 Performance

Grâce à :

- L’index spatial GIST
- Les requêtes filtrées par zone visible
- La transformation des coordonnées directement en base
- La limitation dynamique du nombre de résultats

L’application reste fluide même avec environ 1 million de parcelles.

---

## 👨‍💻 Auteur

**Mohammed Azhaf**  
Développeur Full-Stack  