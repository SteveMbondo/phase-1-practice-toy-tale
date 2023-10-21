// index.js
document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');
  const toyForm = document.getElementById('toy-form');


  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => {
      data.forEach(toy => {
        const card = createToyCard(toy);
        toyCollection.appendChild(card);
      });
    });

    toyForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('toy-name').value;
    const image = document.getElementById('toy-image').value;
    const likes = 0;
    const newToy = { name, image, likes };

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(response => response.json())
      .then(data => {
        const card = createToyCard(data);
        toyCollection.appendChild(card);
      });

    toyForm.reset();
  });



  function createToyCard(toy) {
    const card = document.createElement('div');
    card.classList.add('card');

    const h2 = document.createElement('h2');
    h2.textContent = toy.name;

    const img = document.createElement('img');
    img.src = toy.image;
    img.classList.add('toy-avatar');

    const p = document.createElement('p');
    p.textContent = `${toy.likes} Likes`;

    const button = document.createElement('button');
    button.classList.add('like-btn');
    button.id = toy.id;
    button.textContent = 'Like ❤️';

    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);

    return card;
  }
});

