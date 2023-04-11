import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../model/NoteModel';
import LinksViewer from '../sections/LinksViewer';
import LinksEditor from '../sections/LinksEditor';
import SectionContainer from '../ui/SectionContainer';
import EditControls from '../ui/EditControls';
import ViewControls from '../ui/ViewControls';
import LinksCreator from '../sections/LinksCreator';
import NotelinkModel from 'src/model/NotelinkModel';
import AutoLinksEditor from '../sections/AutoLinksEditor';

interface Props {
  note: NoteModel;
  space: string;
  disable?: boolean;
}

const AutoLinksSection = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [saving, setSaving] = useState(false);
  const notelinkAutoList = useSelector((state: any) => state.notelinkAuto.items);
  const [notelinkAutoReferences, setNotelinkAutoReferences] = useState<string[]>([]);
  const notelinkList = useSelector((state: any) => state.notelink.items);
  const [notelinkReferences, setNotelinkReferences] = useState<string[]>([]);

  useEffect(() => {

    const _notelinkReferences: string[] = [];

    const _notelinks = notelinkList.filter((item: NotelinkModel) =>
      item.sourceNoteRef === props.note.reference || item.linkedNoteRef === props.note.reference
    )
    _notelinks.forEach((item: NotelinkModel) => {
      if (props.note.reference === item.sourceNoteRef) {
        _notelinkReferences.push(item.linkedNoteRef);
      } else {
        _notelinkReferences.push(item.sourceNoteRef);
      }
    })
    setNotelinkReferences(_notelinkReferences);
  }, [props.note, notelinkList]);

  useEffect(() => {

    const _notelinkAutoReferences: string[] = [];

    const _notelinks = notelinkAutoList.filter((item: NotelinkModel) =>
      item.sourceNoteRef === props.note.reference || item.linkedNoteRef === props.note.reference
    )
    _notelinks.forEach((item: NotelinkModel) => {
      if (props.note.reference === item.sourceNoteRef) {
        _notelinkAutoReferences.push(item.linkedNoteRef);
      } else {
        _notelinkAutoReferences.push(item.sourceNoteRef);
      }
    })
    setNotelinkAutoReferences(_notelinkAutoReferences.filter(item => !notelinkReferences.includes(item)));
  }, [props.note, notelinkAutoList, notelinkReferences]);

  const onEdit = () => {
    setMode('edit');
  }

  const onCancel = () => {
    setMode('view');
  }

  return (
    <div className='auto-note-links-section'>
      <SectionContainer>
        {mode === 'edit' && <EditControls onCancel={onCancel} />}
        {mode === 'view' && <ViewControls onEdit={onEdit} disable={mode !== 'view'} />}
        {mode === 'edit' && <AutoLinksEditor notelinkReferences={notelinkAutoReferences} notelinkAutoReferences={notelinkAutoReferences} note={props.note} space={props.space} />}
        {mode === 'view' && <LinksViewer heading="Suggested references" notelinkReferences={notelinkAutoReferences} note={props.note} space={props.space} />}
      </SectionContainer>
    </div>
  );
};

export default AutoLinksSection;
