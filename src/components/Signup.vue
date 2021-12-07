<template>

<div class = "note" :style = "note">
    <v-form class = "demo-ruleForm login-container">
        <v-container>
            <v-row>
                <v-col rows="12" sm="6" md="3">
                <p>User Info</p>
                </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row>
                <v-col rows="12">
                <v-text-field label="First Name"></v-text-field>
                </v-col>

                <v-col rows="12">
                <v-text-field label="Last Name"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="12">
                    <v-text-field label="Account"></v-text-field>
                    <v-text-field 
                        :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show4 ? 'text' : 'password'"
                        name="input-Password"
                        label="Password"
                        hint="At least 8 characters"
                        value=""
                        v-model="password"
                        error
                        @click:append="show2 = !show2"
                    ></v-text-field>
                    <v-text-field 
                        :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.confirm]"
                        :type="show4 ? 'text' : 'password'"
                        name="input-Confirm Password"
                        label="Confirm Password"
                        value=""
                        error
                        @click:append="show2 = !show2"
                    ></v-text-field>
                    <v-text-field 
                        :rules="[rules.required, rules.emailMatch]"
                        name="input-E-mail"
                        label="E-mail"
                        value=""
                        error
                    ></v-text-field>
                </v-col>
            </v-row>
            <el-button type = "primary" style = "width:100%;" @click = "save">Save</el-button>
        </v-container>
    </v-form>
</div>
</template> 

<script>
export default {
    data() {
        return {
            logining : false,
            note: {
                position:"absolute",
                top:"0px",
                left:"0px",
                width: "100%",
                height:"100%",
                backgroundImage: "url(" + require("../assets/vrra_background.jpg") + ")",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            },
            show1: false,
            show2: false,
            password: '',
            confirmpassword: '',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                confirm: value => (value === this.password) || 'Must same as password',
                emailMatch: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
            },
        }
    },
    methods: {
       save () {
           this.$router.replace('/Login')
       }
   }
}
</script>

<style>
.login-container {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 550px;
    padding: 35px 35px 15px 35px;
    background: #fff
    ;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>