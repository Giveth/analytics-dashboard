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
import { useAttestorsVouchesCountToSource } from '../../../../hooks/useAttestorsVouchesCountToSource';
import {
	GIVETH_SOURCE,
	GIVETH_VERIFIERS_ORG_ID,
} from '../../../../lib/constants';
import Spinner from '../../../Spinner';

interface IProps {
	fromDate: Date;
	toDate: Date;
}

const VerificationAttestorsPieChart: FC<IProps> = ({ fromDate, toDate }) => {
	const { attestorsVouchesCountInfo, loading } =
		useAttestorsVouchesCountToSource(
			fromDate,
			toDate,
			GIVETH_VERIFIERS_ORG_ID,
			GIVETH_SOURCE,
		);

	const data = attestorsVouchesCountInfo?.vouchCountByUser?.map(
		({ attestorId, totalCount }) => ({
			name: attestorId,
			y: totalCount,
		}),
	);

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

	return loading ? (
		<Spinner />
	) : (
		<Container>
			<FlexCenter gap='10px'>
				<H5>Distribution of Vouches by Attestors</H5>
				<IconWithTooltip icon={<IconHelpFilled16 />} direction={'top'}>
					<TooltipBody>
						This chart displays the count of vouches made by
						attestors during the selected timeframe.
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

export default VerificationAttestorsPieChart;
