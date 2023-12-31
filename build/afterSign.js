const { notarize } = require('@electron/notarize')

exports.default = async function (context) {
  console.log('Notarizing')
  // Get contex vars
  const appName = context.packager.appInfo.productFilename
  const appDir = context.appOutDir

  // Notarize
  return await notarize({
    appBundleId: 'com.jtvberg.tidypaste',
    appPath: `${appDir}/${appName}.app`,
    appleId: process.env.appleId,
    appleIdPassword: process.env.appleIdPassword,
    teamId: process.env.teamId
  })
}
