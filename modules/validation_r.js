// Task Input Validation


export function validateTask(text){


    // Empty check

    if(text.trim() === ""){

        return {
            valid:false,
            message:"Please enter a task"
        };

    }



    // Character length check

    if(text.trim().length < 3){

        return {
            valid:false,
            message:"Task must contain at least 3 characters"
        };

    }



    if(text.trim().length > 100){

        return {
            valid:false,
            message:"Task cannot exceed 100 characters"
        };

    }



    return {

        valid:true,
        message:""

    };


}