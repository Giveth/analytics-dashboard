import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { IMonthlyData } from '../../../../types/gql';

const RecurringDonationsTotalChart: FC<IMonthlyData> = ({
	totalPerMonthAndYear,
}) => {
	const data = totalPerMonthAndYear?.map(i => ({
		name: i.date,
		y: Math.round(i.total * 100) / 100,
	}));
	const options = {
		chart: {
			type: 'column',
			zoomType: 'x',
		},
		title: {
			text: 'Total recurring donations per month',
		},
		subtitle: {
			text: '(Click and drag to zoom in)',
		},
		xAxis: {
			type: 'category',
			min: 0,
		},
		yAxis: {
			title: {
				text: 'Total recurring donations USD',
			},
		},
		tooltip: {
			enabled: true,
			pointFormat: '<b>Recurring Donations: {point.y} USD</b>',
		},
		legend: {
			enabled: false,
		},
		series: [{ data }],
		plotOptions: {
			series: {
				pointWidth: 15,
			},
		},
	};

	return (
		<ChartContainer>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</ChartContainer>
	);
};

const ChartContainer = styled.div`
	margin-top: 60px;
`;

export default RecurringDonationsTotalChart;