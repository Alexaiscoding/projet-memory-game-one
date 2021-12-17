
const cards = document.querySelectorAll(".memory-card");

//Flip card

function flipCard() {
 
  if (this.classList.contains('locked')) return
  //console.log("> who is this>", this)


  // flip de front-face à back-face
  this.classList.toggle("flip");
  const flip1 = document.querySelectorAll(".memory-card.flip:not(.locked)");
  console.log(flip1);
  if (flip1.length === 2) {
     if(matchChecked(flip1[0],flip1[1])) {
       flip1[0].classList.add('locked')
       flip1[1].classList.add('locked')

     }
  } 
} 
cards.forEach((card) => card.addEventListener("click", flipCard));

function matchChecked(card1, card2) {
  console.log(card1, card2)
  const firstOpenCard = card1.querySelector('.back-face')
  const secondOpenCard = card2.querySelector('.back-face')
  console.log(firstOpenCard.src, secondOpenCard.src)

  if(firstOpenCard.src === secondOpenCard.src) {
    return true
  } else {
    setTimeout(() => {
      firstOpenCard.closest('.memory-card').classList.remove('flip')
      secondOpenCard.closest('.memory-card').classList.remove('flip')
    },1500)
  }
}
 //location.reload();

//Verify is the game is Finish

/*finishedCheck(){
if ( this.guessCards === this.cards.length/2){
      return true; } 
         else {
    return false; }
} */

//function restart


//shuffleCards?
// A FAIRE J+3
//*function reset
