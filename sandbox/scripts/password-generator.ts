import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const {
    env: {
        CRYPTO_ENCRYPTION_ALGORITHM,
        CRYPTO_DIGEST_METHOD,
        BCRYPT_SALT_ROUND,
    },
    argv: [password] = [],
} = process as any;

export const hashData = (data: string) => {
    const hash = crypto
        .createHash(CRYPTO_ENCRYPTION_ALGORITHM)
        .update(data)
        .digest(CRYPTO_DIGEST_METHOD);
    return bcrypt.hash(hash, Number(BCRYPT_SALT_ROUND));
};


if (!password)
    throw new Error('no password provided');

(async () => {
    hashData(password)
        .then(console.log)
        .catch(console.log)
})();