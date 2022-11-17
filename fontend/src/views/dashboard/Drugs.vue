<template>
  <div class="d-flex jc-between ai-center">
    <h2>All Drugs</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <div class="text-center" v-if="gettingDrugs">Loading...</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Weight</th>
        <th>Type</th>
        <th>Vendor</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vendor in drugs" :key="vendor.name">
        <td>
          {{ vendor.name }}
        </td>
        <td>
          {{ vendor.weight }}
        </td>
        <td>
          {{ vendor.type }}
        </td>
        <td>
          {{ vendor.vendor }}
        </td>
        <td>
          {{ vendor.price }}
        </td>
        <td>
          {{ vendor.quantity }}
        </td>
        <!-- {{
          selectedDrug._id
        }} -->
        <td>
          <img
            src="/img/edit.png"
            alt=""
            class="action-icon"
            @click="
              selectedDrug = vendor;
              editModal = true;
            "
          />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="
              selectedDrug = vendor;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </tbody>
  </table>

  <TheModal v-model="addModal" heading="Add new Drug">
    <form @submit.prevent="addNew">
      <label class="block">Select Drug Type</label>
      <div class="mt-2 mb-2">
        <label for="">
          <input
            type="radio"
            name="type"
            value="tablet"
            v-model="newDrug.type"
          />
          Tablet
        </label>
        <label for="">
          <input
            type="radio"
            name="type"
            value="capsule"
            v-model="newDrug.type"
          />
          Capsule
        </label>
        <label for="">
          <input
            type="radio"
            name="type"
            value="Syrap"
            v-model="newDrug.type"
          />
          Syrap
        </label>
        <label for="">
          <input
            type="radio"
            name="type"
            value="Suppository"
            v-model="newDrug.type"
          />
          Suppository
        </label>
      </div>

      <label class="block"> Drug Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        required
        v-model="newDrug.name"
      />

      <label class="block mt-3">weight</label>
      <input
        type="text"
        placeholder="select weight"
        class="mt-1 w-100"
        required
        v-model="newDrug.weight"
      />

      <label class="block mt-3">vendor</label>
      <select v-model="newDrug.vendor">
        <option value="">Selected One</option>
        <option
          v-for="vendor in vendors"
          :value="vendor.name"
          :key="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="select weight"
        class="mt-1 w-100"
        required
        v-model="newDrug.price"
      />

      <label class="block mt-3">Quantity</label>
      <input
        type="text"
        placeholder="select weight"
        class="mt-1 w-100"
        required
        v-model="newDrug.quantity"
      />
      <the-button :loading="adding" class="w-100 mt-4"> Add </the-button>
    </form>
  </TheModal>

  <TheModal v-model="editModal" heading="Edit Drugs">
    <form @submit.prevent="editDrug">
      <label class="block">Select Drug Type</label>
      <div class="mt-2 mb-2">
        <label for="">
          <input
            type="radio"
            name="type"
            value="tablet"
            v-model="selectedDrug.type"
          />
          Tablet
        </label>
        <label for="">
          <input
            type="radio"
            name="type"
            value="capsule"
            v-model="selectedDrug.type"
          />
          Capsule
        </label>
        <label for="">
          <input
            type="radio"
            name="type"
            value="Syrap"
            v-model="selectedDrug.type"
          />
          Syrap
        </label>
        <label for="">
          <input
            type="radio"
            name="type"
            value="Suppository"
            v-model="selectedDrug.type"
          />
          Suppository
        </label>
      </div>

      <label class="block"> Drug Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        required
        v-model="selectedDrug.name"
      />

      <label class="block mt-3">weight</label>
      <input
        type="text"
        placeholder="select weight"
        class="mt-1 w-100"
        required
        v-model="selectedDrug.weight"
      />

      <label class="block mt-3">vendor</label>
      <select v-model="selectedDrug.vendor">
        <option value="">Selected One</option>
        <option
          v-for="vendor in vendors"
          :value="vendor.name"
          :key="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="select weight"
        class="mt-1 w-100"
        required
        v-model="selectedDrug.price"
      />

      <label class="block mt-3">Quantity</label>
      <input
        type="text"
        placeholder="select weight"
        class="mt-1 w-100"
        required
        v-model="selectedDrug.quantity"
      />

      <the-button :loading="editing" class="w-100 mt-4">
        Save Changes
      </the-button>
    </form>
  </TheModal>

  <TheModal v-model="deleteModal" heading="Are you sure?">
    <p>
      Do you really want to delete
      <!-- <strong>{{ selectedDrug.name }}</strong> -->
    </p>

    <TheButton class="mt-4" @click="deleteDrugs" :loading="deleting">
      Yes
    </TheButton>
    <TheButton class="ml-4" color="gray" @click="deleteModal = false">
      No
    </TheButton>
  </TheModal>
</template>

<script>
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
// import { axiosPrivate } from "../../service/axiosInstance";
import privateService from "../../service/privateService";
import { showToastError, showToastSuccess } from "../../utils/eventBus";

export default {
  data: () => ({
    addModal: false,
    deleteModal: false,
    editModal: false,

    newDrug: {
      name: "",
      weight: "",
      type: "",
      vendor: "",
      price: "",
      quantity: "",
    },

    selectedDrug: {},
    deleting: false,
    editing: false,
    adding: false,
    drugs: [],
    gettingDrugs: false,
    vendors: [],
  }),
  components: {
    TheButton,
    TheModal,
  },

  mounted() {
    this.getAllDrugs();
    this.getAllVendors();
  },

  methods: {
    resetForm() {
      this.newDrug = {
        name: "",
        weight: "",
        type: "",
        vendor: "",
        price: "",
        quantity: "",
      };
    },

    addNew() {
      this.adding = true;
      // axios
      //   .post("http://localhost:5000/private/vendor", this.newDrug)
      privateService
        .addNewDrug(this.newDrug)
        .then((res) => {
          showToastSuccess(res.data.message);

          this.addModal = false;
          this.resetForm(); // clear the form
          this.getAllDrugs(); // for refresh the list
        })
        .catch((err) => {
          showToastError(err);
        });
    },

    getAllDrugs() {
      this.gettingDrugs = true;
      // axios req
      privateService
        .getDrugs()
        .then((res) => {
          // console.log(res.data);
          this.drugs = res.data.vendorData;
        })
        .catch((err) => {
          showToastError(err);
        })
        .finally(() => {
          this.gettingDrugs = false;
        });
    },

    getAllVendors() {
      // axios req
      privateService
        .getVendors()
        .then((res) => {
          this.vendors = res.data.vendorData;
        })
        .catch((err) => {
          showToastError(err);
        })
        .finally(() => {
          // this.gettingDrugs = false;
        });
    },

    deleteDrugs() {
      this.deleting = true;
      // axios req
      privateService
        .deleteDrug(this.selectedDrug._id)
        .then((res) => {
          showToastSuccess(res.data.message);

          this.deleteModal = false;
          this.getAllDrugs();
        })
        .catch((err) => {
          showToastError(err);
        })
        .finally(() => {
          this.deleting = false;
        });
    },

    editDrug() {
      this.editing = true;
      // axios
      //   .put(
      //     "http://localhost:5000/private/vendor/" + this.selectedDrug._id,
      //     this.selectedDrug
      //   )
      privateService
        .editDrug(this.selectedDrug._id, this.selectedDrug)
        .then((res) => {
          showToastSuccess(res.data.message);
          this.editModal = false;
        })
        .catch((err) => {
          showToastError(err);
        })
        .finally(() => {
          this.editing = false;
        });
    },
  },
};
</script>
