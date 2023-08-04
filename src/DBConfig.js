export const DBConfig = {
    name: 'MyDB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'gps',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'time', keypath: 'time', options: { unique: true } },
          { name: 'latitude', keypath: 'latitude', options: { unique: false } },
          { name: 'longitude', keypath: 'longitude', options: { unique: false } }
        ]
      }
    ]
  };