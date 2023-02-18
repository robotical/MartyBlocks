
// const fs = require('fs');
import fs from "fs";

const paths = [
  "./replacements/scratch-vm/webpack.config.js",
  "./replacements/scratch-blocks/webpack.config.js",
  "./replacements/scratch-gui/webpack.config.js",
];

paths.forEach((path) => {
  // Read the contents of the file
  const data = fs.readFileSync(path, "utf-8");

  // Replace the `mode` line with the new value
  const newData = data.replace("mode: 'production'", "mode: 'development'");

  // Write the new data back to the file
  fs.writeFileSync(path, newData, "utf-8");
});

