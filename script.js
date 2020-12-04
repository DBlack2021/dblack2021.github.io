import { Tile } from './Tile.js'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDlbWze-x9Vt-7OdHzPh0hLtpczFW9mORQ",
  authDomain: "portfolio-website-8b878.firebaseapp.com",
  databaseURL: "https://portfolio-website-8b878.firebaseio.com",
  projectId: "portfolio-website-8b878",
  storageBucket: "portfolio-website-8b878.appspot.com",
  messagingSenderId: "466157381573",
  appId: "1:466157381573:web:b03f107dac50ef154c0dac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
    var delta = 300 - Math.random() * 100;
  
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

const projectsSection = document.querySelector('.projects');
const collectionRef = db.collection("projects");

collectionRef.get().then((snap) => {
  let data = snap.docs.map(doc => doc.data());
  let tiles = data.map(project => Tile(project.title, project.description, project.tools, project['code_url'], project['live_url'], project.img)).join('');
  projectsSection.innerHTML = tiles;
});

//(title, description, tools, codeLink, liveLink)