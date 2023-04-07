import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';
import MetadataDefinitionModel from '../../../../model/MetadataDefinitionModel';

interface Props {
  note: NoteModel;
  metadataDefinition: MetadataDefinitionModel;
}

const LineItem = (props: Props) => {

  return (
    <div className='metadata-viewer-line-item'>
      <Label>{props.metadataDefinition.name}</Label>
      {props.note[props.metadataDefinition._id || '']}
    </div>
  );
};

export default LineItem;
