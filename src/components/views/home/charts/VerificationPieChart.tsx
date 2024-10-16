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
	const totalWithoutComments =
		vouchCounts?.total || 0 - totalWithComments || 0;

	const data = [
		{
			name: `${totalWithComments} (with comments)`,
			y: totalWithComments,
		},
		{
			name: `${totalWithoutComments} (without comments)`,
			y: totalWithoutComments,
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
			pointFormat: '<b>{point.y}</b>',
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
				<H5>Recurring Donations Count Per Token</H5>
				<IconWithTooltip icon={<IconHelpFilled16 />} direction={'top'}>
					<TooltipBody>
						Current distribution of all recurring donations by token
						during the selected timeframe.
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
