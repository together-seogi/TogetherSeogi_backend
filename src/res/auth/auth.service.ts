import { Injectable } from '@nestjs/common';
import userSchema from 'src/models/user.schema';
import User from 'src/interface/user.inferface';
import UserIntro from 'src/interface/userintro.interface';
import genId from 'src/utils/genId.util';
import { config } from 'dotenv';
config();

let env = process.env;

@Injectable()
export class AuthService {
	constructor() {}
	// googleStrategy.ts에서 참조 - validate
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
		let uid = await genId();
		const newUser = await new userSchema({
			userId: uid,
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

	async editIntro(intro: UserIntro) {
		const user = await userSchema.findOne({ userId: intro.userId });
		user.aboutMe = intro.aboutMe.toString();
		await user.save();
		return 'OK';
	}
}
