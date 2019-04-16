// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const cucumber = require('cypress-cucumber-preprocessor').default
// const webpack = require('@cypress/webpack-preprocessor')

const helpers = require('../../common/cypress/plugins/helpers')

module.exports = (on, config) => {
  // const options = {
  //   webpackOptions: require('../webpack.config.js')
  // }
  // on('file:preprocessor', file => {
  //   if (file.filePath.match(/\.(js|feature)$/)) {
  //     return cucumber()(file)
  //   } else {
  //     return webpack(options)(file)
  //   }
  // })

  on('file:preprocessor', file => { return cucumber()(file) })
  // on('file:preprocessor', file => webpack(options)(file))

  return helpers.getConfiguration(config)
}
