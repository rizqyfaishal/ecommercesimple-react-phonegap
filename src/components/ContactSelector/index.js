import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const ContactSelectorWrapper = styled.div`
	padding: 1rem;
`;

const ContactSelector = (props) => {
	return (
			<ContactSelectorWrapper>
				<Select 
					onChange={props.handleChange}
					options={props.contacts} 
					value={props.currentContactSelected} placeholder="Select contact"/>
			</ContactSelectorWrapper>
		)
}

export default ContactSelector;