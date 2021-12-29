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
                <v-text-field label="First Name" v-model="firstName"></v-text-field>
                </v-col>

                <v-col rows="12">
                <v-text-field label="Last Name" v-model="secondName"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="12">
                    <v-text-field label="Account" v-model="account"></v-text-field>
                    <v-text-field 
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-Password"
                        label="Password"
                        hint="At least 8 characters"
                        value=""
                        v-model="password"
                        error
                        @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field 
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.confirm]"
                        :type="show2 ? 'text' : 'password'"
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
                        v-model="userMail"
                        :readonly="fromSite!=='login'"
                        error
                    ></v-text-field>
                </v-col>
            </v-row>
            <p v-show="error_msg!==''" v-text="error_msg"></p>
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
            firstName: this.$firstName,
            secondName: this.$lastName,
            account: this.$userName,
            show1: false,
            show2: false,
            password: '',
            confirmpassword: '',
            userMail: this.$email,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                confirm: value => (value === this.password) || 'Must same as password',
                emailMatch: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
            },
            fromSite: this.$router.params.fromSite,
            error_msg: ''
        }
    },
    methods: {
        save() {
            this.$emit('Save', this, this.userMail, this.account, this.firstName, this.secondName, this.password, this.fromSite)
            //this.saveResponse('3') // for test
            // this.connect('ws://' + location.host + '/socket/websocket/030', { format: 'json' })
        },
        saveResponse(state) {
            console.log(state);
            this.error_msg = '';
            if (state === '0') {
                console.log('ok');
                if (!this.$userName) {
                    this.$router.replace('/login')
                }
                else {
                    this.$router.replace('/home')
                }
            }
            else if (state === '1') {
                console.log('user\'s mail or account hasbeen reg');
                this.error_msg = 'user\'s mail or account hasbeen reg';
            }
            else if (state === '2') {
                console.log('name can\'t be empty');
                this.error_msg = 'name can\'t be empty';
            }
            else if (state === '3') {
                console.log('passward can\'t be empty');
                this.error_msg = 'passward can\'t be empty';
            }
            else if (state === '4') {
                console.log('not a mail');
                this.error_msg = 'not a mail';
            }
            else if (state === '5') {
                console.log('something 2 long');
                this.error_msg = 'something 2 long';
            }
        },
        editResponse(state) {
            console.log(state);
            this.error_msg = '';
            if (state === '0') {
                console.log('ok');
                if (!this.$userName) {
                    this.$router.replace('/login')
                }
                else {
                    this.$router.replace('/home')
                }
            }
            else if (state === '1') {
                console.log('user\'s account hasbeen reg');
                this.error_msg = 'user\'s account hasbeen reg';
            }
            else if (state === '2') {
                console.log('name can\'t be empty');
                this.error_msg = 'name can\'t be empty';
            }
            else if (state === '3') {
                console.log('passward can\'t be empty');
                this.error_msg = 'passward can\'t be empty';
            }
            else if (state === '4') {
                console.log('not a mail');
                this.error_msg = 'not a mail';
            }
            else if (state === '5') {
                console.log('something 2 long');
                this.error_msg = 'something 2 long';
            }
            else if (state === '87') {
                console.log('U R NOT LOGIN ==');
                this.error_msg = 'U R NOT LOGIN ==';
            }
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