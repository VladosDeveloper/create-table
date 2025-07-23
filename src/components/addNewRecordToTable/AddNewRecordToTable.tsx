import {Controller, type SubmitHandler, useForm} from "react-hook-form"
import {Button, Form, Input, InputNumber} from "antd";
import {userSchema, type UserType} from "./validationSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {type CSSProperties, useEffect} from "react";
import type {DataType} from "../Table/Table.tsx";

type Props = {
	setIsModalOpen: (isOpen: boolean) => void;
	collectFormDataHandler: (data: DataType) => void
	record?: DataType | null
}


export const AddNewRecordToTable = ({collectFormDataHandler, setIsModalOpen, record}: Props) => {
	const {
		handleSubmit,
		control,
		reset,
		setValue,
		formState: {errors},
	} = useForm<UserType>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			age: undefined,
			name: '',
			birthDate: ''
		}
	})
	const onSubmit: SubmitHandler<UserType> = (data) => {
		const recordKey = record && record.key;
		collectFormDataHandler({key: recordKey!,...data})
		setIsModalOpen(false);
		reset()
	}
	
	useEffect(() => {
		if (record) {
			setValue('name', record.name)
			setValue('age', record.age)
			setValue('birthDate', record.birthDate)
		}
	}, [record]);
	
	const errorStyle: CSSProperties = {
		color: 'red'
	}
	
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			
			<Form.Item label="Имя" layout={'vertical'}>
				<Controller
					name="name"
					control={control}
					render={({field}) => <Input {...field} onChange={field.onChange} value={field.value}/>}
				/>
				{errors.name && <span style={errorStyle}>{errors.name.message}</span>}
			</Form.Item>
			
			<Form.Item label="Числовое значение" layout={'vertical'}>
				<Controller
					name="age"
					control={control}
					render={({field}) => (
						<InputNumber
							style={{width: '100%'}}
							min={1} max={110}
							{...field}
							onChange={field.onChange}
						defaultValue={field.value}/>
					)}
				/>
				{errors.age && <span style={errorStyle}>{errors.age.message}</span>}
			</Form.Item>
			
			<Form.Item label="Дата" layout={'vertical'}>
				<Controller
					name="birthDate"
					control={control}
					render={({field}) => <Input  {...field} onChange={field.onChange} value={field.value}/>}
				/>
				{errors.birthDate && <span style={errorStyle}>{errors.birthDate.message}</span>}
			</Form.Item>
			
			<Form.Item label={null}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</form>
	)
}