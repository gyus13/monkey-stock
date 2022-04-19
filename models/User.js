module.exports = function(sequelize, DataTypes){

    const User = sequelize.define('User', {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true,},
        userid: { type: DataTypes.STRING, unique: true},
        password: { type: DataTypes.STRING, },
        nickname: { type: DataTypes.STRING, unique: true},
        role: { type: DataTypes.STRING, defaultValue: "user"},
    },{
        charset: "utf8",            // 한국어 설정
        collate: "utf8_general_ci",
        tableName: "User",          // 테이블 이름 정의
        timestamps: true,           // createAt, updateAt 활성화
        // paranoid: true,             // deleteAt 옵션
    });

    User.associate = models => {
        User.hasOne(models.Comment, {foreignKey: "nickname", sourceKey: 'nickname', onDelete: "cascade",});
        User.hasOne(models.Article, {foreignKey: "nickname", sourceKey: 'nickname', onDelete: "cascade",});
    };

    return User;
};