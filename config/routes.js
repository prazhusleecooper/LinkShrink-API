/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // Shrink the provided link
  'POST /shrinkLink': 'ShrinkController.shrinkLink',
  // Get the original link by providing the shrunk link
  'GET /:shrunkLink': 'ShrinkController.getOriginalLink',
};
