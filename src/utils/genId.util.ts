import userSchema from '../models/user.schema';
import * as crypto from 'crypto';

async function genId() {
    const fgen = await crypto.randomInt(10000000, 99999999);
    const user = await userSchema.findOne({
        userId: fgen
    });
    return (!user) ? fgen : await genId();
}
export default genId;