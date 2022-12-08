<template>
    <v-container>
        <h1>Login</h1>
        <AuthForm :submitForm="LoginUser"/>
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
                    email: loginInfo[0],
                    password: loginInfo[1]
                }
            });
            console.log(loginInfo);
        }
    }

}
</script>

<style lang="scss" scoped>

</style>