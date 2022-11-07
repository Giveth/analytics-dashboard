import styled from 'styled-components';
import {
	brandColors,
	neutralColors,
	semanticColors,
} from '@giveth/ui-design-system';
import DatePicker from 'react-datepicker';
import { shadow } from '../styles/shadow';
import 'react-datepicker/dist/react-datepicker.css';

export const StyledDatePicker = styled(DatePicker)<{
	hasRightIcon?: boolean;
	hasError?: boolean;
}>`
	width: 100%;
	border-radius: 8px;
	border: 2px solid ${neutralColors.gray[300]};
	border-color: ${props =>
		props.hasError ? semanticColors.punch[500] : neutralColors.gray[300]};
	padding: 15px 50px 15px 16px;
	::placeholder {
		color: ${neutralColors.gray[500]};
	}
	:hover {
		box-shadow: ${shadow.Neutral[400]};
	}
	:focus-within {
		border-color: ${brandColors.giv[600]};
	}
`;
