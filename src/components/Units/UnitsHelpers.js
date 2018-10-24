import { unitsDefinitions } from './UnitsDefinitions'

export const convert = ({ startValue, startUnit, endUnit }) => {
  if (unitsAreCompatible({ unit1: startUnit, unit2: endUnit })) {
    return startValue * getUnitInfos({ unit: startUnit }).weight / getUnitInfos({ unit: endUnit }).weight
  } else {
    console.error(`Conversion error. Units ${startUnit} and ${endUnit} are not compatible.`)
  }
}

export const options = ({ filter, unit, withPriceReferenceQuantities }) => {
  switch (filter) {
    case 'all': return allOptions({ withPriceReferenceQuantities })
    case 'warning': return warningOptions({ unit, withPriceReferenceQuantities })
    case 'compatible': return compatibleOptions({ unit, withPriceReferenceQuantities })
    default: return compatibleOptions({ unit, withPriceReferenceQuantities })
  }
}

const allOptions = ({ withPriceReferenceQuantities }) => {
  return generateOptions({
    withPriceReferenceQuantities,
    generationFunction: ({ optionsArrayToGenerate, candidateOption }) => {
      optionsArrayToGenerate.push(candidateOption)
    }
  })
}

const warningOptions = ({ unit, withPriceReferenceQuantities }) => {
  return generateOptions({
    unit,
    withPriceReferenceQuantities,
    generationFunction: ({ referenceUnit, physicalSizeOfCandidate, optionsArrayToGenerate, candidateOption }) => {
      if (physicalSizeOfCandidate === getPhysicalSize({ unit: referenceUnit })) {
        candidateOption.rightIcon = 'check_circle'
        candidateOption.rightColor = 'positive'
        optionsArrayToGenerate.unshift(candidateOption)
      } else {
        candidateOption.rightIcon = 'error'
        candidateOption.rightColor = 'negative'
        optionsArrayToGenerate.push(candidateOption)
      }
    }
  })
}

const compatibleOptions = ({ unit, withPriceReferenceQuantities }) => {
  return generateOptions({
    unit,
    withPriceReferenceQuantities,
    generationFunction: ({ referenceUnit, physicalSizeOfCandidate, optionsArrayToGenerate, candidateOption }) => {
      if (physicalSizeOfCandidate === getPhysicalSize({ unit: referenceUnit })) optionsArrayToGenerate.push(candidateOption)
    }
  })
}
// TODO: foreach
const generateOptions = ({ unit, withPriceReferenceQuantities, generationFunction }) => {
  const optionsArrayToGenerate = []
  physicalSizes.map(physicalSize => {
    Object.keys(unitsDefinitions[physicalSize]).map(unitId => {
      const unitInfo = unitsDefinitions[physicalSize][unitId]
      if (withPriceReferenceQuantities || !unitInfo.onlyPriceReferenceQuantity) {
        const candidateOption = {
          label: unitInfo.short,
          value: unitInfo.short
        }
        generationFunction({
          referenceUnit: unit,
          physicalSizeOfCandidate: physicalSize,
          unitIdOfCandidate: unitId,
          optionsArrayToGenerate,
          candidateOption
        })
      }
    })
  })
  return optionsArrayToGenerate
}

export const unitsAreCompatible = ({ unit1, unit2 }) => getPhysicalSize({ unit: unit1 }) === getPhysicalSize({ unit: unit2 })

export const defaultUnit = ({ unit }) => {
  switch (getPhysicalSize({ unit })) {
    case 'volume': return unitsDefinitions.volume.L
    case 'mass': return unitsDefinitions.mass.KG
    case 'number': return unitsDefinitions.number.PIECE
    default: return unitsDefinitions.number.PIECE
  }
}

export const getUnitInfos = ({ unit }) => {
  const unitFamily = unitsDefinitions[getPhysicalSize({ unit })]
  return Object.values(unitFamily).find(unitInfo => {
    return unit === unitInfo.name || unit === unitInfo.short
  })
}

export const getPhysicalSize = ({ unit }) => {
  return physicalSizes.find(physicalSize => {
    return Object.keys(unitsDefinitions[physicalSize]).some(unitId => {
      const unitInfo = unitsDefinitions[physicalSize][unitId]
      return unit === unitInfo.short || unit === unitInfo.name
    })
  })
}

export const physicalSizes = Object.keys(unitsDefinitions)
