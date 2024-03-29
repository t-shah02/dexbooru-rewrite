export interface IRegisterFormFields {
	username: string;
	email: string;
	password: string;
	profilePicture: File;
	confirmedPassword: string;
}

export interface ILoginFormFields {
	username: string;
	password: string;
}

export interface IAuthFieldRequirements {
	satisfied: string[];
	unsatisfied: string[];
}

export interface IChangePasswordFormFields {
	oldPassword: string;
	newPassword: string;
	confirmedNewPassword: string;
}

export interface IChangeUsernameFormFields {
	newUsername: string;
}

export type TPASSWORD_REQUIREMENT_ABV =
	| 'length'
	| 'lowercase'
	| 'uppercase'
	| 'number'
	| 'special-character';
export type TPasswordRequirements = Record<TPASSWORD_REQUIREMENT_ABV, string>;

type TEMAIL_REQUIREMENT_ABV = 'length';
export type TEmailRequirements = Record<TEMAIL_REQUIREMENT_ABV, string>;

type TUSERNAME_REQUIREMENT_ABV = 'length' | 'spaces';
export type TUsernameRequirements = Record<TUSERNAME_REQUIREMENT_ABV, string>;
