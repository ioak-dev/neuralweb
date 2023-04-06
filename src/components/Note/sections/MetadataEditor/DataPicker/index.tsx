import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { isEmptyOrSpaces } from '../../../../../components/Utils';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';

interface Props {
  note: NoteModel;
  metadataDefinition: MetadataDefinitionModel;
  onChange: any;
}

const DataPicker = (props: Props) => {
  const metadataValueMap = useSelector((state: any) => state.metadataValue?.items);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [metadataValueList, setMetadataValueList] = useState<string[]>([]);

  useEffect(() => {
    if (props.metadataDefinition._id) {
      setMetadataValueList(metadataValueMap[props.metadataDefinition._id]);
    }
  }, [metadataValueMap, props.metadataDefinition]);

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  }

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setSearchResults(metadataValueList
        .filter((item: string) => !props.note.labels.includes(item)));
    } else {
      setSearchResults(metadataValueList
        .filter((item: string) => !props.note.labels.includes(item))
        .filter((item: string) => item.toLowerCase().includes(searchText.toLowerCase())));
    }
  }, [searchText, metadataValueList])

  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const updateValue = (value: string) => {
    props.onChange(value);
  }

  const removeLabel = (_label: string) => {
    props.onChange({
      currentTarget: {
        name: "labels",
        value: props.note.labels.filter(item => item !== _label)
      }
    })
  }

  return (
    <div className='metadata-picker'>
      <Label>
        {props.metadataDefinition.name}
      </Label>
      <Input name="searchText" value={searchText} placeholder="Search or create new label" onInput={handleSearchTextChange} />
      <div className="metadata-picker__results">
        <div className="metadata-picker__results__container">
          <div className="metadata-picker__item metadata-picker__item--active">
            {props.note[props.metadataDefinition._id || '']}
          </div>
        </div>

        <div className="metadata-picker__results__container">
          {isEmptyOrSpaces(searchText) &&
            <div className="metadata-picker__results__info-secondary">
              Type to see suggestion
            </div>}
          {!isEmptyOrSpaces(searchText) && <div className="metadata-picker__results__list">
            {searchResults.map(item =>
              <button className="metadata-picker__item" onClick={() => updateValue(item)}>
                {item}
              </button>
            )}
            <button className="metadata-picker__item" onClick={() => updateValue(searchText)}>
              {searchText}
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default DataPicker;
