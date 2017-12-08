var canvas = {
    k: .4,      //弯度
    f: 12,  
    speed: .01, //速度, 越低越慢
    noise: 25,
    phase: 0,
    width: 0,
    height: 120
}

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
    let x = 0, y = 0, drawArcState = true, drawArcOffset = canvas.width / 2 - 5;
    for (var i = -canvas.k; i <= canvas.k; i += 0.01) {
        x = canvas.width * ((i + canvas.k) / (canvas.k * 2));
        y = canvas.height / 2 + canvas.noise * globalAttenuation(i, canvas.k) * (1 / attenuation) * Math.sin(canvas.f * i - canvas.phase);
        //画手机中间的圆点
        if (drawArcOffset < parseInt(x) && drawArcState){
            drawArcState = false;
            context.stroke();
            context.beginPath();
            context.save();
            const grd = context.createCircularGradient(x, y, 10)
            grd.addColorStop(0, 'rgba(222, 159, 255, 1)')
            grd.addColorStop(0.7, 'rgba(222, 159, 255,1)')
            grd.addColorStop(1, 'rgba(222, 159, 255, 0.3)')
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
