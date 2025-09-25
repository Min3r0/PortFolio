// Charger l'about me
fetch("text/about_me.txt")
  .then(response => response.text())
  .then(data => {
    const aboutElement = document.getElementById("aboutMe");

    // Séparer les paragraphes si besoin (2 sauts de ligne)
    const paragraphs = data.split(/\n\s*\n/);

    aboutElement.innerHTML = paragraphs
      .map(p => `<p>${p}</p>`)
      .join("");
  })
  .catch(error => console.error("Erreur de chargement du about me :", error));
