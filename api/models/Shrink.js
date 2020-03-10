/**
 * Shrink.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var randomString = require('randomstring');

module.exports = {

  attributes: {
    linkId: {
      type: 'number',
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    originalLink: {
      type: 'string',
      allowNull: false,
      required: true,
      unique: true,
    },
    shrinkedLink: {
      type: 'string',
      allowNull: false,
      unique: true,
    },
    visits: {
      type: 'number',
      allowNull: false,
      defaultsTo: 0,
    }
  },

  //Utility methods
  // Generate a shrinked link
  generateShrinkedLink: (allLinks) => {
    let shrinkedLink = randomString.generate(4);
    let shrunkLinkExists = false;
    allLinks.map((link) => {
      if(link.shrinkedLink === shrinkedLink) {
        shrunkLinkExists = true;
      }
    });
    if(!shrunkLinkExists) {
      return shrinkedLink;
    } else {
      return generateShrinkedLink(allLinks);
    }
  }
};

