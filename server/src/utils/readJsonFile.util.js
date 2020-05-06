import fs from 'fs';

export default path =>
  new Promise(resolve => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
    .then(data => JSON.parse(data))
    .then(data => data.payload);
