import { unitsDefinitions, physicalSizesRank } from './UnitsDefinitions'

// obsolete
// works partially
export const generateDensityProp = ({ startValue, startUnit, endValue, endUnit }) => {
  const startMainUnit = mainUnit({ unit: startUnit }).short
  const endMainUnit = mainUnit({ unit: endUnit }).short
  const unitsAndValues = [
    {
      unit: startMainUnit,
      value: unsafeConvert({ startValue, startUnit, endUnit: startMainUnit })
    },
    {
      unit: endMainUnit,
      value: unsafeConvert({ startValue: endValue, startUnit: endUnit, endUnit: endMainUnit })
    }
  ]
  console.log(unitsAndValues)
  const sorted = unitsAndValues.sort((a, b) => {
    return comparePhysicalSizes(getPhysicalSize({ unit: a.unit }), getPhysicalSize({ unit: b.unit }))
  })
  console.log(unitsAndValues, sorted)
  return { [`${sorted[0].unit}2${sorted[1].unit}`]: sorted[0].value / sorted[1].value }
}

// obsolete
export const smartConvert = ({ startValue, startUnit, endUnit, densities }) => {
  if (unitsAreCompatible({ unit1: startUnit, unit2: endUnit })) {
    return unsafeConvert({ startValue, startUnit, endUnit })
  } else if (densities) {
    const startDefaultValue = unsafeConvert({
      startValue,
      startUnit,
      endUnit: mainUnit({ unit: startUnit }).short
    })
    const endDefaultValue = startDefaultValue * getPhysicalSizesConversionFactor({
      startPhysicalSize: getPhysicalSize({ unit: startUnit }),
      endPhysicalSize: getPhysicalSize({ unit: endUnit }),
      densities
    })
    const endValue = unsafeConvert({
      startValue: endDefaultValue,
      startUnit: mainUnit({ endUnit }).short,
      endUnit
    })
    return endValue
  } else {
    console.error('Smart conversion error. Units are not compatible and densities are undefined.')
  }
}

// obsolete
export const getPhysicalSizesConversionFactor = ({ startPhysicalSize, endPhysicalSize, densities }) => {
  const fromTo = `${startPhysicalSize} to ${endPhysicalSize}`

  switch (fromTo) {
    case 'mass to volume': return densities.kg2lt
    case 'volume to mass': return 1 / densities.kg2lt
    case 'mass to number': return densities.kg2piece
    case 'number to mass': return 1 / densities.kg2piece
    case 'volume to number': return densities.lt2piece
    case 'number to volume': return 1 / densities.lt2piece
    default: return 1
  }
}

export const convert = ({ startValue, startUnit, endUnit }) => {
  if (unitsAreCompatible({ unit1: startUnit, unit2: endUnit })) {
    return unsafeConvert({ startValue, startUnit, endUnit })
  } else {
    console.error(`Conversion error. Units ${startUnit} and ${endUnit} are not compatible.`)
  }
}

export const unsafeConvert = ({ startValue, startUnit, endUnit }) => {
  return startValue * getUnitInfos({ unit: startUnit }).weight / getUnitInfos({ unit: endUnit }).weight
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

export const mainUnit = ({ unit }) => {
  return defaultUnit({ physicalSize: getPhysicalSize({ unit }) })
}

export const defaultUnit = ({ physicalSize }) => {
  switch (physicalSize) {
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

export const comparePhysicalSizes = (a, b) => {
  return Math.sign(physicalSizesRank[b] - physicalSizesRank[a])
}
