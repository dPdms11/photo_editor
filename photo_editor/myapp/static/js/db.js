var db = new Dexie('imageDB');

db.version(1).stores({
    images: '++id, secondary'
});

export default db;