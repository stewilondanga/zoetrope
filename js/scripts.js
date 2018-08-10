var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();

const frames = Array.from(document.querySelectorAll('li'));
const framesLength = frames.length;
document.documentElement.style.setProperty('--frame-count', framesLength);

const flashDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--flash-duration'));
const spinDuration = framesLength * flashDuration;

let animations = {
  spin: undefined
}

var posY = getPositions();

/*frames.forEach((frame, i) => {
  frame.style.setProperty('--ry', `${(i / framesLength * 360)}deg`);

  frame.style.setProperty('--ball-x', `${(5 + i / framesLength * 95)}%`)
  frame.style.setProperty('--ball-y', `${posY[i]}%`)
});

//If Web Animations API is supported, allow playback control
if (frames[0].animate) {
  function startZoe() {
    const zoe = frames[0].parentNode;

    if (zoe.animate) {
      animations.spin = zoe.animate({
        transform: [
          'rotateX(var(--zoe-angle)) rotateY(0deg)',
          'rotateX(var(--zoe-angle)) rotateY(360deg)'
        ]
      }, {
        duration: spinDuration,
        iterations: Infinity
      });
    }
  }

  startZoe();

  let output = document.getElementById('rate-output');
  document.getElementById('rate').addEventListener('input', function(e) {
    var value = parseFloat(e.currentTarget.value);
    if (animations.spin.updatePlaybackRate) {
      animations.spin.updatePlaybackRate(value);
    } else {
      animations.spin.playbackRate = value;
    }
    output.value = `Current: ${value}x`;
    //, Spin Duration: ${Math.round(1 / value * spinDuration)}ms`;
  });
} else {
  document.documentElement.classList.add('no-waapi');
}




//adapted from Val Head's demos on Easing: https://codepen.io/valhead/pen/mBxYQV?editors=0010
function getPositions() {
  let positions = [];
  const startValue = 12.5;
  const endValue = 95;
  const changeInValue = endValue - startValue;
  const totalIterations = framesLength / 2;

  for (let i = 0; i < totalIterations; ++i) {
    positions.push(easeInQuad(i, startValue, changeInValue, totalIterations));
  }
  return [...(positions.slice().reverse()), ...positions];
}

function easeInQuad(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
}
