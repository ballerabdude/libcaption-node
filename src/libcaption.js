/**
 * Created by abdulhagi on 4/26/17.
 */
import {exec} from 'child_process';

export default class LibCaption {

  constructor() {
    this.libcaptionApps = {
      sccDump: `${process.cwd()}/libcaption-build/libcaption/examples/sccdump`,
      srtDump: `${process.cwd()}/libcaption-build/libcaption/examples/srtdump`,
      scc2srt: `${process.cwd()}/libcaption-build/libcaption/examples/scc2srt`,
      srt2vtt: `${process.cwd()}/libcaption-build/libcaption/examples/srt2vtt`,
      ts2srt: `${process.cwd()}/libcaption-build/libcaption/examples/ts2srt`,
      flv2srt: `${process.cwd()}/libcaption-build/libcaption/examples/flv2srt`,
      flvscc: `${process.cwd()}/libcaption-build/libcaption/examples/flv+scc`,
      flvsrt: `${process.cwd()}/libcaption-build/libcaption/examples/flv+srt`
    };

    // This is large to get the full caption from stdout
    this.maxBuffer = 10000000 // 10MB
  }

  dumpSCC(sccFilePath) {
    const cmd = `${this.libcaptionApps.sccDump} ${sccFilePath}`;

    exec(cmd, {maxBuffer: this.maxBuffer}, function(error, stdout, stderr) {
      // command output is in stdout
      console.log(stdout)
    });
  }

  dumpSRT(srtFilePath) {
    const cmd = `${this.libcaptionApps.srtDump} ${srtFilePath}`;

    exec(cmd, {maxBuffer: this.maxBuffer}, function(error, stdout, stderr) {
      // command output is in stdout
      console.log(stdout)
    });
  }

  scc2srt(sccFilePath) {
    const cmd = `${this.libcaptionApps.scc2srt} ${sccFilePath}`;

    exec(cmd, {maxBuffer: this.maxBuffer}, function(error, stdout, stderr) {
      // command output is in stdout
      console.log(stdout)
    });
  }

  flvscc(flvFilePath, sccFilePath, output) {
    return new Promise((resolve, reject) => {
      const cmd = `${this.libcaptionApps.flvscc} ${flvFilePath} ${sccFilePath} ${output}`;

      exec(cmd, {maxBuffer: this.maxBuffer}, function(error, stdout, stderr) {
        if (!error) {
          console.log(stderr);
          return resolve()
        }

        reject(error)
      });
    });

  }

  flvsrt(flvFilePath, srtFilePath, output) {
    return new Promise((resolve, reject) => {
      const cmd = `${this.libcaptionApps.flvsrt} ${flvFilePath} ${srtFilePath} ${output}`;

      exec(cmd, {maxBuffer: this.maxBuffer}, function(error, stdout, stderr) {
        if (!error) {
          console.log(stderr);
          return resolve()
        }

        reject(error)
      });
    });
  }

  flv2srt(flvFilePath) {
    return new Promise((resolve, reject) => {
      const cmd = `${this.libcaptionApps.flv2srt} ${flvFilePath}`;

      exec(cmd, {maxBuffer: this.maxBuffer}, function(error, stdout, stderr) {
        return resolve(stdout)
        if (!error) {
          console.log(stderr);
          return resolve(stdout)
        }

        reject(error)
      });
    });
  }

  ts2srt(flvFilePath) {
    return new Promise((resolve, reject) => {
      const cmd = `${this.libcaptionApps.ts2srt} ${flvFilePath}`;

      exec(cmd, {maxBuffer: this.maxBuffer}, function(error, stdout, stderr) {
        return resolve(stdout)
        if (!error) {
          console.log(stderr);
          return resolve(stdout)
        }

        reject(error)
      });
    });
  }
}
