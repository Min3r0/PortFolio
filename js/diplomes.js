fetch("text/diplomes.txt")
  .then(response => response.text())
  .then(data => {
    const container = document.getElementById("etudeContent");
    const lignes = data.trim().split("\n");

    lignes.forEach((ligne, index) => {
      const [date, titre] = ligne.split("|").map(s => s.trim());

      const article = document.createElement("article");
      article.classList.add("etude_item");
      article.innerHTML = `
        <h3 class="etude_date">${date}</h3>
        <h2 class="etude">${titre}</h2>
      `;

      container.appendChild(article);

      if (index < lignes.length - 1) {
        const separator = document.createElement("div");
        separator.classList.add("ligne");
        container.appendChild(separator);
      }
    });
  })
  .catch(error => console.error("Erreur de chargement :", error));
