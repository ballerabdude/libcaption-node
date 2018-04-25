/**
 * Created by abdulhagi on 4/25/17.
 */
import log4js from 'log4js';
let logger = log4js.getLogger(`[${__filename.split('/')[__filename.split('/').length -1]}]`);
import LibCaption from './libcaption';
import tmp from 'tmp';
import {exec as ffmpeg} from 'ffmpeg-node';

logger.level = process.env.LOG_LEVEL || 'error';

export default class LibCaptionNode {

  constructor() {
    this.libcaption = new LibCaption();
  }

  async embedscc(input, sccFilePath, output) {

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
       */
      await this._convertToOutput(flvFilePathECC, output);
    } catch (error) {
      throw logger.error(error);
    }

    logger.debug(output);

    return output

  }

  async embedsrt(input, srtFilePath, output) {

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
      await this.libcaption.flvsrt(flvFilePath, srtFilePath, flvFilePathECC);
    } catch (error) {
      throw logger.error(error);
    }

    try {
      /* we need to convert back to the original source format
       */
      await this._convertToOutput(flvFilePathECC, output);
    } catch (error) {
      throw logger.error(error);
    }

    logger.debug(output);

    return output

  }

  async mp42srt(input) {
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

    let srt;
    try {
      srt = await this.libcaption.flv2srt(flvFilePath);
    } catch (error) {
      throw logger.error(error);
    }


    logger.debug(srt);

    return srt
  }

  async ts2srt(input) {

    let srt;
    try {
      srt = await this.libcaption.ts2srt(input);
    } catch (error) {
      throw logger.error(error);
    }


    logger.debug(srt);

    return srt
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
        '-loglevel', 'panic',
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
