<template>

<v-app>
    <div class = "note" :style = "note">
        <v-form class = "demo-ruleForm login-container">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Theme" v-model="roomInfo.theme"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-subheader>Chairperson</v-subheader>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field v-model="roomInfo.chairperson"></v-text-field>
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
                    ></v-textarea>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model = "roomInfo.notes" label="Notes for self"></v-text-field>
                    </v-col>
                </v-row>
                <v-layout justify-center rowb>
                    <el-button type = "primary" style = "width:30%;" @click = "submit">Submit</el-button>
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
                roomType: this.$router.params.roomType,
                theme: '',
                chairperson: this.$userName,
                date: this.$router.params.date,
                timeStart: this.$router.params.timeStart,
                timeEnd: this.$router.params.timeEnd,
                emails: '',
                agenda: '',
                notes: '',
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
        }
    },
    methods: {
       submit () {
            //this.$router.replace('/login')
            console.log(this.roomInfo)
            this.$emit('Reserve', this, this.roomInfo)
       },
       cancel () {
            this.dialog = false,
            this.$router.replace('/booking')
       },
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