$(function() {
  imagesProgress(); //이미지 로딩 소스
  counter();
});

// skrollr
var s = skrollr.init({
  edgeStrategy: "set",
  easing: "linear"
});

/*
//loading
var inputs = $(".loading-bar").find($("p"));
for (var i = 0; i < inputs.length; i++) {
  var index = i + 1;
  var time = (inputs.length - i) * 50;
  $(".loading-bar p:nth-child(" + index + ")").css(
    "animation",
    "anim 3s " + time + "ms infinite ease-in-out"
  );
}
*/
//nav button
$(".btn_wrap").click(function() {
  $("#nav").toggleClass("on");
});

//invert

// 메뉴 이동 자연스럽게
$('a[href^="#"]').click(function() {
  $("#nav").removeClass("on");
  var target = $($(this).attr("href"));
  $("html,body").animate(
    {
      scrollTop: target.offset().top
    },
    600
  );
});

//eff06 - mouse animation (마우스 움직임에따라 글자가 움직임)
let wrapper = document.querySelector(".eff06 .code_box");

let onMouseMove = ({ clientX }) => {
  let x = (clientX / innerWidth - 0.8) * (innerWidth / 2);

  TweenLite.to(".first_name .text_name, .second_name .text_name", 1, {
    x: x,
    ease: Sine.easeOut
  });
};
wrapper.addEventListener("mousemove", onMouseMove);

//scroll text
$(window).scroll(function() {
  let wScroll = $(this).scrollTop();
  //console.log(wScroll);

  $(".scroll_top").text(wScroll);
  // 스크롤이 적정위치가되면 #section2가 나타나게
  if (wScroll > $("#section2").offset().top - $(window).height() / 2) {
    $("#section2").addClass("show");
  }
  // 윈도우의 스크롤된값이 > (포폴섬네일이미지의 위치 + 윈도우의1/3위치값) 이되면 왼쪽의설명이 fadeout
  // 원래는 diplay된 상태인데 스크롤이 좀 올라가면 없어지는것
  if (
    wScroll >
    $(".sec3 .right_box > div")
      .eq(0)
      .offset().top +
      $(window).height() / 3
  ) {
    $("#section3 .box01").fadeOut(500);
  } else {
    $("#section3 .box01").fadeIn(500);
  }

  if (
    wScroll >
    $(".sec3 .right_box > div")
      .eq(1)
      .offset().top +
      $(window).height() / 3
  ) {
    $("#section3 .box02").fadeOut(500);
  } else {
    $("#section3 .box02").fadeIn(500);
  }

  if (
    wScroll >
    $(".sec3 .right_box > div")
      .eq(2)
      .offset().top +
      $(window).height() / 3
  ) {
    $("#section3 .box03").fadeOut(500);
  } else {
    $("#section3 .box03").fadeIn(500);
  }

  if (
    wScroll >
    $(".sec3 .right_box > div")
      .eq(3)
      .offset().top +
      $(window).height() / 2
  ) {
    $("#section3 .box04").fadeOut(500);
  } else {
    $("#section3 .box04").fadeIn(500);
  }

  // #section4
  if (wScroll > $("#section4").offset().top) {
    $(".sec4").css("position", "fixed");
  } else {
    $(".sec4").css("position", "relative");
  }
  // 스크롤이 적정위치가되면
  if (wScroll > $("#section5").offset().top - $(window).height()) {
    // sec4가 relative가 되어서 스크롤되도록
    $(".sec4").css("position", "relative");
    $(".sec4").css("top", "4400px");
  } else {
    $(".sec4").css("top", "0px");
  }
}); // scroll text

$(window).resize(function() {
  if ($(window).width() >= 1024) {
    /* 피씨 화면 */
    $(".motion1").css("display", "block");
    $(".motion2").css("display", "none");
    $(".sec3").css("display", "block");
    $(".sec3_m").css("display", "none");
    $(".sec4").css("display", "block");
    $(".sec4_m").css("display", "none");
    $(".sec5").css("display", "block");
    $(".sec5_m").css("display", "none");
    skrollr.init();
  } else if ($(window).width() <= 1024) {
    /* 모바일 화면 */
    skrollr.init().destroy();
    $(".motion1").css("display", "none");
    $(".motion2").css("display", "block");
    $(".sec3").css("display", "none");
    $(".sec3_m").css("display", "block");
    $(".sec4").css("display", "none");
    $(".sec4_m").css("display", "block");
    $(".sec5").css("display", "none");
    $(".sec5_m").css("display", "block");
  }
});

