import { axiosPrivate } from "./axiosInstance";

// this is the function that is called when the user clicks on the button
export default {
    // get all vendors
    getVendors() {
        return axiosPrivate.get('/private/vendor');
    },

    // addNew vendor
    addNew(vendor) {  
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

}