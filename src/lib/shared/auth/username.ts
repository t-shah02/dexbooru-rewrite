import type { IAuthFieldRequirements } from '../types/auth';
import {
	MINIMUM_USERNAME_LENGTH,
	MAXIMUM_USERNAME_LENGTH,
	USERNAME_REQUIREMENTS
} from '../constants/auth';

export const getUsernameRequirements = (username: string): IAuthFieldRequirements => {
	const satisfied: string[] = [];
	const unsatisfied: string[] = [];
	   // Check for spaces in the username
	   const hasSpaces = username.includes(' ');

	   // Exclude spaces from the length count
	   const usernameLengthWithoutSpaces = username.replace(/\s/g, '').length;
   
	   if (usernameLengthWithoutSpaces < MINIMUM_USERNAME_LENGTH || usernameLengthWithoutSpaces > MAXIMUM_USERNAME_LENGTH) {
		   unsatisfied.push(USERNAME_REQUIREMENTS['length']);
	   } else {
		   satisfied.push(USERNAME_REQUIREMENTS['length']);
	   }


	if (hasSpaces) {
		unsatisfied.push(USERNAME_REQUIREMENTS['spaces']);

	} else {
		if(!username){
			unsatisfied.push(USERNAME_REQUIREMENTS['spaces']);
		}else{
			satisfied.push(USERNAME_REQUIREMENTS['spaces']);
		}
			
	}

	return {
		satisfied,
		unsatisfied
	};
};
