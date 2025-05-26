const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/connexion', (req, res) => {
  const { identifiant, motdepasse } = req.body;

  fs.readFile('./utilisateurs.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });

    const utilisateurs = JSON.parse(data);
    const utilisateur = utilisateurs.find(u => u.identifiant === identifiant);

    if (!utilisateur) {
      return res.status(401).json({ message: "Identifiant incorrect" });
    }

    if (utilisateur && utilisateur.motdepasse === motdepasse) {
      res.status(200).json({ message: "Connexion réussie !" });
    } else {
      res.status(401).json({ message: "Identifiant ou mot de passe incorrect." });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`);
});
