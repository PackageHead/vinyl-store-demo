module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        email: 'admin1@example.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        avatar: 'admin-avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin2@example.com',
        password: hashedPassword,
        firstName: 'Admin2',
        lastName: 'User',
        avatar: 'admin2-avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      ...Array.from({ length: 8 }, (_, i) => ({
        email: `user${i + 1}@example.com`,
        password: hashedPassword,
        firstName: `User${i + 1}`,
        lastName: 'Test',
        avatar: `user${i + 1}-avatar.png`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
