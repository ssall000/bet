import mongoDb from 'mongodb'


const DB_URL='mongodb://localhost:27017/';
const DB_NAME='bet';

const self = {

    connections: {},
    connect(url, dbname) {
        if (self.hasConnectionAlready(dbname)) return self.connections[dbname];
        return new Promise((res, rej) => {
            if (!self.mongoClient) self.mongoClient = mongoDb.MongoClient;
            self.mongoClient.connect(url, function (err, db) {
                if (err) return rej(err);
                self.connections[dbname] = db.db(dbname);
                console.log('db created');
                return res(self.connections[dbname])
            });
        })
    },
    hasConnectionAlready(dbname) {
        return !!self.connections[dbname]
    },

    getBetConnection() {
        return self.connect(DB_URL, DB_NAME);
    }
}

export default self;

