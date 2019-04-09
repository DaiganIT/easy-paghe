import { useState, useEffect } from 'react';
import axios from 'axios';

function useList({ getPromise }) {
	const [data, setData] = useState({ items: [], length: 0 });
	const [loadData, setLoadData] = useState(false);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [pageLimit] = useState(10);

	useEffect(
		() => {
			setLoadData(true);
		},
		[search],
	);

	useEffect(
		() => {
			setLoadData(true);
		},
		[page],
	);

	useEffect(
		() => {
			if (loadData) {
				const promise = getPromise({ search, page, pageLimit });
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
		[loadData, search, page],
	);

	useEffect(() => {
		setLoadData(true);
	}, []);

	const reloadData = () => {
		setLoadData(true);
	};

	return { data, loadData, reloadData, search, setSearch, page, setPage, pageLimit };
}

export default useList;
