<template>

<v-app>
    <div class = "note" :style = "note">
        <v-form class = "demo-ruleForm login-container">
            <v-layout justify-end row0>
                <v-icon @click="back">mdi-close-circle</v-icon>
            </v-layout>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field :readonly="roomInfo.chairperson!==$email" label="Theme" v-model="roomInfo.theme"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-subheader>Chairperson</v-subheader>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field readonly v-model="roomInfo.chairperson"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">
                        <v-subheader>Time</v-subheader>
                    </v-col>
                    <v-col cols="4">
                        <v-menu
                            ref="menu_visible1"
                            v-model="menu_visible1"
                            :close-on-content-click="false"
                            :return-value.sync="roomInfo.date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            :disabled="roomInfo.chairperson!==$email"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="roomInfo.date"
                                    append-icon="event"
                                    @click:append="on.click"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-tabs
                                v-model="tab"
                                align-with-title
                                justify-end
                                >
                                <v-tabs-slider color="yellow"></v-tabs-slider>

                                <v-tab
                                    v-for="item in items"
                                    :key="item"
                                >
                                    {{ item }}
                                </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <v-card flat>
                                        
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card flat>
                                        <v-date-picker
                                            v-model="roomInfo.date"
                                            no-title
                                            scrollable
                                            value="yyyy/MM/dd"
                                        >
                                            <v-layout justify-end row1>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="$refs.menu_visible1.save(roomInfo.date)"
                                                >
                                                    confirm
                                                </v-btn>
                                            </v-layout>
                                        </v-date-picker>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-menu>
                    </v-col>
                    <v-col cols="1">
                        <v-subheader>~</v-subheader>
                    </v-col>
                    <v-col cols="4">
                        <v-menu
                            ref="menu_visible2"
                            v-model="menu_visible2"
                            :close-on-content-click="false"
                            :return-value.sync="roomInfo.date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            :disabled="roomInfo.chairperson!==$email"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="roomInfo.date"
                                    append-icon="event"
                                    @click:append="on.click"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-tabs
                                v-model="tab"
                                align-with-title
                                justify-end
                                >
                                <v-tabs-slider color="yellow"></v-tabs-slider>

                                <v-tab
                                    v-for="item in items"
                                    :key="item"
                                >
                                    {{ item }}
                                </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <v-card flat>
                                        
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card flat>
                                        <v-date-picker
                                            v-model="roomInfo.date"
                                            no-title
                                            scrollable
                                            value="yyyy/MM/dd"
                                        >
                                            <v-layout justify-end row2>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="$refs.menu_visible2.save(roomInfo.date)"
                                                >
                                                    confirm
                                                </v-btn>
                                            </v-layout>
                                        </v-date-picker>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-spacer></v-spacer>
                <v-row>
                    <v-col cols="8" sm="6" md="3">
                        <v-subheader>Invited</v-subheader>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field 
                            :rules="[rules.required]"
                            name="input-E-mail"
                            v-model="roomInfo.emails"
                            value=""
                            :readonly="roomInfo.chairperson!==$email"
                            error
                        ></v-text-field> <!--multiple--> 
                    </v-col>
                </v-row>
                <v-row>
                    <v-textarea
                        label="Agenda"
                        v-model = "roomInfo.agenda"
                        auto-grow
                        outlined
                        row-height="25"
                        :readonly="roomInfo.chairperson!==$email"
                    ></v-textarea>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-show="roomInfo.chairperson===$email" v-model = "roomInfo.notes" label="Notes for self"></v-text-field>
                    </v-col>
                </v-row>
                <p v-show="error_msg!==''" v-text="error_msg"></p>
                <v-layout justify-center rowb>
                    <el-button type = "primary" style = "width:30%;" @click = "submit" v-show="fromSite!=='activity'">Submit</el-button>
                    <el-button type = "primary" style = "width:30%;" @click = "saveInfo" v-show="fromSite==='activity'&&roomInfo.chairperson===$userName">Save</el-button>
                    <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="290"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                style = "width:30%;"
                                v-bind="attrs"
                                v-on="on"
                                v-show="roomInfo.chairperson===$email"
                            >
                            Cancel
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h5">Cancel?</v-card-title>
                            <v-card-text>Are you sure you would like to cancel this appoiuntment?</v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="green darken-1"
                                text
                                @click="cancel"
                            >
                                Yes
                            </v-btn>
                            <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                            >
                                No
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-container>
        </v-form>
    </div>
</v-app>
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
            rules: {
                required: value => !!value || 'Required.',
                emailMatch: value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.split(',')) || 'E-mail must be valid',
            },
            roomInfo: {
                roomType: this.$router.params.roomInfo.roomType,
                theme: this.$router.params.roomInfo.theme,
                chairperson: this.$router.params.roomInfo.chairPerson,
                date: this.$router.params.roomInfo.date,
                timeStart: this.$router.params.roomInfo.timeStart,
                timeEnd: this.$router.params.roomInfo.timeEnd,
                emails: this.$router.params.roomInfo.invited,
                agenda: this.$router.params.roomInfo.agenda,
                notes: this.$router.params.roomInfo.note,
            },
            tab: null,
            items: [
                'Day', 'Month',
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            menu_visible1: false,
            menu_visible2: false,
            dialog: false,
            selected: this.value,
            error_msg: '',
            fromSite: this.$router.params.fromSite,
        }
    },
    methods: {
        submit () {
            this.$emit('Reserve', this, this.roomInfo)
        },
        saveInfo () {
            this.$emit('Saving', this, this.roomInfo)
        },
        reserveResponse(state) {
            console.log(state);
            this.error_msg = '';
            if (state === '0') {
                console.log('ok');
                this.$router.replace('/activity');
            }
            else if (state === '1') {
                console.log('room hasbeen rent');
                this.error_msg = 'room hasbeen rent';
            }
            else if (state === '2') {
                console.log('room hasn\'t been released');
                this.error_msg = 'room hasn\'t been released';
            }
            else if (state === '3') {
                console.log('time or date can\'t be empty');
                this.error_msg = 'time or date can\'t be empty';
            }
            else if (state === '5') {
                console.log('U R NOT LOGIN');
                this.$router.replace('/login');
            }
        },
        saveInfoResponse(state) {
            this.reserveResponse(state)
        },
        cancel () {
            if (this.fromSite === 'activity') {
                this.dialog = false
                console.log('cancel the meeting')
                this.$emit('CancelRoom', this, this.roomInfo)
            }
            else {
                this.$router.replace('/booking')
            }
        },
        cancelResponse(state) {
            if (state === '0') {
                console.log('ok');
                this.$router.replace('/booking')
            }
            else if (state === '1') {
                console.log('Cancel failed');
                this.error_msg = 'Cancel failed';
            }
            else if (state === '5') {
                console.log('U R NOT LOGIN');
                this.$router.replace('/login');
            }
        },
        back() {
            if (this.fromSite === 'activity') {
                this.$router.replace('/activity')
            }
            else if (this.fromSite === 'booking') {
                this.$router.replace('/booking')
            }
            else {
                this.$router.replace('/home')
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

.v-tab {
    text-transform: none !important;
}
</style>

<style scoped>
.embed-card {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
}
</style>