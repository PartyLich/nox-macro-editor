// @flow
import curry from 'crocks/helpers/curry';
import map from 'crocks/pointfree/map';
import pipe from 'crocks/helpers/pipe';

import wrappedErr from './wrappedErr';


// initiate a file download with the specified `contentType` and `content`
// all over the net. versions on blogs, SO, etc. No idea who the originator was
const download = (contentType: string, content: any, filename: string) => {
  const file = new Blob([content], { type: contentType });
  const a = document.createElement('a');

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

// add two number `a` and `b`
const sum: ((number) => ((number) => number)) = (a) => (b) => a + b;

// increment a number by 1
const inc: ((number) => number) = sum(1);

// curry functions
const cDownload: any = curry(download);

export {
  cDownload as download,
  inc,
  map,
  pipe,
  sum,
  wrappedErr,
};
