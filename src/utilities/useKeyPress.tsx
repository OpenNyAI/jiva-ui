import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {isLinuxPlatform, isMacPlatform, isWindowsPlatform} from './PlatformIdentifier';

function useKeyPress(targetKey: string, targetRoute: string) {
	const navigate = useNavigate();

	useEffect(() => {
		function handleKeyPress(event: KeyboardEvent) {
			if (isMacPlatform() || isLinuxPlatform() || isWindowsPlatform()) {
				if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
					navigate(targetRoute);
				}
			}
		}

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [navigate, targetKey, targetRoute]);
}

export default useKeyPress;
