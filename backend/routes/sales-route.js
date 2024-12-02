/* eslint-disable camelcase */
const express = require("express");
const authMiddleware = require("../configs/auth-middleware");
const firebase = require("../firebase/admin");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const db = firebase.firestore();
    const salesRef = db.collection("sales");

    const snapshot = await salesRef
      .where("customerId", "==", req.params.id)
      .get();

    const salesArray = [];

    snapshot.forEach((doc) => {
      salesArray.push(doc.data());
    });

    res.status(200).json(salesArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { productName, price, quantity } = req.body;

    if (!id || !productName || !price || !quantity) {
      throw new Error("data missing");
    }
    const db = firebase.firestore();

    const docRef = db.collection("sales").doc(id);

    await docRef.set({
      productName,
      price,
      quantity,
    });

    res.status(202).json({ message: "accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("id missing");
    }
    const db = firebase.firestore();

    const res = await db.collection("sales").doc(id).delete();

    res.status(202).json({ message: "deleted" });
  } catch (error) {
    res.status(202).json({ message: error.message });
  }
});

router.post("/:customerId", authMiddleware, async (req, res) => {
  try {
    const { productName, price, quantity } = req.body;

    const { customerId } = req.params;

    if (!customerId || !productName || !price || !quantity) {
      throw new Error("data missing");
    }
    const db = firebase.firestore();

    const docRef = db.collection("sales").doc();

    await docRef.set({
      customerId,
      productName,
      price,
      quantity,
    });

    res.status(202).json({ message: "created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
