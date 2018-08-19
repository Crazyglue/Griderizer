function convert(ppi, mm) {
  try {
    const tileDimensionsInches = mm / 25.4;
    const tileDimensionsPixels = {
        x: Math.floor(ppi * tileDimensionsInches),
        y: Math.floor(ppi * tileDimensionsInches)
    }

    return tileDimensionsPixels
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

module.exports = convert;
