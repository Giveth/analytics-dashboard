import { useRef, useEffect } from 'react';

function useDidMount() {
	const isFirstRender = useRef(true);
	useEffect(() => {
		isFirstRender.current = false;
	}, []);
	return isFirstRender.current;
}

export default useDidMount;
