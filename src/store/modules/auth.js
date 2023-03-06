import authApi from "@/api/auth";

const state = {
    isSubmitting: false
}

const mutations = {
    registerStart(state) {
        state.isSubmitting = true
    },
    registerSuccess(state) {
        state.isSubmitting = false
    },
    registerFailure(state) {
        state.isSubmitting = false
    }
}

const actions = {
   register(context, credentials) {
    console.log("actions register")
    return new Promise(resolve => {
        authApi.register(credentials)
            .then(response => {
                console.log('response', response)
                context.commit('registerSuccess', response.data.user)
                resolve(response.data.user)
            })
            .catch(result => {
                console.log('result errors', result);
                context.commit('registerFailure', result.response.data.errors);
            });
    })

    /*context.commit('registerStart')
    setTimeout(() => {
        context.commit('registerSuccess')
    }, 1000)*/
   } 
}

export default {
   state,
   actions,
   mutations,
   //gettter 
}