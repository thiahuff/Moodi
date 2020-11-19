export interface Log {
	log_id: string;
	user_id: string;
	date: string;
	mood_value: number;
}

export interface HabitLog {
	habit_log_id: string;
	habit_id: string;
	log_id: string;
	user_id: string;
	habit_value: string;
	notes: string;
}

export interface Habit {
	habit_id: string;
	name: string;
	description: string;
	display_type: DisplayType;
	habit_type: HabitType;
	user_id: string;
}

export interface User {
	user_id: string;
	fname: string;
	lname: string;
	email: string;
	profile_pic: string;
}

export enum DisplayType {
	YesNo = 'yes/no',
	Slider = 'slider'
}

export enum HabitType {
	Positive = 'positive',
	Negative = 'negative',
	Neutral = 'neutral'
}