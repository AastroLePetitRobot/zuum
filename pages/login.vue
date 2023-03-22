<template>
    <v-container>
        <h1>Login</h1>
        <AuthForm :submitForm="LoginUser" />
    </v-container>
</template>

<script>
import AuthForm from '@/components/AuthForm.vue';
export default {
    components: {
        AuthForm
    },

    methods: {
        LoginUser(loginInfo) {
            this.$auth.loginWith('local', {
                data: {
                    email: loginInfo.email,
                    password: loginInfo.password
                }
            }).then(response => {
                console.log(response);
            });
        }
    }

}
</script>

<style lang="scss" scoped>

</style>