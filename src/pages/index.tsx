import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';

import { Editor, Page } from '../components';
import { makeEditor } from '../editor';
import noxSerializer from '../nox-serializer/';
import { Action } from '../types';


const TITLE = 'Macro Editor';
const INITIAL_STATE: Array<Action> = [];
const editor = makeEditor(noxSerializer())(INITIAL_STATE);

type signature = () => ReactElement;

const Index: signature = () => {
  const [, setDirty] = useState<Array<unknown>>();
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
