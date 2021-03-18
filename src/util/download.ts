// initiate a file download with the specified `contentType` and `content`
// all over the net. versions on blogs, SO, etc. No idea who the originator was
export const cDownload = (contentType: string) => (content: BlobPart) =>
  (filename: string): void => {
    const file = new Blob([content], { type: contentType });
    const a = document.createElement('a');

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
  };

// uncurry function
export const download = (
    contentType: string,
    content: BlobPart,
    filename: string,
): void => cDownload(contentType)(content)(filename);

export default download;
