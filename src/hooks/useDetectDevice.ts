import { deviceSize } from '@giveth/ui-design-system';
import useMediaQuery from './useMediaQuery';

export default function useDetectDevice() {
	const isDesktop = useMediaQuery(`(min-width: ${deviceSize.laptopS}px)`);
	const isTablet = useMediaQuery(
		`(min-width: ${deviceSize.tablet}px) and (max-width: ${
			deviceSize.laptopS - 1
		}px)`,
	);
	const isLaptopS = useMediaQuery(
		`(min-width: ${deviceSize.laptopS}px) and (max-width: ${
			deviceSize.laptopL - 1
		}px)`,
	);
	const isLaptopL = useMediaQuery(`(min-width: ${deviceSize.laptopL}px)`);
	const isMobile = !isDesktop && !isTablet;
	return { isDesktop, isLaptopS, isTablet, isMobile, isLaptopL };
}
