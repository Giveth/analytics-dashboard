import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

interface IProps {
	categoryDonations?: {
		title: string;
		totalUsd: number;
	}[];
}

const CategoryDonations: FC<IProps> = ({ categoryDonations }) => {
	const data = categoryDonations?.map(i => ({
		name: i.title,
		y: Math.round(i.totalUsd),
	}));
	const options = {
		chart: {
			plotBackgroundColor: null,
			type: 'pie',
		},
		title: {
			text: 'Total Donations Per Category (Normalized)',
		},
		tooltip: {
			enabled: true,
			pointFormat: '<b>{point.y} USD</b>',
		},
		series: [
			{
				colorByPoint: true,
				data: data,
			},
		],
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				},
			},
		},
	};

	return (
		<Container>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</Container>
	);
};

const Container = styled.div`
	margin-top: 50px;
`;

export default CategoryDonations;
