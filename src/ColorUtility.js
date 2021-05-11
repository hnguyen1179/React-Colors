import chroma from 'chroma-js';

const COLOR_STEPS = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function inverseLuminance(luminanceValue) {
  let bwScale = chroma.scale(['white', 'black']).colors(2);
  let luminanceIndex = Math.floor(luminanceValue * 2)
  return bwScale[luminanceIndex];
}

function addColorRange(palette) {
  const output = {};

  for (let i = 0; i < palette.colors.length; i++) {
    const { color, colorName } = palette.colors[i];
    const colorRange = chroma.scale([chroma(color).darken(1.4), chroma(color), 'white'])
                          .mode('lab')
                          .colors(COLOR_STEPS.length + 1, 'null')
                          .slice(0, 10)
                          .reverse()
      
    for (let j = 0; j < COLOR_STEPS.length; j++) {
      let chromaInstance = colorRange[j];
      
      if (!output[COLOR_STEPS[j]]) output[COLOR_STEPS[j]] = [];
      let stepArray = output[COLOR_STEPS[j]];

      let colorObject = {
        hex: chromaInstance.hex(),
        hexNoHash: chromaInstance.hex().slice(1),
        id: colorName,
        colorName: `${colorName} ${COLOR_STEPS[j]}`,
        nameColor: inverseLuminance(chroma(chromaInstance.hex()).luminance()),
        rgb: chromaInstance.css(),
        rgba: chromaInstance.css().replace(")", ", 1.0)")
      }
      
      stepArray.push(colorObject);
    }
  }

  return {...palette, colors: output};
}

function addSingleColorRange(palette, color) {
  const colorRange = chroma.scale([chroma(color).darken(1.4), chroma(color), 'white'])
                        .mode('lab')
                        .colors(COLOR_STEPS.length + 1, 'null')
                        .slice(0, 10)
                        .reverse()

  return {...palette, colors: colorRange.map(colorObj => { 
    return {
      hex: colorObj.hex(),
      hexNoHash: colorObj.hex().slice(1),
      id: color,
      nameColor: inverseLuminance(chroma(colorObj.hex()).luminance()),
      rgb: colorObj.css(),
      rgba: colorObj.css().replace(")", ", 1.0)")
    }
  })}
}

export { COLOR_STEPS, addColorRange, addSingleColorRange }