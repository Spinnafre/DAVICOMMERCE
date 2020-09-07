import mongoose, { Mongoose } from "mongoose";

// Informações sobre o comprador (Localizaçãp,...)
const ShippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postal: { type: Number, required: true },
};

const PaymentMethodSchema = {
  paymentMethod: { type: String, required: true },
};

const CartItems = new mongoose.Schema({
  name: { type: String, required: true },
  qtd: { type: Number, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
})

const MainSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [CartItems],
    // Addres, City, Country, PostalCOde...
    shipping: ShippingSchema,
    // Payment Method
    payment: { type: String, required: true },
    // Informações da Encomenda
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    // Pago? e o dia que foi pago
    isPaid: { type: Boolean, default: false },
    paidData: { type: Date },
    // Entregue? e o dia que foi entregue
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const OrderPayment = mongoose.model("Order", MainSchema);
export default OrderPayment;
