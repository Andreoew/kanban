/** help */
function log(message) {
  console.log('> ' + message);
}

const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.cards');

cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('drag', drag);
  card.addEventListener('dragend', dragEnd);
});

function dragStart() {
  console.log('Drag start:', this);
  dropzones.forEach(dropzone => dropzone.classList.add('highlight'));
  this.classList.add('is-dragging');
}

function drag() {
  // log('Card: Is dragging')
}

function dragEnd() {
  dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));
  this.classList.remove('is-dragging');
}


dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragenter', dragenter);
  dropzone.addEventListener('dragover', dragover);
  dropzone.addEventListener('dragleave', dragleave);
  dropzone.addEventListener('drop', drop);
});

function dragenter() {
  // log('Dropzone: Enter in zone')
}

function dragover(event) {
  event.preventDefault();
  this.classList.add('over');

  const cardBeingDragged = document.querySelector('.is-dragging');
  this.appendChild(cardBeingDragged);
}

function dragleave() {
  this.classList.remove('over');
}

function drop() {
  this.classList.remove('over');

  // Remove a classe "is-dragging" do cartão solto
  const cardBeingDragged = document.querySelector('.is-dragging');
  cardBeingDragged.classList.remove('is-dragging');

  // Remove todas as classes de status do cartão solto
  cardBeingDragged.querySelectorAll('.status').forEach(status => {
    status.classList.remove('green', 'blue', 'red');
  });

  // Verifica em qual coluna o cartão foi solto e atualiza a cor do status
  if (this.parentElement.classList.contains('todo')) {
    cardBeingDragged.querySelector('.status').classList.add('red'); // A fazer
  } else if (this.parentElement.classList.contains('doing')) {
    cardBeingDragged.querySelector('.status').classList.add('blue'); // Fazendo
  } else if (this.parentElement.classList.contains('done')) {
    cardBeingDragged.querySelector('.status').classList.add('green'); // Feito
  }
}

