import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const ContactMultiSelectorWrapper = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
`;

const ContactMultiSelector = (props) => {
	const SelectAsync = Select.Async;
	return (
			<ContactMultiSelectorWrapper>
				<SelectAsync
					multi={true} placeholder="Find by username"
					loadOptions={props.loadOptions}
					value={props.value}
					onChange={props.onChange}/>
			</ContactMultiSelectorWrapper>
		)
}

export default ContactMultiSelector;