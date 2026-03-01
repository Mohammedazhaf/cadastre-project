const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

/*
Active CORS pour permettre au frontend d'accéder à l'API
*/
app.use(cors());


/*
Connexion à PostgreSQL / PostGIS
*/
const pool = new Pool({
    user: "postgres",
    password: "1234",
    database: "cadastre",
    host: "localhost",
    port: 5432
});


/*
Endpoint principal pour récupérer les parcelles

Utilise une bounding box pour charger uniquement
les parcelles visibles sur la carte.

Exemple:
GET /parcelles?bbox=3.0,49.0,4.0,50.0
*/
app.get("/parcelles", async (req, res) => {

    try {

        const bbox = req.query.bbox;

        /*
        Vérifie que bbox est fourni
        */
        if (!bbox) {
            return res.status(400).json({ error: "bbox required" });
        }

        /*
        Extraction des coordonnées bbox
        */
        const [minLng, minLat, maxLng, maxLat] =
        bbox.split(",").map(Number);


        /*
        Requête spatiale PostGIS

        ST_Transform : convertit Lambert 93 vers WGS84
        ST_Intersects : filtre spatial
        ST_AsGeoJSON : conversion pour Leaflet
        ST_Area : calcule surface
        */
        const query = `
        SELECT 
            gid,

            ST_AsGeoJSON(
                ST_Transform(geom, 4326)
            ) as geojson,

            ST_Area(geom) as surface

        FROM parcelles

        WHERE ST_Intersects(
            geom,
            ST_Transform(
                ST_MakeEnvelope($1, $2, $3, $4, 4326),
                2154
            )
        )

        LIMIT 5000
        `;


        const result = await pool.query(query, [
            minLng,
            minLat,
            maxLng,
            maxLat
        ]);


        /*
        Retourne les données au frontend
        */
        res.json(result.rows);

    }
    catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

});


/*
Démarrage du serveur
*/
app.listen(3000, () => {

    console.log("Server running on http://localhost:3000");

});