<template>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-text-field
            v-model="name"
            label="Name"
            name="name"
            prepend-icon="mdi-name"
            type="name"
            :rules="nameRules"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            label="Email"
            name="email"
            prepend-icon="mdi-email"
            type="email"
            :rules="emailRules"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="Password"
            prepend-icon="mdi-lock"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
            counter:true
            required
        ></v-text-field>
        <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            prepend-icon="mdi-lock"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules.concat(passwordConfirmationRule)"
            counter:true
            required
        ></v-text-field>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submitForm({name: name, email: email, password: password})"
        >Register</v-btn>
        <v-btn 
        color="error" dark
        @click ="reset">
        reset</v-btn>
        <AlertFormIncorrect v-if="showAlertIncorrect" />
     </v-form>
</template>

<script>
import AlertFormIncorrect from '@/components/AlertFormIncorrect.vue';
import { computed } from 'vue';
    export default {
        components: {
            AlertFormIncorrect
        },
        data: () => ({
                showAlertIncorrect: false,
                showPassword: false,
                valid: true,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                password: '',  
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 8) || 'Password must be more than 8 characters',
                ],
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 3) || 'Name must be more than 3 characters',
                ],
                confirmPassword: '',
        }),

        methods: {
            reset() {
                this.$refs.form.reset()
            },
            register() {
                if (this.$refs.form.validate()) {
                   

                } else {
                    this.showAlertIncorrect = true;
                }   
            }   
        },
        
        props: {
            submitForm: {
                type: Function,
                required: true
            }
        },
        computed: {
            passwordConfirmationRule() {
                return () =>
                this.password === this.confirmPassword || "Password must match";
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>