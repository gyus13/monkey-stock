module.exports = function(sequelize, DataTypes){

    const Account = sequelize.define('Account', {
        user_id: { type: DataTypes.STRING, primaryKey: true, },
        account_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true,},
        points: { type: DataTypes.BIGINT, defaultValue: 1000000, },
    },{
        charset: "utf8",            // 한국어 설정
        collate: "utf8_general_ci",
        tableName: "Account",       // 테이블 이름 정의
        timestamps: true,           // createAt, updateAt 활성화
        // paranoid: true,             // deleteAt 옵션
    });

    Account.associate = models => {
        Account.belongsTo(models.User, {foreignKey: "user_id", targetKey: "userid", onDelete: "cascade",});
    };

    return Account;
}