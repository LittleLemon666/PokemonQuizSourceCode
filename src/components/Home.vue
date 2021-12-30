<template>
    <v-layout justify-end rowc>
        <!-- <v-main>
            <router-view></router-view>
        </v-main> -->
        <v-form class = "demo-ruleForm login-container">
        <v-container style="margin: 10px; padding: 10px;" outlier>
                <v-row>
                    <v-col cols="12">
                        <v-text-field readonly label="Theme" v-model="roomsInfo[0].theme"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-subheader>Chairperson</v-subheader>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field readonly v-model="roomsInfo[0].chairPerson"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">
                        <v-subheader>Time</v-subheader>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            v-model="roomsInfo[0].date"
                            readonly
                        ></v-text-field>
                        <v-text-field
                            v-model="roomsInfo[0].timeStart"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-subheader>~</v-subheader>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            v-model="roomsInfo[0].date"
                            readonly
                        ></v-text-field>
                        <v-text-field
                            v-model="roomsInfo[0].timeEnd"
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
                            name="input-E-mail"
                            v-model="roomsInfo[0].invited"
                            value=""
                            readonly
                        ></v-text-field> <!--multiple--> 
                    </v-col>
                </v-row>
                <v-row>
                    <v-textarea
                        label="Agenda"
                        v-model = "roomsInfo[0].agenda"
                        auto-grow
                        outlined
                        row-height="25"
                        readonly
                    ></v-textarea>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-show="roomsInfo[0].chairperson===$email" v-model = "roomsInfo[0].notes" label="Notes for self"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
    </v-form>

        <v-col
            cols="12"
            rows="36"
            sm="6"
        >
        <v-date-picker
            no-title
            v-model="dates"
            input-class="datetime-picker"
            width="100%"
            :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
            :events="functionEvents"
        >
        </v-date-picker>
        </v-col>
    </v-layout>
</template> 

<script>
export default {
    data () {
        return {
            roomsInfo: [
                {
                    RUID: '??',
                    room: 'RoomC2',
                    theme: 'Hello',
                    chairPerson: 'ntust@gamil.com',
                    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    timeStart: '0700',
                    timeEnd: '0900',
                    invited: 'b10815000@gapps.ntust.edu.tw',
                    agenda: 'I am a master of coding',
                    note: 'test'
                },
                {
                    RUID: '???',
                    room: 'RoomA1',
                    theme: 'World',
                    chairPerson: 'b10815000@gapps.ntust.edu.tw',
                    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    timeStart: '0900',
                    timeEnd: '1700',
                    invited: 'test@gmail.com',
                    agenda: 'XP',
                    note: '030'
                },
            ],
            arrayEvents: null,
            dates: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        
            // attributes: [
            //     {
            //         bar: {
            //             backgroundColor: '#ff4d4d', // Red
            //         },
            //         dates: [
            //             new Date(2021, 12, 1),
            //         ],
            //     },
            //     {
            //         bar: {
            //             backgroundColor: '#398fac', // Turquoise
            //         },
            //         dates: [
            //             new Date(2021, 12, 4),
            //         ],
            //     },
            //     {
            //         bar: {
            //             backgroundColor: '#794dff', // Purple
            //         },
            //         dates: [
            //             new Date(2021, 12, 1),
            //         ],
            //     },
            //],        
        };
    },
    beforeMount() {
        this.fetchRoomByActivity()
    },
    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30)
        const d = new Date()
        d.setDate(day)
        return d.toISOString().substr(0, 10)
      })
    },
    methods: {
        fetchRoomByActivity() {
            this.$emit('fetchRoomByActivity', this)
        },
        fetchRoomByActivityResponse(data) {
            this.roomsInfo = []
            for (let index = 0; index < data.length; index++) {
                let roomsInfo = {
                    RUID: data[index].RUID,
                    room: data[index].Room,
                    theme: data[index].Theme,
                    chairPerson: data[index].ChairPerson,
                    invited: data[index].Invites,
                    date: data[index].Date,
                    timeStart: data[index].TimeStart,
                    timeEnd: data[index].TimeEnd,
                    agenda: data[index].Agenda,
                    note: data[index].Note
                }
                roomsInfo.push(roomsInfo)
            }
        },
        functionEvents (date) {
            const [,, day] = date.split('-')
            if ([12, 17, 28].includes(parseInt(day, 10))) return true
            if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
            return false
        },
   }
}</script>

<style>
.content .banner {
    margin-left:280px;
    width: 100%;
    height: 200px;
    background-size:cover;
}

.content .banner div {
    display: inline-block;
}
</style>