// skill counter - #section2
function counter() {
  // 만약 .count의 갯수가 0이상이면
  if ($(".skill .count").length) {
    //변수$c에 모든 .count 요소를 담는다.
    $c = $(".skill .count");

    // 초기화 하는 함수
    //이 담긴 count요소를 돌면서
    $c.each(function() {
      // 요소 하나하나를 this에 담고 차례대로
      var $this = $(this);
      // 이 요소에있는 data-target 속성의 값을 이요소의 text값을 숫자로변환해서 지정
      $this.data("target", parseInt($this.html()));
      // data-counted 의 값은 false로 지정
      $this.data("counted", false);
      // 태그내의 text는 0
      $this.html("0");
    });

    // 윈도우에서 scroll이벤트가 일어나면
    $(window)
      .on("scroll", function() {
        var speed = 5000;

        // 다시금 count 요소를 돌면서
        $c.each(function(i) {
          // 현재요소를 $t에 담고
          var $t = $(this);
          if (
            // 만약 현재요소의 data-counted값이 true가 아니고
            !$t.data("counted") &&
            // 윈도우의 스크롤된값 + 윈도우의세로값(뷰포트값) >= 현재요소의 top값보다 크거나 같으면
            $(window).scrollTop() + $(window).height() >= $t.offset().top
          ) {
            // 현재요소($t)의 data-counted값을 true로 변경
            $t.data("counted", true);
            // 현재요소에
            $t.animate(
              {
                dummy: 1
              },
              {
                // 속도는 5초동안
                duration: speed,
                // 각 애니메이션 요소의 속성에대해 호출할 함수
                step: function(now) {
                  var $this = $(this);
                  // data-target값 * 애니메이션이 재생되는동안의 현재의값
                  var val = Math.round($this.data("target") * now);
                  $this.html(val);
                },
                easing: "easeInOutQuart"
              }
            );
            $(".sk01").easyPieChart({
              barColor: "#d4c1a2",
              trackColor: "#eaedef",
              scaleColor: false,
              lineWidth: 10,
              size: 250,
              lineCap: "round",
              animate: { duration: speed, enabled: true }
            });

            $(".sk02").easyPieChart({
              barColor: "#b9b2a6",
              trackColor: "#eaedef",
              scaleColor: false,
              lineWidth: 10,
              size: 250,
              lineCap: "round",
              animate: { duration: speed, enabled: true }
            });

            $(".sk03").easyPieChart({
              barColor: "#d4c1a2",
              trackColor: "#eaedef",
              scaleColor: false,
              lineWidth: 10,
              size: 250,
              lineCap: "round",
              animate: { duration: speed, enabled: true }
            });

            $(".sk04").easyPieChart({
              barColor: "#b9b2a6",
              trackColor: "#eaedef",
              scaleColor: false,
              lineWidth: 10,
              size: 250,
              lineCap: "round",
              animate: { duration: speed, enabled: true }
            });
          }
        });
      })
      .triggerHandler("scroll");
  }
} //-- counter

// imageProgress
function imagesProgress() {
  var $container = $("#progress"),
    $progressBar = $container.find(".progress-bar"),
    $progressText = $container.find(".progress-text"),
    imgLoad = imagesLoaded("body"),
    imgTotal = imgLoad.images.length,
    imgLoaded = 0,
    current = 0,
    progressTimer = setInterval(updateProgress, 1000 / 60);

  imgLoad.on("progress", function() {
    imgLoaded++;
  });

  function updateProgress() {
    var target = (imgLoaded / imgTotal) * 100;

    current += (target - current) * 0.1;
    $progressBar.css({ width: current + "%" });
    $progressText.text(Math.floor(current) + "%");
    // console.log(current);
    if (current >= 100) {
      clearInterval(progressTimer);
      $container.addClass("progress-complete");
      $progressBar
        .add($progressText)
        .delay(1000)
        .animate({ opacity: 0 }, function() {
          $container.fadeOut();
        });
      $("body").addClass("active");
    }
    if (current > 99.9) {
      current = 100;
    }
  }
}
