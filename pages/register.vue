<template>
    <v-container>
        <h1>Register</h1>
        <RegisterForm :submitForm= "registerUser" />
    </v-container>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
export default {
    components: {
        RegisterForm
    },

    methods: {
        registerUser(registerInfo) {
            this.$auth.registerStrategy('local', {
                data: {
                    name: registerInfo.name,
                    email: registerInfo.email,
                    password: registerInfo.password
                }
            });
            console.log('test');
        }   
    }
}
</script>

<style lang="scss" scoped>

</style>