<template>

<v-app>
    <div class = "note" :style = "note">
        <v-form class = "demo-ruleForm aw-container">
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
                                    <v-card flat class="tt-container">
                                        <vue-good-table :columns="columns" :rows="rows">
                                            <template slot="table-row" slot-scope="props">
                                                <span v-if="props.column.field !== 'room' && props.column.field >= roomInfo.timeStart && props.column.field < roomInfo.timeEnd && props.row.room === roomInfo.roomType">
                                                    Select
                                                </span>
                                                <span v-else> {{ props.formattedRow[props.column.field] }} </span>
                                            </template>
                                        </vue-good-table>
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
                                        </v-date-picker>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-menu>
                        <v-text-field
                            v-model="roomInfo.timeStart"
                            readonly
                        ></v-text-field>
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
                                    <v-card flat class="tt-container">
                                        <vue-good-table :columns="columns" :rows="rows">
                                            <template slot="table-row" slot-scope="props">
                                                <span v-if="props.column.field !== 'room' && props.column.field >= roomInfo.timeStart && props.column.field < roomInfo.timeEnd && props.row.room === roomInfo.roomType">
                                                    Select
                                                </span>
                                                <span v-else> {{ props.formattedRow[props.column.field] }} </span>
                                            </template>
                                        </vue-good-table>
                                        <v-layout justify-end row1>
                                        </v-layout>
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
                                        </v-date-picker>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-menu>
                        <v-text-field
                            v-model="roomInfo.timeEnd"
                            readonly
                        ></v-text-field>
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
                    <el-button type = "primary" style = "width:30%;" @click = "saveInfo" v-show="fromSite==='activity'&&roomInfo.chairperson===$email">Save</el-button>
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
                RUID: this.$router.params.roomInfo.RUID,
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
            columns: [
                {
                    label: "",
                    field: "room",
                },
                {
                    label: "8a.m.",
                    field: "0800",
                },
                {
                    label: "9a.m.",
                    field: "0900",
                },
                {
                    label: "10a.m.",
                    field: "1000",
                },
                {
                    label: "11a.m.",
                    field: "1100",
                },
                {
                    label: "12p.m.",
                    field: "1200",
                },
                {
                    label: "1p.m.",
                    field: "1300",
                },
                {
                    label: "2p.m.",
                    field: "1400",
                },
                {
                    label: "3p.m.",
                    field: "1500",
                },
                {
                    label: "4p.m.",
                    field: "1600",
                },
                {
                    label: "5p.m.",
                    field: "1700",
                },
                {
                    label: "6p.m.",
                    field: "1800",
                },
                {
                    label: "7p.m.",
                    field: "1900",
                },
                {
                    label: "8p.m.",
                    field: "2000",
                },
            ],
            rows: [
                {
                    room: "RoomA1",
                },
                {
                    room: "RoomA2",
                },
                {
                    room: "RoomA3",
                },
                {
                    room: "RoomB1",
                },
                {
                    room: "RoomB2",
                },
                {
                    room: "RoomC1",
                },
                {
                    room: "RoomC2",
                },
            ]
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
                this.$activityWindowReturn = this.fromSite
                this.$router.replace('/booking')
            }
        },
        cancelResponse(state) {
            if (state === '0') {
                console.log('ok');
                this.$activityWindowReturn = this.fromSite
                this.$router.replace('/booking')
            }
            else if (state === '1') {
                console.log('Cancel failed');
                this.error_msg = 'Cancel failed';
            }
            else if (state === '87') {
                console.log('U R NOT LOGIN');
                this.$router.replace('/login');
            }
        },
        back() {
            this.$activityWindowReturn = this.fromSite
            if (this.fromSite === 'activity') {
                this.$router.replace('/activity')
            }
            else if (this.fromSite === 'booking') {
                this.$router.replace('/booking')
            }
            else {
                this.$router.replace('/home')
            }
        },
        setTimeStart(time, room) {
            this.roomInfo.timeStart = time
            this.roomInfo.roomType = room
        },
        setTimeEnd(time, room) {
            this.roomInfo.timeEnd = time
            this.roomInfo.roomType = room
        }
    }
}
</script>

<style>
.aw-container {
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

.tt-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 10px auto;
    width: 550px;
    height: 550px;
    overflow-y: auto;
    padding: 35px 35px 15px 35px;
    background: #fff
    ;
    border: 1px solid #eaeaea;
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