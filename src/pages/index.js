// @flow
import React, { useState } from 'react';

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
  const update = () => setDirty([]);

  return (
    <Page title={TITLE}>
      <Editor
        editor={editor}
        actions={actions}
        resolution={resolution}
        update={update}
      />
    </Page>
  );
};

export default Index;
