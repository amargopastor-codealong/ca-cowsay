import cowsay from 'cowsay';
import fs from 'fs-extra';
import _ from 'lodash';

try {
  const initialData = fs.readJSONSync('catsFacts.json').data;
  const { length } = initialData;
  const fact = initialData[_.random(length-1)];
  const output: string = cowsay.say({ text: fact });
  console.log(output);
} catch (error) {
  const output: string = cowsay.say({ text: 'Cannot find values: Please, run seed file.' });
  console.log(output);
}
