import mitt from 'mitt';

export const eventBus = mitt();


export const showToastError = (error) => {
    // console.log(error);

    let errorMessage = error || "Something went wrong";

    if(error.response){
       errorMessage = error.response.data.message;
    }

    eventBus.emit("Toast", {
        type: "Error",
        message: errorMessage,
    });
};


export const showToastSuccess = (payload) => {
    let successMessage = payload || "Success";

    if(payload.data){
        successMessage = payload.data.message;
    }

    eventBus.emit("Toast", {
        type: "Success",
        message: successMessage,
    });
};  
