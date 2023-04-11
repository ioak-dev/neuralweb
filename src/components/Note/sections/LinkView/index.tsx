import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { ButtonVariantType, IconButton, Input, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faMinus, faPlus, faSearch, faTrash, faUnlink, faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  note: NoteModel;
  notelinkReferences: string[];
  addLink?: any;
  removeLink?: any;
}

const LinkView = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="link-view">
      {!props.notelinkReferences?.includes(props.note.reference) && props.addLink && <IconButton variant={ButtonVariantType.outline} onClick={props.addLink}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>}
      {props.notelinkReferences?.includes(props.note.reference) && props.removeLink && <IconButton variant={ButtonVariantType.outline} onClick={props.removeLink}>
        <FontAwesomeIcon icon={faMinus} />
      </IconButton>}
      <div>
        <div className="link-view__name">
          {props.note.name}
        </div>
        <div>
          {props.note.summary}
        </div>
      </div>
    </div>
  )
};

export default LinkView;
