module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', // 테이블명은 posts
    {
      content: {
        type: DataTypes.TEXT, // 매우 긴 글
      },
    },
    {
      charset: 'utf8mb4', // 한글+이모티콘
      collate: 'utf8mb4_general_ci',
    }
  );

  Post.associate = db => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // n:m 관계 중간에 PostHashtag 테이블
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  };

  return Post;
};
