import Head from 'next/head';
import HomeIndex from '../src/components/views/home/Home.index';

export default function Home() {
	return (
		<>
			<Head>
				<title>Giveth Analytics Dashboard</title>
				<meta name='description' content='Giveth Analytics Dashboard' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<HomeIndex />
		</>
	);
}
