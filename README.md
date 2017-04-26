# libcaption-node

libcaption-node enables you to embed captions 608 captions into your videos. Most of the work is done with 
[ffmpeg](https://github.com/xonecas/ffmpeg-node) and [libcaption](https://github.com/szatmary/libcaption).

## Examples

```javascript
import LibCaptionNode from 'libcaption-node';

const libCaptionNode = new LibCaptionNode();

// This will overwrite your input source with the new output
libCaptionNode.embedscc(INPUT, SCC_FILE).then((inputWithSourcePath) => {
  console.log(`Source file with caption: ${inputWithSourcePath}`);
}).catch((error) => {
  console.error(error);
});
```

