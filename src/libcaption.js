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
      flvscc: `${process.cwd()}/libcaption-build/libcaption/examples/flv+scc`
    }
  }

  dumpSCC(sccFilePath) {
    const cmd = `${this.libcaptionApps.sccDump} ${sccFilePath}`;

    exec(cmd, function(error, stdout, stderr) {
      // command output is in stdout
      console.log(stdout)
    });
  }

  dumpSRT(srtFilePath) {
    const cmd = `${this.libcaptionApps.srtDump} ${srtFilePath}`;

    exec(cmd, function(error, stdout, stderr) {
      // command output is in stdout
      console.log(stdout)
    });
  }

  scc2srt(sccFilePath) {
    const cmd = `${this.libcaptionApps.scc2srt} ${sccFilePath}`;

    exec(cmd, function(error, stdout, stderr) {
      // command output is in stdout
      console.log(stdout)
    });
  }

  flvscc(flvFilePath, sccFilePath, output) {
    return new Promise((resolve, reject) => {
      const cmd = `${this.libcaptionApps.flvscc} ${flvFilePath} ${sccFilePath} ${output}`;

      exec(cmd, function(error, stdout, stderr) {
        if (!error) {
          console.log(stderr);
          return resolve()
        }

        reject(error)
      });
    });

  }
}
