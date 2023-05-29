export function drawArc(
  context,
  x,
  y,
  radius,
  start,
  end,
  color,
  action = "stroke"
) {
  context.beginPath();
  context.arc(x, y, radius, start, end);
  if (action == "stroke") {
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
  } else {
    context.fillStyle = color;
    context.fill();
  }
}

export function drawCircle(context, x, y, color, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
}

export function CalculateVelocity(time, rounds) {
  return (rounds * 2 * Math.PI) / time;
}

export function CalculateRadius(baseRaduis, canvasWidth, numberOfArcs, index) {
  let sharedWidth = canvasWidth / 2 - baseRaduis;
  return (sharedWidth / numberOfArcs) * index + baseRaduis;
}

export function drawLine(context, start, end, color, lineWidth) {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.stroke();
}

export function getNextImpactTime(currentImpactTime, velocity) {
  return currentImpactTime + (Math.PI / velocity) * 1000;
}
