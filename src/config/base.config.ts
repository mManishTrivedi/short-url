import * as Path from 'path';

const getRootPath = () => {
  // root path include distributed folder
  return Path.resolve(__dirname, './../../');
};

export const BaseConfig = {
  port: parseInt(process.env.PORT, 10) || 3131,
  database: {
    //db.createUser({user: 'manish', pwd:'password@123',      roles: [ { role: "readWrite", db: "url-db" } ],})
    host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : 'localhost',
    // eslint-disable-next-line prettier/prettier
    port: process.env.DATABASE_PORT ?  parseInt(process.env.DATABASE_PORT, 10) : '27017',
    // eslint-disable-next-line prettier/prettier
    username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : 'manish',
    // eslint-disable-next-line prettier/prettier
    password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : 'password@123',
    // eslint-disable-next-line prettier/prettier
    name: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'url-db',
  },

  get mongoDBConfig() {
    return {
      uri:
        'mongodb://' +
        encodeURIComponent(this.database.username) +
        ':' +
        encodeURIComponent(this.database.password) +
        '@' +
        this.database.host +
        ':' +
        this.database.port +
        '/' +
        encodeURIComponent(this.database.name),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },

  rootPath: getRootPath(),
};
