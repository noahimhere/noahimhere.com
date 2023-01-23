let background = document.getElementById('background');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let foreground = document.getElementById('foreground');
let header = document.querySelector('header');
let description = document.getElementById('typing');
let sec = document.getElementById('sec');
var i = 0;
var loading = "SYSTEM CHECK: ACTIVE" + "\r\n" + "ACCESS PERMISSION: GRANTED" + "\r\n" + "WARNING: A very small percentage of individuals may experience epileptic seizures when exposed to certain light patterns or flashing lights. Exposure to certain patters or backgrounds on a computer screen, or while playing video games, may induce epileptic seizures in these individuals. Certain conditions may induce previously undetected epileptic symptoms even in persons who have no history of prior seizures or epilepsy. If you, or anyone in your family, have an epileptic condition, consult your physician prior to playing. If you experience any of the following symptoms while playing a video or computer game - dizziness, altered vision, eye or muscle twitches, loss of awareness, disorientation, any involuntary movement, or convulsions - IMMEDIATELY discontinue use and consult your physician before entering." + "\r\n" + "ACCESS GRANTED; WAITING FOR SERVER";
var txt = "Hi, my name is Noah. I usually go by the username of 'noahimhere' and I love programming, 3d printing, modeling, and more. Most of the things I have made that I could salvage should be up on this website. This website has been fully coded, designed, and published by me. Feel free to explore.";
var txtabt = "Amo gus";
var speed = 20;
var beenSeen = 0;
var beenSeenAbt = 0;

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