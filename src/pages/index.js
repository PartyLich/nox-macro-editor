// @flow
import React, { useEffect, useState } from 'react';

import { Editor, Page } from '../components';
import { makeEditor } from '../editor';
import { noxSerializer } from '../serialize';


const TITLE = 'Macro Editor';
const INITIAL_STATE = [];
const editor = makeEditor(noxSerializer())(INITIAL_STATE);

const Index = () => {
  const [, setDirty] = useState();
  const actions = editor.actions();
  const resolution = editor.resolution();

  // force a repaint
  const notify = () => setDirty([]);

  useEffect(() => {
    const unsub = editor.subscribe(notify);
    // clean up subscription
    return () => unsub();
  });

  return (
    <Page title={TITLE}>
      <Editor
        editor={editor}
        actions={actions}
        resolution={resolution}
      />
    </Page>
  );
};

export default Index;
