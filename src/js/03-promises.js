const refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.prevent.default();
  console.log(e.target.delay.value);

  let delay = e.target.delay.value;
  const step = e.target.step.value;
  const amount = e.target.amount.value;

  for (let i = 1; i <= amount; i += 1){
    delay += step;
  }
}




// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
