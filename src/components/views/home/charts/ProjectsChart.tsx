import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { IMonthlyData } from '../../../../types/gql';

const ProjectsChart: FC<IMonthlyData> = ({ totalPerMonthAndYear }) => {
	const data = totalPerMonthAndYear?.map(i => ({
		name: i.date,
		y: i.total,
	}));
	const options = {
		chart: {
			type: 'column',
			zoomType: 'x',
		},
		title: {
			text: 'Projects created per month',
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
				text: 'Total projects created',
			},
		},
		tooltip: {
			enabled: true,
			pointFormat: '<b>Projects Count: {point.y}</b>',
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
	margin-top: 30px;
`;

export default ProjectsChart;
