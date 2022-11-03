import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Giveth Analytics Dashboard</title>
				<meta name='description' content='Giveth Analytics Dashboard' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to Giveth Analytics Dashboard!
				</h1>
			</main>
		</div>
	);
}
