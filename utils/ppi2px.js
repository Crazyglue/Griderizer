function convert(ppi, mm) {
    const tileDimensionsInches = mm / 25.4;
    const tileDimensionsPixels = {
        x: Math.floor(ppi * tileDimensionsInches),
        y: Math.floor(ppi * tileDimensionsInches)
    }

    return tileDimensionsPixels
}

module.exports = convert;
