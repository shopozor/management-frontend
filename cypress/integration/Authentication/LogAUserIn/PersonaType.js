defineParameterType({
  name: 'Persona',
  regexp: new RegExp(/Consommateur|Producteur|Responsable|Rex|Softozor/),
  transformer: persona => {
    return persona
  }
})
