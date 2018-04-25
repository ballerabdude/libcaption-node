var http = require('http');
var fs = require('fs');
import tmp from 'tmp';
let mediainfo = require('mediainfo-wrapper');

const expect = require('chai').expect;
require('chai').should();
import LibCaption from '../src/libCaptionNode'


const libCaption = new LibCaption();

// let sourcesDir = `/Users/ahagi/Dropbox/opensource/libcaption-node/test-sources`;
//
// let mp4 = `${sourcesDir}/source.mp4`;
// let mp4WithCaption = `${sourcesDir}/sourceWcaption.mp4`;
//
// let scc = `${sourcesDir}/caption.scc`;
// let srt = `${sourcesDir}/caption.srt`;

let tmpDir;


// TODO: Find free video and caption files

let srt = '';
let scc = '';

let sccLocalPath;
let srtLocalPath;

let mp4WithCaption = '';

let mp4s = [
];


// side car file downloader
const download = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  http.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);
    });
  });
};

const containsEmbededCaptions = (textTracks) => {
  return new Promise(function (resolve) {
    let containsEmbededCaptions= false;
    textTracks.forEach((track) => {
      // If there is any text track that means we have captions
      // Now test if it is embedded 608 or 708
      if (track.format[0].toUpperCase() === 'EIA-608' || track.format[0].toUpperCase() === 'EIA-708') {
        containsEmbededCaptions = true;
      }
    });
    resolve(containsEmbededCaptions);
  });
};



describe('LibCaption Node', function () {

  before(function(done) {

    // runs before all tests in this block lets get the scc sidecar file
    // Create temp dir to work in
    let wait = 120 * 1000; // Give the test 120sec/2min to complete
    this.timeout(wait);
    tmp.dir((err, path, cleanupCallback) => {
      tmpDir = path;
      sccLocalPath = `${path}/caption.scc`;
      download(scc, sccLocalPath, () => {

        srtLocalPath = `${path}/caption.srt`;
        download(srt, srtLocalPath, () => {

          done();
        })
      })
    });


  });

  it('returns srt from mp4', function (done) {
    let wait = 3000000 * 1000; // Give the test 300sec / 5min to complete
    this.timeout(wait);

    libCaption.mp42srt(mp4WithCaption).then(async (srtText) => {
      console.log(`Srt:\n${srtText}`);

      done()

    }).catch((error) => {
      console.error(error);
      done(error)
    });
  });


  describe('embedscc(input, sccFilePath, output)', function() {

    mp4s.forEach(function(mp4) {
      it(`embeds scc into ${mp4.split('/')[mp4.split('/').length - 1]}`, function(done) {
        let wait = 300000 * 1000; // Give the test 300sec / 5min to complete each embed
        this.timeout(wait);
        let output = `${tmpDir}/${mp4.split('/')[mp4.split('/').length - 1]}`;
        libCaption.embedscc(mp4, sccLocalPath, output).then(async (inputWithSourcePath) => {
          // console.log(`Source file with caption: ${inputWithSourcePath}`);
          let sourceMediainfo = await mediainfo(inputWithSourcePath);

          let hasCaptions = await containsEmbededCaptions(sourceMediainfo[0].text);
          if (hasCaptions) {

            done()
          } else {
            done(new Error('no captions'))
          }
        }).catch((error) => {
          console.error(error);
          done(error)
        });
      });
    });
  });

  describe('embedsrt(input, srtLocalPath, output)', function() {

    mp4s.forEach(function(mp4) {
      it(`embeds srt into ${mp4.split('/')[mp4.split('/').length - 1]}`, function(done) {
        let wait = 300000 * 1000; // Give the test 300sec / 5min to complete each embed
        this.timeout(wait);
        let output = `${tmpDir}/${mp4.split('/')[mp4.split('/').length - 1]}`;
        libCaption.embedsrt(mp4, srtLocalPath, output).then(async (inputWithSourcePath) => {
          // console.log(`Source file with caption: ${inputWithSourcePath}`);
          let sourceMediainfo = await mediainfo(inputWithSourcePath);

          let hasCaptions = await containsEmbededCaptions(sourceMediainfo[0].text);
          if (hasCaptions) {

            done()
          } else {
            done(new Error('no captions'))
          }
        }).catch((error) => {
          console.error(error);
          done(error)
        });
      });
    });
  });
});