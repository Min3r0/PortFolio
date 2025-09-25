fetch('about_me.txt')
  .then(response => response.text())
  .then(text => {
    // Remplace les sauts de ligne par <br> pour conserver la mise en page
    document.getElementById('about_me').innerHTML = text.replace(/\n/g, '<br>');
  })
  .catch(error => console.error('Erreur lors du chargement du texte :', error));