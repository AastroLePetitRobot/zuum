
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
        async registerUser(registerInfo) {
            try {
                const name = registerInfo.name;
                const email = registerInfo.email;
                const password = registerInfo.password;
                const response = await this.$axios.post('/register', { name, email, password });
                console.log(response.data);
                } catch (error) {
                console.log(error);
                }
            }
     }
}
</script>

<style lang="scss" scoped>

</style>