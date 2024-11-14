module.exports = {
    development: {
        dialect: 'mysql',
        host: 'localhost',
        username: 'my_user',
        password: 'password',
        database: 'my_project_db',
        models: [__dirname + '/src/**/*.model.ts'],
        logging: false,
    },
    production: {
        dialect: 'mysql',
        host: 'localhost',
        username: 'my_user',
        password: 'password',
        database: 'my_project_db',
        models: [__dirname + '/src/**/*.model.ts'],
        logging: false,
    },
};
