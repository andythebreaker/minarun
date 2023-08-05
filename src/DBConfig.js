export const DBConfig = {
    name: 'MyDB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'dist',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'uni', keypath: 'time', options: { unique: false } },
          //{ name: 'latitude', keypath: 'latitude', options: { unique: false } },
          //{ name: 'longitude', keypath: 'longitude', options: { unique: false } }
        ]
      }
    ]
  };