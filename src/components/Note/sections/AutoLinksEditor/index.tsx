import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { saveNotelink } from '../LinksCreator/service';
import AutoLinkView from '../AutoLinkView';
import { appendNotelinkItem } from '../../../../store/actions/NotelinkActions';

interface Props {
  note: NoteModel;
  space: string;
  notelinkAutoReferences: string[];
  notelinkReferences: string[];
}

const AutoLinksEditor = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const noteMap = useSelector((state: any) => state.note.map);

  const addLink = (reference: string) => {
    saveNotelink(props.space, props.note.reference, reference, authorization).then((response: NoteModel) => {
      console.log(response);
      dispatch(appendNotelinkItem(response));
    })
  }

  return (
    <div className="links-editor">
      <h5>Suggested references</h5>
      {props.notelinkAutoReferences.map(item =>
        <AutoLinkView space={props.space} key={item} notelinkReferences={props.notelinkReferences} note={noteMap[item]} addLink={() => addLink(item)} />
      )}
    </div>
  );
};

export default AutoLinksEditor;
