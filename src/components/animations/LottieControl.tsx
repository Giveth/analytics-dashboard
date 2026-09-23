import React from 'react';
import dynamic from 'next/dynamic';

// Browser-only: lottie-web touches `document` the moment it is imported. It
// decides it is in a browser by checking for `navigator`, which Node 21+
// defines globally, so importing it during server rendering crashes the page
// with "document is not defined".
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

type MyProps = { size: any; animationData: any };
type MyState = { isStopped: boolean; isPaused: boolean };

export default class LottieControl extends React.Component<MyProps, MyState> {
	constructor(props: { size: any; animationData: any }) {
		super(props);
		this.state = { isStopped: false, isPaused: false };
	}

	render() {
		const defaultOptions = {
			loop: true,
			autoplay: true,
			animationData: this.props?.animationData,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice',
			},
		};

		return (
			<Lottie
				options={defaultOptions}
				height={this.props?.size || 400}
				width={this.props?.size || 400}
				isStopped={this.state.isStopped}
				isPaused={this.state.isPaused}
				isClickToPauseDisabled={true}
			/>
		);
	}
}
