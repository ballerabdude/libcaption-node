/**
 * Created by abdulhagi on 4/25/17.
 */
import log4js from 'log4js';
let logger = log4js.getLogger(`[${__filename.split('/')[__filename.split('/').length -1]}]`);
import LibCaption from './libcaption';
import tmp from 'tmp';
import {exec as ffmpeg} from 'ffmpeg-node';

export default class LibCaptionNode {

  constructor() {
    this.libcaption = new LibCaption();
  }

  async embedscc(input, sccFilePath) {

    // Create temp dir to work in
    let tmpDir;
    try {
      /* tmpDir will be an object
      {
        path: String,
        cleanupCallback: Function <- run this when we are done
      }
      */
      tmpDir = await this._createTmpDir();
      logger.debug('Dir: ', tmpDir.path);
    } catch(error) {
      throw logger.error(error);
    }

    // set the output for the flv
    const flvFilePath = tmpDir.path + '/source.flv';
    try {
      /* we need to convert the container over to an flv
       This step will not re-encode your video
       */
      await this._convertToFlv(input, flvFilePath);
    } catch (error) {
      throw logger.error(error);
    }

    logger.debug(flvFilePath);

    // set the output for the flv with captions
    const flvFilePathECC = tmpDir.path + '/source_ecc.flv';
    try {
      await this.libcaption.flvscc(flvFilePath, sccFilePath, flvFilePathECC);
    } catch (error) {
      throw logger.error(error);
    }

    try {
      /* we need to convert back to the original source format
        This will overwrite the passed in input
       */
      await this._convertToOutput(flvFilePathECC, input);
    } catch (error) {
      throw logger.error(error);
    }

    logger.debug(input);

    return input

  }


  _convertToFlv(input, output) {
    return new Promise((resolve, reject) => {

      ffmpeg([
        '-i', input,
        '-codec', 'copy',
        '-f', 'flv',
        output
      ], (stderr, stdout, code) => {
        if (code !== 0) {
          return reject(stderr);
        }
        logger.debug(stderr);
        resolve();
      })
    });

  }

  _convertToOutput(videoFilePath, output) {
    return new Promise((resolve, reject) => {
      /* we need to convert the container over to an flv
       This step will not re-encode your video
       */
      ffmpeg([
        '-i', videoFilePath,
        '-codec', 'copy',
        '-y', output // Overwrite the original
      ], (stderr, stdout, code) => {
        if (code !== 0) {
          return reject(stderr);
        }
        logger.debug(stderr);
        resolve();
      })
    });

  }

  _createTmpDir() {
    return new Promise((resolve, reject) => {
      tmp.dir((err, path, cleanupCallback) => {
        if (err) return reject(err);

        resolve({path, cleanupCallback});
      });
    })

  }
}
