import { axiosPrivate } from "./axiosInstance";

// this is the function that is called when the user clicks on the button
export default {
    // get all vendors
    getVendors() {
        return axiosPrivate.get('/private/vendor');
    },
    // addNew vendor
    addNewVendor(vendor) {  
        return axiosPrivate.post('/private/vendor', vendor);
    },
    // edit Vendor
    editVendor(id, vendor) {
        return axiosPrivate.put(`/private/vendor/${id}`, vendor);
    },
    // delete Vendor
    deleteVendor(id) {
        return axiosPrivate.delete(`/private/vendor/${id}`);
    },


    // get all Drugs
    getDrugs() {
        return axiosPrivate.get('/private/drug');
    },
    // addNew Drugs
    addNewDrug(drug) {  
        return axiosPrivate.post('/private/drug', drug);
    },
    // edit Drugs
    editDrug(id, drug) {
        return axiosPrivate.put(`/private/drug/${id}`, drug);
    },
    // delete Drugs
    deleteDrug(id) {
        return axiosPrivate.delete(`/private/drug/${id}`);
    },

}