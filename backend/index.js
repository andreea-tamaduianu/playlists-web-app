const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./configs/auth-middleware");
const customerRouter = require("./routes/customer-route");
const salesRouter = require("./routes/sales-route");
const firebase = require("./firebase/admin");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/fake", async (req, res) => {
  var faker = require("faker");
  const db = firebase.firestore();

  for (let index = 0; index < 10; index++) {
    const docRef = await db.collection("customers").doc();

    var name = faker.name.findName(); // Rowan Nikolaus
    var phone = faker.phone.phoneNumber();

    await docRef.set({
      name,
      phone,
    });

    var nrOfProd = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < nrOfProd; i++) {
      var productName = faker.commerce.productName();
      var price = Math.floor(Math.random() * 100);
      var quantity = Math.floor(Math.random() * 10);

      const saleRef = await db.collection("sales").doc();

      await saleRef.set({
        customerId: docRef.id,
        productName,
        price,
        quantity,
      });
    }
  }

  res.json("Faked");
});

// app.use("/", authMiddleware);
app.use("/customers", customerRouter);
app.use("/sales", salesRouter);

app.listen(3001, () => console.log("The server is running at PORT 3001"));
