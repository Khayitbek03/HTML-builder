const fs = require('fs').promises;
const path = require('path');

const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

async function copyDir(source, destination) {
  try {
    await fs.mkdir(destination, { recursive: true });

    const files = await fs.readdir(source);

    for (const file of files) {
      const sourcePath = path.join(source, file);
      const destinationPath = path.join(destination, file);
      //to know whether the file directory or not
      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
        await copyDir(sourcePath, destinationPath);
      } else {
        await fs.copyFile(sourcePath, destinationPath);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
copyDir(source, destination);
