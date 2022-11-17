import '../styles/globals.css';
import Highcharts from 'highcharts';
import { isSSR } from '../src/lib/helpers';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	if (!isSSR()) {
		Highcharts?.setOptions({
			credits: {
				enabled: false,
			},
			lang: {
				thousandsSep: ',',
			},
		});
	}
	return <Component {...pageProps} />;
}
