
const removeLocales = require('./remove-locales')

exports.default = async function (context) {
  await removeLocales(context)
}