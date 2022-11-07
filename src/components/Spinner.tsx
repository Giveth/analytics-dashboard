import { FlexCenter } from './styled-components/flex';
import LottieControl from './animations/LottieControl';
import LoadingAnimation from '../animations/loading_giv.json';

export default function Spinner() {
	return (
		<FlexCenter>
			<LottieControl animationData={LoadingAnimation} size={150} />
		</FlexCenter>
	);
}
