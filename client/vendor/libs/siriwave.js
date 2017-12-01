var canvas = {
    k: .4,
    f: 12,
    speed: .03,
    noise: 25,
    phase: 0,
    width: 0,
    height: 120
}

const YUANDIAN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRDUyRERENUQ2ODIxMUU3QjE0RUMyMEFCOURGNEFCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRDUyRERENkQ2ODIxMUU3QjE0RUMyMEFCOURGNEFCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZENTJEREQzRDY4MjExRTdCMTRFQzIwQUI5REY0QUJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZENTJEREQ0RDY4MjExRTdCMTRFQzIwQUI5REY0QUJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kQI00QAABu9JREFUeNqMl8tuG0cW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';


canvas.set = function (context, width){
    canvas.width = width;
    canvas.phase = (canvas.phase + canvas.speed) % (Math.PI * 64);
    canvas.clear(context);
    canvas.grid(context);
    canvas.drawLine(context ,1);
}

canvas.grid = function (context) {
    let grad = context.createLinearGradient(0, 0, canvas.width, 2);
    grad.addColorStop(0, '#2be3d9');
    grad.addColorStop(0.5, '#7839ee');
    grad.addColorStop(1, '#2addd8');
    context.setStrokeStyle(grad);
    context.setLineWidth(3);
}

canvas.clear = function (context){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.drawLine = function(context ,attenuation) {
    context.moveTo(0, 0);
    context.beginPath();
    let x = 0, y = 0;
    for (var i = -canvas.k; i <= canvas.k; i += 0.01) {
        x = canvas.width * ((i + canvas.k) / (canvas.k * 2));
        y = canvas.height / 2 + canvas.noise * globalAttenuation(i, canvas.k) * (1 / attenuation) * Math.sin(canvas.f * i - canvas.phase);
        //画手机中间的圆点
        if (parseInt(x) == 190){

            context.stroke();
            context.beginPath();

            context.save();
            const grd = context.createCircularGradient(x, y, 10)
            grd.addColorStop(0, 'red')
            grd.addColorStop(1, 'white')
            context.setFillStyle(grd);

            context.arc(x, y, 10, 0, Math.PI * 2, true);
            context.fill();
            context.restore();
            context.beginPath();
            canvas.grid(context);

        }
     
        context.lineTo(x, y);
    }
    context.stroke();
}

function globalAttenuation(x ,k){
    return Math.pow(k * 4 / (k * 4 + Math.pow(x, 4)), k * 2);
}

module.exports = canvas;
