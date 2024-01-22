const fs = require('fs').promises;
const path = require('path');

async function compileStyles() {
  try {
    const stylesFolderPath = path.join(__dirname, 'styles');
    const ProjectDistFolderPath = path.join(__dirname, 'project-dist');

    const files = await fs.readdir(stylesFolderPath);
    const validFileExt = ['.css'];
    const styleData = [];

    for (const file of files) {
      const filePath = path.join(stylesFolderPath, file);

      if (
        (await fs.stat(filePath)).isFile() &&
        validFileExt.includes(path.extname(filePath).toLowerCase())
      ) {
        const fileData = await fs.readFile(filePath, 'utf8');
        styleData.push(fileData);
      }
    }

    await fs.mkdir(ProjectDistFolderPath, { recursive: true });
    await fs.writeFile(
      path.join(ProjectDistFolderPath, 'bundle.css'),
      styleData.join('\n'),
    );
  } catch (error) {
    console.error('Error compiling styles:', error.message);
  }
}
compileStyles();
