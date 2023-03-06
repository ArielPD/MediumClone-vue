import authApi from "@/api/auth";

const state = {
    isSubmitting: false,
    isLoggedIn: null,
    currentUser: null,
    validationErrors: null
}

const mutations = {
    registerStart(state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    registerSuccess(state, payload) {
        state.isSubmitting = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    registerFailure(state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

const actions = {
   register(context, credentials) {
    console.log("actions register")
    context.commit('registerStart')
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