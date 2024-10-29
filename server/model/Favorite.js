const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',  // Assuming you have a Product model
        required: true,
      },
      name: String,
      brand: String,
      size: String,
      price: Number,
      quantity: Number,
      photo:String
      // Add any other product fields you need
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
