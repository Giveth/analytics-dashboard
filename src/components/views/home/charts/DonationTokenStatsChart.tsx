import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

import { IDonationTokenStats } from '../../../../types/gql';

interface IProps {
	tokenStats: IDonationTokenStats[];
}

const DonationTokenStatsChart: FC<IProps> = ({ tokenStats }) => {
	const data = tokenStats?.map(i => ({
		name: i.currency,
		y: Math.round(i.currencyPercentage * 100) / 100,
		z: i.uniqueDonorCount,
	}));
	const options = {
		chart: {
			plotBackgroundColor: null,
			type: 'pie',
		},
		title: {
			text: null,
		},
		tooltip: {
			enabled: true,
			pointFormat: '<b>{point.z} unique donors</b>',
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
	text-align: center;
`;

export default DonationTokenStatsChart;
