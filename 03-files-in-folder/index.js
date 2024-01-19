const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    const dirEnts = await fs.readdir(folderPath, { withFileTypes: true });
    for (const dirEnt of dirEnts) {
      if (!dirEnt.isFile()) continue;
      const filePath = path.join(folderPath, dirEnt.name);
      const fileInfo = path.parse(filePath);
      const fileSize = await fs.stat(filePath);
      const fileSizeInBytes = fileSize.size;
      console.log(
        `${fileInfo.name} - ${fileInfo.ext} - ${fileSizeInBytes}bytes`,
      );
    }
  } catch (error) {
    console.log(error);
  }
})();
