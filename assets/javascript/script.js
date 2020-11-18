function validate(contactForm){
    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    var error_message = document.getElementById("error_message");

    error_message.style.padding = "10px";

    var text;
    if(name.length < 5){
      text = "Please Enter valid Name";
      error_message.innerHTML = text;
      return false;
    }

    if(message.length <= 10){
        text = "Please Enter More Than 10 Characters";
        error_message.innerHTML = text;
        return false;
    }
    
    emailjs.send('gmail', 'template', {
        "from_name": contactForm.name.value,
        "message": contactForm.message.value
    })
    alert("Form Submitted Successfully!")
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;
}