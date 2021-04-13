import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';

import { Editor, Page } from '../components';
import { makeEditor } from '../editor';
import noxSerializer from '../nox-serializer/';
import { Action } from '../types';
import getMd from '../util/readFile';


const TITLE = 'Macro Editor';
const INITIAL_STATE: Array<Action> = [];
const editor = makeEditor(noxSerializer())(INITIAL_STATE);

type Props = {
  md: string,
}
type signature = (props: Props) => ReactElement;

const Index: signature = ({ md }: Props) => {
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
        md={md}
      />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async (/* context */) => ({
  props: {
    md: getMd('README.md'),
  },
});

export default Index;
