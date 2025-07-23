import React from 'react';
import {Button, Flex, Input, Space, Table, type TableColumnsType} from 'antd';
import {useDataTable} from "./useDataTable.ts";
import {ModalComponent} from "../Modal/Modal.tsx";


export interface DataType {
	key?: string;
	name: string;
	birthDate: string;
	age: number;
}

const TableComponent: React.FC = () => {
	const {
		filteredInfo,
		sortedInfo,
		clearAll,
		addTableRecordHandler,
		data,
		isModalOpen,
		handleChange,
		setIsModalOpen,
		removeTableRecord,
		modalType,
		openModalHandler,
		recordToChange,
		changeRecordHandler,
		searchQuery,
		handleSearch,
		searchHandler
	} = useDataTable()
	
	
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return new Date(dateString).toLocaleDateString('en-EN', options);
	};
	
	const columns: TableColumnsType<DataType> = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
			filteredValue: filteredInfo.name || null,
			onFilter: (value, record) => record.name.includes(value as string),
			sorter: (a, b) => a.name.length - b.name.length,
			sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: 'Дата',
			dataIndex: 'birthDate',
			key: 'birthDate',
			onFilter: (value, record) => record.birthDate.includes(value as string),
			sorter: (a, b) => {
				const toDate = (str: string) => {
					const [day, month, year] = str.split('.');
					return new Date(`${year}-${month}-${day}`);
				};
				return toDate(a.birthDate).getTime() - toDate(b.birthDate).getTime();
			},
			sortOrder: sortedInfo.columnKey === 'birthDate' ? sortedInfo.order : null,
		},
		{
			title: 'Числовое значение',
			dataIndex: 'age',
			key: 'age',
			filteredValue: filteredInfo.age || null,
			sorter: (a, b) => a.age - b.age,
			sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, record: DataType) => (
				<Space size="middle">
					<button onClick={() => openModalHandler('changeUserData', record)}>Редактировать</button>
					<button onClick={() => removeTableRecord(record)}>Удалить</button>
				</Space>
			)
		},
	];
	
	const modalTitle = modalType === 'addNewRecord' ? 'Добавить запись' : 'Изменить текущую запись'
	const handlerType = modalType === 'addNewRecord' ? addTableRecordHandler : changeRecordHandler
	
	return (
		<>
				<Flex justify={'space-between'}>
				
				<div>
					<Flex gap={'small'}>
						<Button onClick={clearAll}>Сбросить все</Button>
						<Button onClick={() => openModalHandler('addNewRecord')}>Добавить</Button>
					</Flex>
				</div>

				<div>
					<Flex gap={'small'}>
						<Input
							placeholder="Поиск по всем полям"
							value={searchQuery}
							onChange={handleSearch}
							allowClear
							style={{ marginBottom: 16 }}
						/>
						<Button onClick={searchHandler}>Поиск</Button>
					</Flex>
				</div>

				</Flex>
			<Table<DataType> columns={columns} dataSource={data} onChange={handleChange}/>
			<ModalComponent collectFormDataHandler={handlerType}
			                isOpen={isModalOpen}
			                setIsOpen={setIsModalOpen}
			                title={modalTitle}
			                modalType={modalType}
			                record={recordToChange}/>
		</>
	);
};

export default TableComponent;