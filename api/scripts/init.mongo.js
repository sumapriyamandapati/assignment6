db.products.remove({});
db.deleted_products.remove({});
const productDB = [
{
    Product_id:1,
    Product_name :'t-shirt',
    Category :shirt,
    Price : 20,
    Image : 'gthhh',
    description: 'Steps to recreate the problem:'
      + '\n1. Refresh the browser.'
      + '\n2. Select "New" in the filter'
      + '\n3. Refresh the browser again. Note the warning in the console:'
      + '\n   Warning: Hash history cannot PUSH the same path; a new entry'
      + '\n   will not be added to the history stack'
      + '\n4. Click on Add.'
      + '\n5. There is an error in console, and add doesn\'t work.',
},
{
    Product_id:2,
    Product_name :'p-shirt',
    Category :shirt,
    Price : 30,
    Image : 'hhhhh',
    description: 'There needs to be a border in the bottom in the panel'
      + ' that appears when clicking on Add',
    },
    ];
    db.products.insertMany(productDB);
    const count = db.products.count();
    print('Inserted', count, 'products');
    db.counters.remove({ _id: 'products' });
    db.counters.insert({ _id: 'products', current: count });
    db.products.createIndex({ id: 1 }, { unique: true });
    db.products.createIndex({ Product_name: 1 });
    db.products.createIndex({ Category: 1 });
    db.products.createIndex({ Price: 1 });
    db.products.createIndex({ Image: 1 });
    db.deleted_products.createIndex({ Product_id: 1 }, { unique: true });