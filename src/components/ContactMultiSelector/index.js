import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const ContactMultiSelectorWrapper = styled.div`
	padding: 1rem;
	display: grid;
	justify-items: strecth;
	align-items: center;
`;

const ContactMultiSelector = (props) => {
	return (
			<ContactMultiSelectorWrapper>
				<Select options={props.options} 
					multi={true} placeholder="Select usernames for added to your contact"
					value={props.value}
					onChange={props.onChange}/>
			</ContactMultiSelectorWrapper>
		)
}

export default ContactMultiSelector;