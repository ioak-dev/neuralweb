import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ItemView.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IconButton } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faBookReader,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import ConceptModel from "../../../../model/ConceptModel";

interface Props {
  space: string;
  concept: ConceptModel;
}

const ItemView = (props: Props) => {
  const navigate = useNavigate();

  const onOpen = () => {
    navigate(`/${props.space}/book/${props.concept.bookref}/concept/${props.concept.reference}`);
  };

  return (
    <div className="concept-list-item-view">
      <div>{props.concept.name}</div>
      <div>
        <IconButton circle onClick={onOpen}>
          <FontAwesomeIcon icon={faBookOpen} />
        </IconButton>
      </div>
    </div>
  );
};

export default ItemView;
