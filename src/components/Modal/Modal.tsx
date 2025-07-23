import {Modal} from 'antd';
import {AddNewRecordToTable} from "../addNewRecordToTable/AddNewRecordToTable.tsx";
import type {DataType} from "../Table/Table.tsx";

export type modalType = 'changeUserData' | 'addNewRecord'

type Props = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	title: string;
	modalType: modalType,
	collectFormDataHandler: (data: DataType) => void
	record?: DataType | null;
}

export const ModalComponent = ({isOpen,setIsOpen,title,modalType,collectFormDataHandler,record}:Props) => {
	const handleCancel = () => {
		setIsOpen(false);
	};
	return (
		<>
			<Modal
				title={title}
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isOpen}
				footer={null}
				onCancel={handleCancel}
			>
				{
					modalType === 'addNewRecord'
					? <AddNewRecordToTable collectFormDataHandler={collectFormDataHandler} setIsModalOpen={setIsOpen} />
					: <AddNewRecordToTable  collectFormDataHandler={collectFormDataHandler} setIsModalOpen={setIsOpen} record={record} />
				}
			</Modal>
		</>
	);
};
