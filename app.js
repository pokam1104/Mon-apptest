let produits = JSON.parse(localStorage.getItem("produits")) || [];

function ajouterProduit() {
  let nom = document.getElementById("nom").value;
  let prix = parseInt(document.getElementById("prix").value);
  let stock = parseInt(document.getElementById("stock").value);

  if (!nom || !prix || !stock) {
    alert("Remplis tous les champs !");
    return;
  }

  produits.push({ nom, prix, stock });

  sauvegarder();
  afficherProduits();
}

function afficherProduits() {
  let liste = document.getElementById("liste");
  liste.innerHTML = "";

  let total = 0;

  produits.forEach((p, index) => {
    total += p.prix * p.stock;

    let li = document.createElement("li");
    li.innerHTML = `
      ${p.nom} - ${p.prix} FCFA - Stock: ${p.stock}
      <button onclick="supprimerProduit(${index})">❌</button>
      <button onclick="vendre(${index})">💰</button>
    `;
    liste.appendChild(li);
  });

  document.getElementById("totalProduits").textContent = produits.length;
  document.getElementById("valeurStock").textContent = total + " FCFA";
}

function supprimerProduit(index) {
  produits.splice(index, 1);
  sauvegarder();
  afficherProduits();
}

function vendre(index) {
  if (produits[index].stock > 0) {
    produits[index].stock--;
  } else {
    alert("Stock vide !");
  }

  sauvegarder();
  afficherProduits();
}

function sauvegarder() {
  localStorage.setItem("produits", JSON.stringify(produits));
}

afficherProduits();