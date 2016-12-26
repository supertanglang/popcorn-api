// Import the neccesary modules.
import asyncq from 'async-q';
import KatAPI from 'kat-api-pt';

import AnimeExtractor from '../extractors/AnimeExtractor';
import { onError } from '../../utils';

/** Class for scraping anime shows from https://kat.cr/. */
export default class KAT {

  /**
   * Create a kat object for anime content.
   * @param {String} name - The name of the content provider.
   * @param {?Boolean} debug - Debug mode for extra output.
   */
  constructor(name, debug) {
    /**
     * The name of the torrent provider.
     * @type {String}
     */
    this.name = name;

    /**
     * The extractor object for getting anime data on torrents.
     * @type {AnimeExtractor}
     */
    this._extractor = new AnimeExtractor(this.name, new KatAPI({ debug }), debug);
  }

  /**
   * Returns a list of all the inserted torrents.
   * @param {Object} provider - The provider to query https://kat.cr/.
   * @returns {Anime[]} - A list of scraped anime shows.
   */
  async search(provider) {
    try {
      logger.info(`${this.name}: Starting scraping...`);
      provider.query.page = 1;
      provider.query.verified = 1;
      provider.query.adult_filter = 1;
      provider.query.category = 'english-translated';

      return await this._extractor.search(provider);
    } catch (err) {
      return onError(err);
    }
  }

}
