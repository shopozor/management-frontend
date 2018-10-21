import { unitsDefinitions } from './UnitsDefinitions'

export const convert = ({ startValue, startUnit, endUnit }) => {
  if (unitsAreCompatible({ unit1: startUnit, unit2: endUnit })) {
    return startValue * getUnitInfos({ unit: startUnit }).weight / getUnitInfos({ unit: endUnit }).weight
  } else {
    console.error(`Conversion error. Units ${startUnit} and ${endUnit} are not compatible.`)
  }
}

export const options = ({ filter, unit }) => {
  switch (filter) {
    case 'all': return allOptions()
    case 'warning': return warningOptions({ unit })
    case 'compatible': return compatibleOptions({ unit })
    default: return compatibleOptions({ unit })
  }
}

const allOptions = () => {
  const opts = []
  physicalSizes.map(physicalSize => {
    Object.keys(unitsDefinitions[physicalSize]).map(unitId => {
      const option = {
        label: unitsDefinitions[physicalSize][unitId].short,
        value: unitsDefinitions[physicalSize][unitId].short
      }
      opts.push(option)
    })
  })
  return opts
}

const warningOptions = ({ unit }) => {
  const opts = []
  physicalSizes.map(physicalSize => {
    Object.keys(unitsDefinitions[physicalSize]).map(unitId => {
      const option = {
        label: unitsDefinitions[physicalSize][unitId].short,
        value: unitsDefinitions[physicalSize][unitId].short
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
    })
  })
  return opts
}

const compatibleOptions = ({ unit }) => {
  const physicalSize = getPhysicalSize({ unit })
  return Object.values(unitsDefinitions[physicalSize]).map(unitInfo => {
    return {
      label: unitInfo.short,
      value: unitInfo.short
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
