import { FC } from 'react';
import { StyledDatePicker } from './styled-components/datePicker';

interface IDatePickerProps {
	date: Date;
	setDate: (date: Date) => void;
}

const DatePicker: FC<IDatePickerProps> = ({ date, setDate }) => {
	return (
		<StyledDatePicker
			selected={date}
			dateFormat='yyyy-MM-dd'
			onChange={setDate}
			showPopperArrow={false}
			placeholderText='Select a date'
		/>
	);
};

export default DatePicker;
