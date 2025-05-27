document.querySelector("button").addEventListener("click", () => {
  const identifiant = document.getElementById("identifiant").value;
  const motdepasse = document.getElementById("motdepasse").value;

  fetch("https://arthurandco.onrender.com/connexion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifiant, motdepasse }),
  })
    .then(res => res.json().then(data => ({ status: res.status, body: data })))
    .then(({ status, body }) => {
      if (status === 200) {
        window.location.href = "/main.html";
      } else {
        alert(body.message || "Erreur");
      }
    })
    .catch(() => alert("Erreur réseau"));
});
