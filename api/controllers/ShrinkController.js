/**
 * ShrinkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var randomString = require('randomstring');

module.exports = {
  // Request handling methods
  // Shrink an incoming link
  shrinkLink: async (req, res) => {
    sails.log.debug('THIS HIT');
    let allLinks = await Shrink.find().sort('linkId DESC');
    let originalLinkExists = false;
    let linkId = 0;
    let shrunkLink = '';
    if(allLinks.length !== 0){
      allLinks.map((link) => {
        if(link.originalLink === req.body.originalLink) {
          originalLinkExists = true;
        }
      });
      linkId = allLinks[0].linkId + 1;
      shrunkLink = Shrink.generateShrinkedLink(allLinks);
    } else if(allLinks.length === 0) {
      linkId = 1;
      shrunkLink = randomString.generate(4);
    }
    console.log("DOES THE LINK EXIST??:", originalLinkExists);
    if(originalLinkExists) {
      return res.status(406)
                .send({msg: 'The link provided already has a shrunk link'});
    }
    try {
      await Shrink.create({
        linkId: linkId,
        originalLink: req.body.originalLink,
        shrinkedLink: shrunkLink,
      });
      return res.status(200).send({shrunkLink: shrunkLink});
    } catch (error) {
      console.log('THE ERROR CREATING LINK IS::', error);
      res.serverError('Error shrinking link. Please try again');
    }
  },
  // Return the original link
  /*
  * Codes:
  *  -1: Requested link doesnot exist
  *   1: Link found
  * */
  getOriginalLink: async (req, res) => {
    // let shrunkLink = req.param('shrunkLink');
    let linkRecord = await Shrink.findOne({shrinkedLink: req.param('shrunkLink')});
    if(!linkRecord) {
      return res.status(404)
                .send({
                  status: 404,
                  code: -1,
                  msg: 'THE LINK IS NOT AVAILABLE',
                });
    } else {
      let updatedVisitCount = linkRecord.visits + 1;
      console.log('THE NUMBER OF VISITS:::', updatedVisitCount);
      await Shrink.updateOne({linkId: linkRecord.linkId})
                  .set({visits: updatedVisitCount});
      return res.status(200)
                .send({
                  status: 200,
                  code: 1,
                  msg: 'Link found',
                  originalLink: linkRecord.originalLink,
                });
    }
  },
  //____________________________________________________________________________________________________________________
  // Utility methods

};

