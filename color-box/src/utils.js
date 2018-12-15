function textColor(index){
    return (80 - index * 5 > 50) ? 'black' :'white'
  }

function onGridLocation(hue,index) {
    return `
    ${360 - hue} / 
    ${index + 1} / 
    ${360 - hue - 10} / 
    ${index + 10}`
    // {gridArea: }
  }

function gridColumnsnumber(stepsStart){
    return `repeat(${stepsStart - 1},1fr)`
    // {gridTemplateColumns:}
  }

function displayConst(index) {
    return index * 10
}

function multipleCreator(number,object) {
    return Array.from(Array(number).keys()).map((zero,index) => object(index))
}

export default {textColor,
                onGridLocation,
                gridColumnsnumber,
                displayConst,
                multipleCreator
            }