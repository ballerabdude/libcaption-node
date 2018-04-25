# libcaption-node

libcaption-node enables you to embed captions 608 captions into your videos. Most of the work is done with 
[ffmpeg](https://github.com/xonecas/ffmpeg-node) and [libcaption](https://github.com/szatmary/libcaption).


####
Required System Packages

re2c

ffmpeg

## Examples

```javascript
import LibCaptionNode from 'libcaption-node';

const libCaption = new LibCaptionNode();

libCaption.embedscc(INPUT, SCC_FILE_PATH, OUTPUT_PATH).then((OUTPUT_PATH) => {
  console.log(`Source file with caption: ${OUTPUT_PATH}`);
}).catch((error) => {
  console.error(error);
});
```

### FYI
I will try to find some sources I can commit with the repo. The tests do pass.

