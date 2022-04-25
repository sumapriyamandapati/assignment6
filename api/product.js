const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence} = require('./db.js');

async function get(_, { Product_id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ Product_id });
  return product;
}

async function list(_, { status, effortMin, effortMax}) {
    //console.log("In product list");
    const db = getDb();
    const filter = {};
    if (status) filter.status = status;

    if (effortMin !== undefined || effortMax !== undefined) {
      filter.effort = {};
      if (effortMin !== undefined) filter.effort.$gte = effortMin;
      if (effortMax !== undefined) filter.effort.$lte = effortMax;
      }
    const products = await db.collection('products').find(filter).toArray();
    return products;
}
function validate(product) {
    const errors = [];
    if (errors.length > 0) {
      throw new UserInputError('Invalid input(s)', { errors });
    }
  }

  async function add(_, { product }) {
    const db = getDb();
    validate(product);

    const newProduct = Object.assign({}, product);
    const temp = await db.collection('products').find({}).toArray();
     newProduct.Product_id = temp.length+1;
     //newProduct.Product_id = this.state.products.length + 1;

    const result = await db.collection('products').insertOne(newProduct);
    const savedProduct = await db.collection('products')
    .findOne({ _id: result.insertedId });
    return savedProduct;
}

async function update(_, { Product_id, changes }) {
  const db = getDb();
  if (changes.status || changes.Product_name || changes.Category) {
    const product = await db.collection('products').findOne({ Product_id });
    Object.assign(product, changes);
    validate(product);
  }
  await db.collection('products').updateOne({ Product_id }, { $set: changes });
  const savedProduct = await db.collection('products').findOne({ Product_id });
  return savedProduct;
}

async function remove(_, { Product_id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ Product_id });
  if (!product) return false;
  product.deleted = new Date();
  let result = await db.collection('deleted_products').insertOne(product);
  if (result.insertedId) {
  result = await db.collection('products').removeOne({ Product_id });
  return result.deletedCount === 1;
  }
  return false;
  }
module.exports = { list, add, get,
  update, delete:remove, };