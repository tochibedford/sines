const gui = new dat.GUI();

canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const wave = {
    y: canvas.height/2,
    wavelength: 100,
    amplitude: 100,
    frequency: 0.15,
    hue: 0,
}

const waveFolder = gui.addFolder('wave')
waveFolder.add(wave, 'wavelength', -100, 100);
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'amplitude', -canvas.height/2, canvas.height/2);
waveFolder.add(wave, 'frequency', 0.01, 1);
waveFolder.open();

const strokeFolder = gui.addFolder('stroke');
strokeFolder.add(wave, 'hue', 0, 255);
strokeFolder.open();

let increment = wave.frequency;

function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.beginPath();
    ctx.strokeStyle = '#feddee';
    for(let i = 0; i<canvas.width; i++){
        ctx.lineTo(i, wave.y+ Math.sin(i/wave.wavelength+increment)*wave.amplitude);
    }

    ctx.strokeStyle = `hsla(${wave.hue}, 50%, 50%)`;
    ctx.stroke();
    increment += wave.frequency
}

animate();