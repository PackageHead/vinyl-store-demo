module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const vinyls = await queryInterface.sequelize.query(
      'SELECT id FROM vinyls',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const reviews = [];


    vinyls.forEach((vinyl) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      reviews.push({
        comment: `Review for vinyl ${vinyl.id}`,
        score: Math.floor(Math.random() * 5) + 1,
        vinylId: vinyl.id,
        userId: randomUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert('reviews', reviews);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reviews', null, {});
  },
};
