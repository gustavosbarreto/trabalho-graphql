'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
          name: 'Admin',
	  email: 'admin@example.com',
	  password: '$2b$10$NCV413mZSTm7/Ow/upMSEOpdQcRmCZO/ak18SDV/2YFY4qtot.4Yq',
	  role: 'ADMIN'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', {
	  email: 'admin@example.com'
      });
  }
};
