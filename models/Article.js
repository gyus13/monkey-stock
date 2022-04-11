module.exports = function(sequelize, DataTypes){

    const Article = sequelize.define('Article', {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true,},
        title: { type: DataTypes.STRING(30), },
        content: { type: DataTypes.TEXT, },
        view: { type: DataTypes.INTEGER, defaultValue:0,},
    },{
        charset: "utf8",            // 한국어 설정
        collate: "utf8_general_ci",
        tableName: "Article",       // 테이블 이름 정의
        timestamps: true,           // createAt, updateAt 활성화
        // paranoid: true,             // deleteAt 옵션
    });

    Article.associate = models => {
        Article.hasOne(models.Comment, {foreignKey: "articleid", sourceKey: 'id', onDelete: "cascade",});
        Article.belongsTo(models.Topic, {foreignKey: "tags", targetKey: "tags", onDelete: "cascade",});
        Article.belongsTo(models.User, {foreignKey: "nickname", targetKey: "nickname", onDelete: "cascade",});
    };

    return Article;
}