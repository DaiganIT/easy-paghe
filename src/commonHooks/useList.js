import { useState, useEffect } from 'react';
import axios from 'axios';

function useList({ getPromise }) {
	const [data, setData] = useState([]);
	const [loadData, setLoadData] = useState(false);

	useEffect(
		() => {
			if (loadData) {
				const [ promise, tokenSource ] = getPromise();
				promise
					.then(({ data }) => {
						setLoadData(false);
						setData(data);
					})
					.catch((error) => {
						if (!axios.isCancel(error)) {
							setLoadData(false);
						}
					});

				return function cleanup() {
					if (setLoadData) tokenSource.cancel();
				};
			}
		},
		[loadData],
	);

	useEffect(() => {
		setLoadData(true);
	}, []);

	return { data, loadData };
}

export default useList;
