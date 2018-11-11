import { useState, useEffect } from 'react';
import axios from 'axios';

function useList({ getPromise }) {
	const [data, setData] = useState([]);
	const [loadData, setLoadData] = useState(false);
	const [search, setSearch] = useState('');

	useEffect(
		() => {
			setLoadData(true);
		},
		[search],
	);
	
	useEffect(
		() => {
			if (loadData) {
				const promise = getPromise({ search });
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
					//if (setLoadData) tokenSource.cancel();
				};
			}
		},
		[loadData, search],
	);

	useEffect(() => {
		setLoadData(true);
	}, []);

	return { data, loadData, search, setSearch };
}

export default useList;
