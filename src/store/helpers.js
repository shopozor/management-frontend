/**
 * baseObjectOfObjects = {
 *  id1: object1,
 *  id2: object2,
 *  id3: object3,
 *  ...
 * }
 *
 * acceptedValuesOfMandatoryProperties = {
 *  property1: [val1, val2, val3],
 *  property2: [val1, val2, val3],
 *  ...
 * }
 *
 * The method returns an object containing all base Objects which every mandatory property has one of the accepted values
 */

export const filterObjectOfObjects = ({ baseObjectOfObjects, acceptedValuesOfMandatoryProperties }) => {
  if (Object.keys(baseObjectOfObjects).length === 0) return {}
  return Object.entries(baseObjectOfObjects).reduce((filteredObjectOfObjects, baseEntry) => {
    if (Object.keys(acceptedValuesOfMandatoryProperties) === 0) return baseObjectOfObjects
    const objectIsConformToMandatoryProperties = Object.entries(acceptedValuesOfMandatoryProperties).every(mandatoryPropertyEntry => {
      return mandatoryPropertyEntry[1].some(acceptedValue => {
        return baseEntry[1][mandatoryPropertyEntry[0]] === acceptedValue
      })
    })
    if (objectIsConformToMandatoryProperties) {
      filteredObjectOfObjects[baseEntry[0]] = baseEntry[1]
    }
    return filteredObjectOfObjects
  }, {})
}
