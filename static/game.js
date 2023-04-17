$(function(){

  var shotComplete = false,
      count = 0,
      score = 0,
      saved = false;

  window.addEventListener("mousemove", (e) =>{

    gsap.to(".goalkeeper", {
        duration: 0.4,
        x: e.pageX,
        y: e.pageY,
    });

    /* --- To be used for the 3D model of goalkeeper
    var xPos = (e.clientX/window.outerWidth),
    yPos = (e.clientY/window.outerHeight);
    gsap.to(goalkeeper, {
        duration: 0.3,
        rotationX: xPos * 50,
        rotationY: yPos * 150,
    });
    */

    // var goalKeeperPosLeftRnd  = Math.ceil( Math.round(e.pageX)/100)*100,
    //     ballPosLeftRnd =  Math.ceil( Math.round($('.football').offset().left)/100)*100,
    //     goalKeeperPosTopRnd  =  Math.ceil(Math.round(e.pageY)/100)*100,
    //     ballPosTopRnd =  Math.ceil(Math.round($('.football').offset().top)/100)*100;

    //  if (goalKeeperPosLeftRnd == ballPosLeftRnd && goalKeeperPosTopRnd == ballPosTopRnd && shotComplete && !saved) {
    //    score += 1;
    //    saved = true;

    //    editScoreText();

    // } else if  ((goalKeeperPosLeftRnd + 100) == ballPosLeftRnd && goalKeeperPosTopRnd == ballPosTopRnd && shotComplete && !saved) {

    //   score += 1;
    //   saved = true;
    //   editScoreText();

    // } else if(shotComplete && !saved){
    // //   smashScreen();
    // }

    let rect1 = document.querySelector(".football").getBoundingClientRect(),
        rect2 = document.querySelector(".goalkeeper").getBoundingClientRect();
    if (checkOverlap(rect1, rect2)){
        score += 1;
        saved = true;
        console.log("saved!!");
        editScoreText();
    } else{
        saved = false;
    }
    e.pageX = e.pageX - parseInt($('.container').css('marginLeft'));

    if (e.pageX < 2000 && e.pageY < 900 && e.pageX > 0 && e.pageY > 0) {
           $('.goalkeeper').css('left', (e.pageX - 100));
           $('.goalkeeper').css('top', (e.pageY - 200));
    };

    if (e.pageX < 500) {

        $('.goalkeeper').css({
           transform: 'rotateZ(-50deg)',
           MozTransform: ' rotateZ(-50deg)',
           WebkitTransform: 'rotateZ(-50deg)',
           msTransform: ' rotateZ(-50deg)'
        });

    } else if (e.pageX > 1400) {

      $('.goalkeeper').css({
           transform: 'rotateZ(50deg)',
           MozTransform: ' rotateZ(50deg)',
           WebkitTransform: 'rotateZ(50deg)',
           msTransform: ' rotateZ(50;deg)'
      });

    } else {

      $('.goalkeeper').css({
           transform: 'rotateZ(0deg)',
           MozTransform: ' rotateZ(0deg)',
           WebkitTransform: 'rotateZ(0deg)',
           msTransform: ' rotateZ(0deg)'
        });

    }

  });

//  interval = setInterval(function(){
//     footballShot()

//     setTimeout( function() {

//       $('.football').css({
//         transform: 'scale(0.2, 0.2)',
//       })
//       shotComplete = false;
//     }, 1000);

//   }, 3000);


  function checkOverlap(rect1, rect2){
     return res = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
  }


  function footballShot() {

     $('.football').css({
        left:  getRandomXandY(0, 1000),
        transform: 'scale(1, 1)'
    })

     setTimeout( function() {
       shotComplete = true;
     }, 600);

    saved = false;
    count += 1;

    // if (count == 10) {
    //     endGame();
    // };

    editScoreText();
  }

  function editScoreText(){

    setTimeout( function() {
      $('.score').text( score + " - " + (count - score));
    }, 800);
  }


  function getRandomXandY(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // function smashScreen() {
  //   if (smashScreenCount == 0) {
  //
  //     smashScreenCount = smashScreenCount + 1;
  //
  //      var smashedScreenLeftPos =  parseInt($('.football').css('left')),
  //         smashedScreenBottomPos = parseInt($('.football').css('bottom'));
  //
  //     smashedScreenLeftPos = smashedScreenLeftPos - 110;
  //     smashedScreenBottomPos = smashedScreenBottomPos - 90;
  //
  //     $('.smashedScreen').css({
  //       opacity: '1',
  //       left: smashedScreenLeftPos,
  //       bottom: smashedScreenBottomPos
  //     });
  //   }
  // };


});
