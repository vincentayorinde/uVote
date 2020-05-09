import bcrypt from 'bcryptjs';
import { getToken, randomString } from '../../utils';

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'user',
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            gender: DataTypes.STRING,
            role: DataTypes.STRING,
        },
        {
            hooks: {
                beforeCreate: async (user) => {
                    user.password = await bcrypt.hash(user.password, 10);
                },
            },
        }
    );
    users.associate = function (models) {
        // associations can be defined here
    };
    users.prototype.passwordsMatch = function match(password) {
        return bcrypt.compare(password, this.password);
    };
    users.prototype.response = function response(addToken = true) {
        const userData = {
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            first_name: this.first_name,
            last_name: this.last_name,
            gender: this.gender,
            id: this.id,
            role: this.role,
        };
        if (addToken) userData.token = getToken(this.id, this.email);
        return userData;
    };
    return users;
};
