import type {DataType} from "./Table.tsx";
import {useState, type ChangeEvent} from "react";
import type {TableProps} from "antd";
import {v1} from "uuid";
import {getRandomDate} from "../utils/generateRandomDate.ts";
import type {modalType} from "../Modal/Modal.tsx";

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Filters = Parameters<OnChange>[1];
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const initialData: DataType[] = [
	{
		key: v1(),
		name: 'John Brown',
		birthDate: getRandomDate(),
		age: Math.floor(Math.random() * 110),
	},
	{
		key: '2',
		name: 'Jim Green',
		birthDate: getRandomDate(),
		age: Math.floor(Math.random() * 110),
	},
	{
		key: '3',
		name: 'Joe Black',
		birthDate: getRandomDate(),
		age: Math.floor(Math.random() * 110),
	},
	{
		key: '4',
		name: 'Jim Red',
		birthDate: getRandomDate(),
		age: Math.floor(Math.random() * 110),
	},
	{
		key: '5',
		name: 'Vlados dev',
		birthDate: getRandomDate(),
		age: Math.floor(Math.random() * 110),
	},
];

export const useDataTable = () => {
	const [filteredInfo, setFilteredInfo] = useState<Filters>({});
	const [sortedInfo, setSortedInfo] = useState<Sorts>({});
	const [data, setData] = useState<DataType[]>(initialData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<modalType>('addNewRecord')
	const [recordToChange, setRecordToChange] = useState<DataType | null>()
	const [searchQuery, setSearchQuery] = useState('');
	
	const openModalHandler = (modalType: modalType, recordToChange: DataType | null = null) => {
		setRecordToChange(recordToChange)
		setIsModalOpen(true);
		setModalType(modalType)
	}
	
	const handleChange: OnChange = (pagination, filters, sorter) => {
		console.log('Various parameters', pagination, filters, sorter);
		setFilteredInfo(filters);
		setSortedInfo(sorter as Sorts);
	};
	
	const clearFilters = () => {
		setFilteredInfo({});
	};
	
	const addTableRecordHandler = (data: DataType) => {
		const newUser: DataType = {
			...data,
			key: v1()
		};
		
		setData(prev => [newUser,...prev]);
	}
	
	const resetSearchHandler = () => {
		setData(initialData);
	}
	
	const searchHandler = () => {
		setData(filteredData)
		setSearchQuery('')
	}
	const filteredData = data.filter(item => {
		const query = searchQuery.toLowerCase();
		return (
			item.name.toLowerCase().includes(query) ||
			item.birthDate.includes(query) ||
			item.age.toString().includes(query)
		);
	});
	
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};
	
	const changeRecordHandler = (data: DataType) => {
		setData(prev => prev.map(rec => rec.key === data.key ? { ...rec, ...data } : {...rec}));
	}
	
	const clearAll = () => {
		setFilteredInfo({});
		setSortedInfo({});
		resetSearchHandler()
	};
	
	const removeTableRecord = (record: DataType) => {
		setData(prev => prev.filter((el) => el.key !== record.key));
	}
	
	return {
		addTableRecordHandler,
		clearAll,
		clearFilters,
		handleChange,
		filteredInfo,
		sortedInfo,
		data,
		isModalOpen,
		setIsModalOpen,
		removeTableRecord,
		modalType,
		openModalHandler,
		recordToChange,
		changeRecordHandler,
		searchQuery,
		setSearchQuery,
		searchHandler,
		handleSearch
	}
}