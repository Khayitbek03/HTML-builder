const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    const dirEnts = await fs.readdir(folderPath, { withFileTypes: true });
    for (const dirEnt of dirEnts) {
      if (!dirEnt.isFile()) continue;
      let filePath = path.join(folderPath, dirEnt.name);
      let fileInfo = path.parse(filePath);
      let fileSize = await fs.stat(filePath);
      let fileSizeInBytes = fileSize.size;

      fileInfo.name = fileInfo.name.replace(/^\./, '');
      fileInfo.ext = fileInfo.ext.replace(/^\./, '');
      console.log(
        `${fileInfo.name} - ${fileInfo.ext} - ${fileSizeInBytes}bytes`,
      );
    }
  } catch (error) {
    console.log(error);
  }
})();
