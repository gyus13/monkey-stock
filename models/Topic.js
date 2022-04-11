module.exports = function(sequelize, DataTypes){

    const Topic = sequelize.define('Topic', {
        tags:{ type: DataTypes.STRING, primaryKey: true},
    },{
        charset: "utf8",            // 한국어 설정
        collate: "utf8_general_ci",
        tableName: "Topic",       // 테이블 이름 정의
        timestamps: true,           // createAt, updateAt 활성화
        // paranoid: true,             // deleteAt 옵션
    });

    Topic.associate = models => {
        Topic.hasOne(models.Article, {foreignKey: "tags", sourceKey: 'tags', onDelete: "cascade",});
    };

    return Topic;
}