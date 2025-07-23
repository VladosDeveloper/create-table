import * as z from "zod";

const dateSchema = z.string()
	.regex(/^\d{2}\.\d{2}\.\d{4}$/, {
		message: "Используйте формат DD.MM.YYYY"
	})
	.refine(date => date <= new Date().toLocaleDateString(), {
		message: "Дата не может быть в будущем"
	});

const ageSchema = z.number()
	.int({message: "Возраст должен быть целым числом"})
	.min(0, {message:  "Возраст не может быть отрицательным"})
	.max(110,{message:  "Максимальный возраст - 110 лет"});

const nameSchema = z.string()
	.min(4, {message: 'Минимум 4 символа'})
	.regex(/^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/, {
		message: "Допустимы только буквы, цифры, пробелы и дефисы"
	});

export const userSchema = z.object({
	name: nameSchema,
	age: ageSchema,
	birthDate: dateSchema,
});

export type UserType = z.infer<typeof userSchema>;