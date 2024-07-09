let sketchpad = document.querySelector('#sketchpad');
let pixelTemplate = document.querySelector('.pixel');
let textInput = document.querySelector('input');

function pickRandomIntegerBetween(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound) + 1);
}


function pickRandomRGB() {
    let red = pickRandomIntegerBetween(0, 255);
    let green = pickRandomIntegerBetween(0, 255);
    let blue = pickRandomIntegerBetween(0, 255);
    return `rgb(${red},${green},${blue})`;
}

function createPixel(sketchpadResolution) {
    let newPixel = document.createElement('div');
    newPixel.style.width = `${100/sketchpadResolution}%`;
    newPixel.style.paddingBottom = `${100/sketchpadResolution}%`;
    return newPixel;
}

function positionPixel(pixel) {
    pixel.style.position = 'Relative';
    pixel.style.top = '0';
    pixel.style.left = '0';
    return pixel;
}

function paintPixel(pixel, RGBValue) {
    pixel.style.backgroundColor = RGBValue;
    return pixel;
}

function createAndPositionPixel(sketchpadResolution) {
    return positionPixel(createPixel(sketchpadResolution));
}

function getRedValueFromRGBString(RGBString) {
    const firstParenthesisPosition = RGBString.indexOf('(');
    const firstCommaPosition = RGBString.indexOf(',');
    return Number(RGBString.substring(firstParenthesisPosition + 1, firstCommaPosition));
}

function getGreenValueFromRGBString(RGBString) {
    const firstCommaPosition = RGBString.indexOf(',');
    const secondCommaPosition = RGBString.indexOf(',', firstCommaPosition + 1);
    return Number(RGBString.substring(firstCommaPosition + 1, secondCommaPosition));
}

function getBlueValueFromRGBString(RGBString) {
    const firstCommaPosition = RGBString.indexOf(',');
    const secondCommaPosition = RGBString.indexOf(',', firstCommaPosition + 1);
    const closingParenthesisPosition = RGBString.indexOf(')');
    return Number(RGBString.substring(secondCommaPosition + 1, closingParenthesisPosition));
}

function extractRGBValuesFromString(RGBString) {
    return {
        'red': getRedValueFromRGBString(RGBString),
        'green': getGreenValueFromRGBString(RGBString),
        'blue': getBlueValueFromRGBString(RGBString)
    }
}

function decimalFromPercentage(percentageString) {
    const percentageSignPosition = percentageString.indexOf('%');
    let decimallol =  Number(percentageString.substring(0, percentageSignPosition))/100;
    return decimallol;
}

function darkenRGB(extractedRGBValues, percentageString) {
    let RGBValueToRemove = 255 * decimalFromPercentage(percentageString);
    return {
        'red': extractedRGBValues.red - RGBValueToRemove,
        'green': extractedRGBValues.green - RGBValueToRemove,
        'blue': extractedRGBValues.blue - RGBValueToRemove
    }
}

function getRGB(red, green, blue) {
    return `rgb(${red},${green},${blue})`;
}

function compressExtractedRGBIntoString(extractedRGBValues) {
    return getRGB(extractedRGBValues.red, extractedRGBValues.green, extractedRGBValues.blue);
}

function createPixels(sketchpadResolution) {
    for (let i = 0; i < sketchpadResolution**2; i++) {
        let newPixel = createAndPositionPixel(sketchpadResolution);
        let pixelColor = pickRandomRGB();
        newPixel = paintPixel(newPixel, pixelColor);        
        newPixel.addEventListener('mouseenter', (event) => {
            const black = getRGB(0, 0, 0);
            newPixel = paintPixel(newPixel, black);
        });
        newPixel.addEventListener('mouseleave', (event) => {
            let extractedRGBValues = extractRGBValuesFromString(pixelColor);
            let darkenedRGBValues = darkenRGB(extractedRGBValues, '10%');
            let darkenedPixelColor = compressExtractedRGBIntoString(darkenedRGBValues);
            newPixel = paintPixel(newPixel, darkenedPixelColor);
            pixelColor = darkenedPixelColor;
        });
        sketchpad.appendChild(newPixel);
    }
}

function deletePixels() {
    sketchpad.innerHTML = '';
}

function resetBoard() {
    let sideLength = Number(textInput.value);
    if (sideLength < 2) {
        alert('Side length too low!');
        return;
    }
    else if (sideLength > 100) {
        alert('Side length too high!');
        return;
    }
    deletePixels();
    createPixels(sideLength);
}

createPixels(8);











//CODE IS PURPOSEFULLY DIRTY. RESIST THE URGE TO CLEAN. THAT IS INEFFICIENT WITH TIME.