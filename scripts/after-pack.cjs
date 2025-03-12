
const removeLocales = require('./remove-locales.cjs')

exports.default = async function (context) {
  await removeLocales(context)
}