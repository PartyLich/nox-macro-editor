import * as fs from 'fs';
import { join } from 'path';


const readFile = (fileName: string): string => {
  const fullPath = join(process.cwd(), `${ fileName }`);

  return fs.readFileSync(fullPath, 'utf8');
};

export default readFile;
