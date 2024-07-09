let sketchpad = document.querySelector('#sketchpad');
let pixelTemplate = document.querySelector('.pixel');

function createSquares(sideLength) {
    console.log('hallo!');
    for (let i = 0; i < sideLength**2; i++) {
        let newPixel = document.createElement('div');
        newPixel.style.width = `${100/sideLength}%`;
        newPixel.style.paddingBottom = `${100/sideLength}%`;
        newPixel.style.backgroundColor = 'Red';
        newPixel.style.position = 'Relative';
        newPixel.style.top = '0';
        newPixel.style.left = '0';

        sketchpad.appendChild(newPixel);
    }
}

createSquares(8);