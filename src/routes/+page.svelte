<script>
  import { onMount } from "svelte";
  import {
    CalculateVelocity,
    drawArc,
    drawCircle,
    getNextImpactTime,
    drawLine,
    CalculateRadius,
  } from "../utility";

  let settings = {
    startTime: 0,
    duration: 600,
    baseRounds: 20,
    baseRadius: 30,
  };
  let canvas = null;
  let context = null;
  let arcsInfo = [
    "#EB5757",
    "#E44D26",
    "#4AC29A",
    "#B2FEFA",
    "#D66D75",
    "#20002c",
    "#C33764",
    "#34e89e",
    "#6190E8",
    "#A7BFE8",
    "#0575E6",
    "#4568DC",
    "#643843",
    "#99627A",
    "#C88EA7",
    "#116D6E",
    "#CD1818",
  ];

  onMount(() => {
    settings.startTime = new Date().getTime();
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    context = canvas.getContext("2d");
    arcsInfo = arcsInfo.map((color, index) => {
      let audio = new Audio(`/assests/sound/note_${(1 + index) % 15}.wav`);
      audio.volume = 0.42;
      let rounds = settings.baseRounds + index * 2;
      let velocity = CalculateVelocity(settings.duration, rounds);
      let radius = CalculateRadius(
        settings.baseRadius,
        canvas.width,
        arcsInfo.length + 2,
        index
      );
      return {
        velocity,
        color,
        audio,
        radius,
        nextImpact: getNextImpactTime(settings.startTime, velocity),
      };
    });
    draw();
  });

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - settings.startTime;
    drawLine(
      context,
      { x: 0, y: canvas.height * 0.95 },
      { x: canvas.width, y: canvas.height * 0.95 },
      "gray",
      12
    );
    arcsInfo.forEach((setting, index) => {
      if (setting.nextImpact <= currentTime) {
        setting.audio.play();
        setting.nextImpact = getNextImpactTime(
          setting.nextImpact,
          setting.velocity
        );
      }
      let timeInSeconds = elapsedTime / 1000;
      let distance =
        (Math.PI + timeInSeconds * setting.velocity) % (2 * Math.PI);
      let shortedDistance = distance < Math.PI ? -distance : distance;
      let x = canvas.width / 2 + setting.radius * Math.cos(shortedDistance);
      let y = canvas.height * 0.95 + setting.radius * Math.sin(shortedDistance);
      drawArc(
        context,
        canvas.width / 2,
        canvas.height * 0.95,
        setting.radius,
        Math.PI,
        2 * Math.PI,
        setting.color,
        "stroke"
      );
      drawCircle(context, x, y, "white", 8);
    });
    if (elapsedTime / 1000 <= settings.duration) {
      requestAnimationFrame(draw);
    }
  }
</script>

<canvas id="canvas" bind:this={canvas} />

<style>
  #canvas {
    width: 90%;
    height: 90%;
    border-radius: 6px;
    background-color: rgb(31, 26, 26);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
