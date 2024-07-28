// Custom Cursor
document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('cursor');
  
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzMfaxF375zXP_NPF17CcRAg5t2wfb6TSwS-jCmAFaZaUygGyZagjmxu52SORIBjbIIJQ/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("statusMessage");

form.addEventListener('submit', e => {
e.preventDefault();
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      msg.innerHTML = "Message Sent successfully";
      setTimeout(function(){
          msg.innerHTML = "";
      }, 5000);
      form.reset();
    } else {
      msg.innerHTML = `Error: ${JSON.stringify(data.error)}`;
      console.error('Error:', data.error);
    }
  })
  .catch(error => {
    msg.innerHTML = `Error: ${error.message}`;
    console.error('Error!', error.message);
  });
});
