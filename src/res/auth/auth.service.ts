import { Injectable } from '@nestjs/common';
import userSchema from 'src/models/user.schema';
import User from 'src/interface/user.inferface';
import { config } from 'dotenv';
config();

let env = process.env;

@Injectable()
export class AuthService {
	constructor() {}
	// googleStrategy.ts에서 참조
	async validateUser(details: User) {
		console.log('AuthService');
		console.log(details);
		const user = await userSchema.findOne({
			providerData: {
				email: details.providerData.email
			}
		});
		console.log(user);
		if (user) return user;
		console.log('User not found. Creating...');
		const newUser = await new userSchema({
			userId: 1111,
			userNick: details.userNick,
			level: 1,
			providerData: {
				email: details.providerData.email,
				name: details.providerData.name,
				uid: details.providerData.uid
			},
			profilePhoto: details.profilePhoto ?? null
		}).save();
		return newUser;
	}

	async findUser(userId: number) {
		const user = await userSchema.findOne({ userId: userId });
		return user;
	}
}
