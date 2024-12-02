<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Customers</h3>
        </div>
        <div class="col text-right">
          <a @click="addCustomer = true" href="#" class="btn btn-sm btn-primary"
            >Add</a
          >
          <!-- <base-button
            block
            type="primary"
            class=" mb-3"
            @click="addCustomer = true"
          >
            Default
          </base-button> -->
        </div>
      </div>
    </div>

    <div class="table-responsive tablesorter">
      <base-table thead-classes="thead-light" :data="tableData">
        <template slot="columns">
          <th>Name</th>
          <th>Phone</th>
          <th></th>
          <th></th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">
            {{ row.name }}
          </th>
          <td>
            {{ row.phone }}
          </td>
          <td>
            <a
              v-on:click="getSales(row.id)"
              @click="sales = true"
              href="#"
              class="btn btn-sm btn-primary"
              >Get Sales</a
            >
          </td>
          <td>
            <a
              v-on:click="deleteCustomer(row.id)"
              href="#"
              class="btn btn-sm btn-danger"
              >Delete</a
            >
          </td>
        </template>
      </base-table>
    </div>

    <modal
      :show.sync="addCustomer"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-sm"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template>
          <form role="form">
            <base-input
              v-model="name"
              alternative
              class="mb-3"
              placeholder="Name"
              addon-left-icon="ni ni-circle-08"
            >
            </base-input>
            <base-input
              v-model="phone"
              alternative
              placeholder="Phone"
              addon-left-icon="ni ni-mobile-button"
            >
            </base-input>
          </form>
        </template>
        <template slot="footer">
          <base-button
            v-on:click="postCustomer(name, phone)"
            class="ml-auto"
            type="primary"
            >Add</base-button
          >
          <base-button
            type="link"
            class="float-right"
            @click="addCustomer = false"
            >Close
          </base-button>
        </template>
      </card>
    </modal>

    <modal
      :show.sync="sales"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template>
          <div class="table-responsive">
            <base-table thead-classes="thead-light" :data="salesData">
              <template slot="columns">
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </template>

              <template slot-scope="{ row }">
                <th scope="row">
                  {{ row.productName }}
                </th>
                <td>
                  {{ row.price }}
                </td>
                <td>
                  {{ row.quantity }}
                </td>
              </template>
            </base-table>
          </div>
        </template>
        <template slot="footer">
          <base-button
            @click="(addSale = true), (sales = false)"
            class="ml-auto"
            type="primary"
            >Add</base-button
          >
          <base-button type="link" class="float-right" @click="sales = false"
            >Close
          </base-button>
        </template>
      </card>
    </modal>

    <modal
      :show.sync="addSale"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-sm"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template>
          <form role="form">
            <base-input
              v-model="productName"
              alternative
              class="mb-3"
              placeholder="Name"
              addon-left-icon="ni ni-circle-08"
            >
            </base-input>
            <base-input
              v-model="price"
              alternative
              placeholder="Price"
              addon-left-icon="ni ni-mobile-button"
            >
            </base-input>
            <base-input
              v-model="quantity"
              alternative
              placeholder="Quantity"
              addon-left-icon="ni ni-mobile-button"
            >
            </base-input>
          </form>
        </template>
        <template slot="footer">
          <base-button
            v-on:click="postSale(currentCustomer, productName, price, quantity)"
            class="ml-auto"
            type="primary"
            >Add</base-button
          >
          <base-button type="link" class="float-right" @click="addSale = false"
            >Close
          </base-button>
        </template>
      </card>
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal";
import Axios from "../../configs/axios";
export default {
  name: "customers-table",
  components: {
    Modal,
  },
  methods: {
    loadData() {
      Axios.get("customers").then((res) => {
        this.tableData = res.data;
      });
    },
    getSales(id) {
      this.currentCustomer = id;
      Axios.get("sales/" + id).then((res) => {
        this.salesData = res.data;
      });
    },
    postCustomer(name, phone) {
      Axios.post("customers", { name, phone }).then(() => {
        this.loadData();
        this.addCustomer = false;
      });
    },
    postSale(customerId, productName, price, quantity) {
      Axios.post("sales/" + customerId, { productName, price, quantity }).then(
        () => {
          // this.loadSale();
          this.addSale = false;
        },
      );
    },
    deleteCustomer(id) {
      Axios.delete("customers/" + id).then(()=>{
        this.loadData();
      });
    },
  },
  mounted() {
    this.loadData();
  },
  data() {
    return {
      currentCustomer: "",
      addCustomer: false,
      addSale: false,
      sales: false,
      productName: "",
      price: null,
      quantity: null,
      name: "",
      phone: "",
      tableData: [],
      salesData: [],
    };
  },
};
</script>
<style></style>
