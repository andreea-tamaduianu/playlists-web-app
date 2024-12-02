/* eslint-disable camelcase */
const express = require("express");
const authMiddleware = require("../configs/auth-middleware");
const firebase = require("../firebase/admin");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = firebase.firestore();
    const customersRef = db.collection("customers");

    const snapshot = await customersRef.get();

    const customersArray = [];

    snapshot.forEach((doc) => {
      let customer = doc.data();
      customer.id = doc.id;
      customersArray.push(customer);
    });

    res.status(200).json(customersArray);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, phone } = req.body;

    const { id } = req.params;

    if (!name || !phone || !id) {
      throw new Error("data missing");
    }
    const db = firebase.firestore();

    const docRef = await db.collection("customers").doc(id);

    await docRef.set({
      name,
      phone,
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

    await db.collection("customers").doc(id).delete();

    res.status(202).json({ message: "deleted" });
  } catch (error) {
    res.status(202).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const db = firebase.firestore();

    const { name, phone } = req.body;

    if (!name || !phone) {
      throw new Error("name or phone missing");
    }

    await db.collection("customers").add({
      name,
      phone,
    });

    res.status(202).json({ message: "created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
