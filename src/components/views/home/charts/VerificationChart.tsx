import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { IVouchCountPerMonth } from '../../../../types/gql';

interface IVerificationChartProps {
	vouchCountsPerMonth: IVouchCountPerMonth[];
	showWithComments: boolean; // New prop to control visibility of with comments data
}

const VerificationChart: FC<IVerificationChartProps> = ({
	vouchCountsPerMonth,
	showWithComments, // Destructure the new prop
}) => {
	// Prepare data for both total counts and counts with comments
	const totalCountsData = vouchCountsPerMonth?.map(vouchCountPerMonth => ({
		name: vouchCountPerMonth.date,
		y: vouchCountPerMonth.totalCount,
	}));

	const withCommentsData = vouchCountsPerMonth?.map(vouchCountPerMonth => ({
		name: vouchCountPerMonth.date,
		y: vouchCountPerMonth.countWithComments,
	}));

	// Define the chart options
	const options = {
		chart: {
			type: 'column',
			zoomType: 'x',
		},
		title: {
			text: 'Vouches created per month',
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
				text: 'Total Vouches created',
			},
		},
		tooltip: {
			enabled: true,
			shared: true, // Enable shared tooltips
			headerFormat: '<b>{point.key}</b><br/>',
			pointFormat: '<b>{series.name}: {point.y}</b><br/>',
		},
		legend: {
			enabled: true,
		},
		series: [
			{
				name: 'Total Vouches',
				data: totalCountsData,
				color: '#7cb5ec', // Color for the total counts
			},
			// Conditionally add the "Vouches with Comments" series if the prop is true
			...(showWithComments
				? [
						{
							name: 'Vouches with Comments',
							data: withCommentsData,
							color: '#90ed7d', // Color for vouches with comments
						},
				  ]
				: []),
		],
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

export default VerificationChart;
