// Initialize Firebase(2)
var config = {
    apiKey: "AIzaSyDQUVrdoCBnEZ5kItasgtodHAl9sAAMqiQ",
    authDomain: "bby-21-schmoney.firebaseapp.com",
    projectId: "bby-21-schmoney",
    storageBucket: "bby-21-schmoney.appspot.com",
    messagingSenderId: "588767541894",
    appId: "1:588767541894:web:e3b523165d90ae1e096f07"
  };
  firebase.initializeApp(config);
  
  //Reference for form collection(3)
  let formMessage = firebase.database().ref('register');
  
  //listen for submit event//(1)
  document
    .getElementById('registrationform')
    .addEventListener('submit', formSubmit);
  
  //Submit form(1.2)
  function formSubmit(e) {
    e.preventDefault();
    // Get Values from the DOM
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
  
    //send message values
    sendMessage(name, email, password);
  
    //Show Alert Message(5)
    document.querySelector('.alert').style.display = 'block';
  
    //Hide Alert Message After Seven Seconds(6)
    setTimeout(function() {
      document.querySelector('.alert').style.display = 'none';
    }, 7000);
  
    //Form Reset After Submission(7)
    document.getElementById('registrationform').reset();
  }
  
  //Send Message to Firebase(4)
  
  function sendMessage(name, email, password) {
    let newFormMessage = formMessage.push();
    newFormMessage.set({
      name: name,
      email: email,
      password: password,

    });
  }