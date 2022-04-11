module.exports = function(sequelize, DataTypes){

    const Comment = sequelize.define('Comment', {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true,},
        content: { type: DataTypes.STRING, },
    },{
        charset: "utf8",            // 한국어 설정
        collate: "utf8_general_ci",
        tableName: "Comment",       // 테이블 이름 정의
        timestamps: true,           // createAt, updateAt 활성화
        // paranoid: true,             // deleteAt 옵션
    });

    Comment.associate = models => {
        Comment.belongsTo(models.Article, {foreignKey: "articleid", targetKey: "id", onDelete: "cascade",});
        Comment.belongsTo(models.User, {foreignKey: "nickname", targetKey: "nickname", onDelete: "cascade",});
    };

    return Comment;
}