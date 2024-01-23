const fs = require('fs').promises;
const path = require('path');

async function copyDir(
  source,
  destination,
  options = { recursive: false, destFolderCleared: false },
) {
  try {
    if (!options.destFolderCleared) {
      await fs.rm(destination, { recursive: true, force: true });
    }

    await fs.mkdir(destination);

    const dirEntries = await fs.readdir(source, { withFileTypes: true });

    for (const dirent of dirEntries) {
      const sourcePath = path.join(source, dirent.name);
      const destinationPath = path.join(destination, dirent.name);

      if (dirent.isFile()) {
        await fs.copyFile(sourcePath, destinationPath);
      }

      if (dirent.isDirectory() && options.recursive) {
        await copyDir(sourcePath, destinationPath, {
          recursive: true,
          destFolderCleared: true,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

copyDir(source, destination, { recursive: true });
