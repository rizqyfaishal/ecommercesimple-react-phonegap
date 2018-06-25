import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const ContactSelectorWrapper = styled.div`
	padding: 1rem;
	display: grid;
	justify-items: strecth;
	align-items: center;
`;

const ContactSelector = (props) => {
	const options = props.contacts.map(contact=> ({ label: contact.name, value: contact.userId }));
	return (
			<ContactSelectorWrapper>
				<Select options={options}/>
			</ContactSelectorWrapper>
		)
}

export default ContactSelector;