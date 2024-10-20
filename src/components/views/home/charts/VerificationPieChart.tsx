import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import {
	H5,
	IconHelpFilled16,
	neutralColors,
	Subline,
} from '@giveth/ui-design-system';
import { IconWithTooltip } from '../../../IconWithTooltip';
import { FlexCenter } from '../../../styled-components/flex';
import { IVouchCountInfo } from '../../../../types/gql';

interface IProps {
	vouchCounts?: IVouchCountInfo;
}

const VerificationPieChart: FC<IProps> = ({ vouchCounts }) => {
	const totalWithComments = vouchCounts?.totalWithComments || 0;
	const totalWithoutComments = (vouchCounts?.total || 0) - totalWithComments;

	const data = [
		{
			name: `With comments`,
			y: totalWithComments,
			color: '#90ed7d',
		},
		{
			name: `Without comments`,
			y: totalWithoutComments,
			color: '#7cb5ec',
		},
	];

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
			pointFormat: '<b>{point.name}</b>: {point.y}',
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
			<FlexCenter gap='10px'>
				<H5>Vouch Distribution with and without Comments</H5>
				<IconWithTooltip icon={<IconHelpFilled16 />} direction={'top'}>
					<TooltipBody>
						This chart shows the percentage of vouches with and
						without comments during the selected timeframe.
					</TooltipBody>
				</IconWithTooltip>
			</FlexCenter>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</Container>
	);
};

const TooltipBody = styled(Subline)`
	color: ${neutralColors.gray[100]};
	width: 270px;
`;

const Container = styled.div`
	margin-top: 50px;
	text-align: center;
`;

export default VerificationPieChart;
