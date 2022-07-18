import { Tile } from './Tile.js'
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 150;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

let projectsSection = document.querySelector('.projects');
fetch('./projects.json').then((response) => {
  return response.json();
}).then((data) => {
  let tiles = data.map(project => Tile(project.title, project.description, project.tools, project['code_url'], project['live_url'], project.img)).join('');
  projectsSection.innerHTML = tiles;
})


//(title, description, tools, codeLink, liveLink)

emailjs.init("user_OJTtqIGWClEsZGporBH7O");

let contactForm = document.querySelector('.contact-form');
let errField = document.querySelector(".err-msg");
          

function validateInput(data) {
  console.log(data);
  if(!data.name || !data.email || !data.message || !data.subject) {
    errField.innerHTML = "Please fill out the whole form. Thanks!"
    return false;
  }
  return true;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let name = document.querySelector(".name");
  let email = document.querySelector(".email");
  let message = document.querySelector(".message");
  let subject = document.querySelector(".subject");

  let formData = {
    name: name.value,
    email: email.value,
    message: message.value,
    subject: subject.value
  }


  // these IDs from the previous steps
  let btn = document.querySelector(".contact-submit")
  btn.value = "Sending..."
  emailjs.send('service_7l0wqyk', 'template_z20zdqy', formData)
      .then(function() {
          if(!validateInput(formData)) {
            console.log(event.target);
            return;
          }
          btn.value = "Submit"
          alert("Your message has been successfully sent. Have a nice day!");
          name.value = "";
          email.value = "";
          message.value = "";
          subject.value = "";
      }).catch((error) => {
        console.log(error);
        errField.innerHTML = "There was an issue submitting your message. Please try again."
      });
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls

const plusSlides = n => {
  console.log("got here");
  showSlides(slideIndex += n);
}

window.plusSlides = plusSlides;

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  console.log(slides);
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}