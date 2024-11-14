module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vinyls', [
      ...Array.from({ length: 50 }, (_, i) => ({
        name: `Vinyl ${i + 1}`,
        author: `Author ${i + 1}`,
        description: `Description for Vinyl ${i + 1}`,
        price: (Math.random() * 100).toFixed(2),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vinyls', null, {});
  },
};
