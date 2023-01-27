let background = document.getElementById('background');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let foreground = document.getElementById('foreground');
let header = document.querySelector('header');
let description = document.getElementById('typing');
let sec = document.getElementById('sec');
var i = 0;
var loading = "SYSTEM CHECK: ACTIVE" + "\r\n" + "ACCESS PERMISSION: GRANTED" + "\r\n" + "WARNING: A very small percentage of individuals may experience epileptic seizures when exposed to certain light patterns or flashing lights. Exposure to certain patters or backgrounds on a computer screen, or while playing video games, may induce epileptic seizures in these individuals. Certain conditions may induce previously undetected epileptic symptoms even in persons who have no history of prior seizures or epilepsy. If you, or anyone in your family, have an epileptic condition, consult your physician prior to playing. If you experience any of the following symptoms while playing a video or computer game - dizziness, altered vision, eye or muscle twitches, loss of awareness, disorientation, any involuntary movement, or convulsions - IMMEDIATELY discontinue use and consult your physician before entering." + "\r\n" + "ACCESS GRANTED; WAITING FOR SERVER";
var txt = "Hi, I'm Noah. Artworks and other works I make will be posted to this website. ";
var txtabt = "Hi, I'm Noah. Artworks and other works I make will be posted to this website. This website will be updated frequently, so if you are ever curious on what I am working on right now, you should be able to find it here.";
var speed = 10;
var beenSeen = 0;
var beenSeenAbt = 0;
var beenSeenfrontText = 0;
var beenSeennoahimhere = 0;
var beenSeenContact = 0;
var nothing = 0;

// how to typewrite
// if(i < elem.length){
//   document.getElementsByClassName.innerHTML += elem.charAt(i);
//   i++;
//   setTimeout(typeWriter, speed);
// }
function typeWriter(text, element) {
  if (i < text.length) {
    document.getElementById(element).innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed, text, element);
  }
  else{
    i = 0;
  }
}


function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

if(document.getElementById("typingabt") != null){
  typeWriter(txtabt, "typingabt");
}

if(document.getElementById("text") != null){
  if(isScrolledIntoView("#text")){
    if(beenSeenfrontText == 0){
      typeWriter("Noah", "text");
      beenSeenfrontText = 1;
    }
    
  }
}



if(document.getElementById("typingcont") != null){
  if(isScrolledIntoView("#typingcont")){
    if(beenSeenContact == 0){
      typeWriter("Email: noahimhere@noahimhere.com", "typingcont")
      beenSeenContact = 1;
    }
  }  
}



// document.addEventListener('DOMContentLoaded', function() {
// }, false);
// window.addEventListener('scroll', function () {
//   if(isScrolledIntoView("#vischeckinit")){
//     if(beenSeen == 0){
//       typeWriter(txt, "typing");
//       console.log("typing init");
//       beenSeen = 1;
//     }

//     }
//     let value = window.scrollY;
//     background.style.top = value * 0.35 + 'px';
//     text.style.marginTop = value * 1 + 'px';
//     foreground.style.top = value * 0 + 'px';
//     btn.style.marginTop = value * 1.5 + 'px';
//     header.style.top = value* 0.5 + 'px';
//     var i = 0;
//   })
document.addEventListener("mousemove", parallax);
function parallax(e){
  this.querySelectorAll('.background').forEach(layer => {
    const speed = layer.getAttribute('data-speed')

    const x = (window.innerWidth - e.pageX*speed) / 100
    // const y = (window.innerHeight - e.pageY*speed) / 100

    layer.style.transform = `translateX(${x}px)`
  })
  this.querySelectorAll('.foreground').forEach(layer => {
    const speed = layer.getAttribute('data-speed')

    const x = (window.innerWidth - e.pageX*speed) / -100
    // const y = (window.innerHeight - e.pageY*speed) / -100

    layer.style.transform = `translateX(${x}px)`
  })
  this.querySelectorAll('#text').forEach(layer => {
    const speed = layer.getAttribute('data-speed')

    const x = (window.innerWidth - e.pageX*speed) / -100
    const y = (window.innerHeight - e.pageY*speed) / -100
    // const y = (window.innerHeight - e.pageY*speed) / -100

    layer.style.transform = `translateX(${x}px) translateY(${y}px)`
  })
}