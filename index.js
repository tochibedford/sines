const gui = new dat.GUI();

canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}

function calculateDistance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(y2-y1,2)+Math.pow(x2-x1,2))
}

function calculateDistancePure(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(y2-y1,2)+Math.pow(x2-x1,2))
}

addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

addEventListener('mousemove', event=>{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

const wave = {
    y: canvas.height/2,
    wavelength: 100,
    amplitude: -398,
    frequency: 0.05,
    hue: 196,
    saturation: 80,
    light: 50
}

const waveFolder = gui.addFolder('wave')
waveFolder.add(wave, 'wavelength', -100, 100);
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'amplitude', -canvas.height/2, canvas.height/2);
waveFolder.add(wave, 'frequency', 0.01, 1);
waveFolder.open();

const strokeFolder = gui.addFolder('stroke');
strokeFolder.add(wave, 'hue', 0, 360);
strokeFolder.add(wave, 'saturation', 0, 100);
strokeFolder.add(wave, 'light', 0, 100);
strokeFolder.open();

let increment = wave.frequency;

function animate(){
    requestAnimationFrame(animate);

    let mouseRadius = 100;

    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.beginPath();
    ctx.strokeStyle = '#feddee';
    for(let i = 0; i<canvas.width; i++){
        if(mouse.y<wave.y){
            if(calculateDistance(mouse.x, mouse.y, i, wave.y + Math.sin(i/wave.wavelength+increment)*wave.amplitude)<=mouseRadius){
                ctx.lineTo(i, wave.y + Math.sin(i/wave.wavelength+increment)*wave.amplitude + mouseRadius/2);
            }
            else{
                ctx.lineTo(i, wave.y + Math.sin(i/wave.wavelength+increment)*wave.amplitude);
            }
        }else{
            if(calculateDistance(mouse.x, mouse.y, i, wave.y + Math.sin(i/wave.wavelength+increment)*wave.amplitude)<=mouseRadius){
                ctx.lineTo(i, wave.y + Math.sin(i/wave.wavelength+increment)*wave.amplitude - mouseRadius/2);
            }
            else{
                ctx.lineTo(i, wave.y + Math.sin(i/wave.wavelength+increment)*wave.amplitude);
            }
        }
        
    }
    

    ctx.strokeStyle = `hsla(${wave.hue}, ${wave.saturation}%, ${wave.light}%)`;
    ctx.stroke();
    increment += wave.frequency
}

animate();