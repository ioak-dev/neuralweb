import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import LabelEditor from '../../sections/LabelEditor';

interface Props {
  note: NoteModel;
  onChange: any;
}

const HeadEditor = (props: Props) => {
  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className='head-editor'>
      <Input autoFocus name="name" value={props.note.name} label="Name" onInput={handleChange} />
      <LabelEditor note={props.note} onChange={handleChange} />
    </div>
  );
};

export default HeadEditor;