import React, {type FC} from 'react';
import {type LabelContents} from '../prop-types/FormProps';
import './Label.css';
const Label: FC<LabelContents> = ({text}) => (
	<label className='Label-text' style={{float: 'left'}}>{text}</label>
);
export default Label;
