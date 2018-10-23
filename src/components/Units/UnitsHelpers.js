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
  const opts = []
  physicalSizes.map(physicalSize => {
    Object.keys(unitsDefinitions[physicalSize]).map(unitId => {
      const unitInfo = unitsDefinitions[physicalSize][unitId]
      if (withPriceReferenceQuantities || !unitInfo.onlyPriceReferenceQuantity) {
        const option = {
          label: unitInfo.short,
          value: unitInfo.short
        }
        opts.push(option)
      }
    })
  })
  return opts
}

const warningOptions = ({ unit, withPriceReferenceQuantities }) => {
  const opts = []
  physicalSizes.map(physicalSize => {
    Object.keys(unitsDefinitions[physicalSize]).map(unitId => {
      const unitInfo = unitsDefinitions[physicalSize][unitId]
      if (withPriceReferenceQuantities || !unitInfo.onlyPriceReferenceQuantity) {
        const option = {
          label: unitInfo.short,
          value: unitInfo.short
        }
        if (physicalSize === getPhysicalSize({ unit })) {
          option.rightIcon = 'check_circle'
          option.rightColor = 'positive'
          opts.unshift(option)
        } else {
          option.rightIcon = 'error'
          option.rightColor = 'negative'
          opts.push(option)
        }
      }
    })
  })
  return opts
}

const compatibleOptions = ({ unit, withPriceReferenceQuantities }) => {
  const physicalSize = getPhysicalSize({ unit })
  return Object.values(unitsDefinitions[physicalSize]).map(unitInfo => {
    if (withPriceReferenceQuantities || !unitInfo.onlyPriceReferenceQuantity) {
      return {
        label: unitInfo.short,
        value: unitInfo.short
      }
    }
  })
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
