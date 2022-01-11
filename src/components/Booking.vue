<template>
    <v-app>
        <v-layout justify-center row0>
            <v-col cols="1">
                <v-subheader>Date</v-subheader>
            </v-col>
            <v-col cols="1">
                <v-menu
                    ref="menuVisible1"
                    v-model="menuVisible1"
                    :close-on-content-click="false"
                    :return-value.sync="dateBegin"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateBegin"
                            append-icon="event"
                            @click:append="on.click"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="dateBegin"
                        no-title
                        scrollable
                        value="yyyy/MM/dd"
                    >
                        <v-layout justify-end row1>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menuVisible1.save(dateBegin); changeTime()"
                            >
                                confirm
                            </v-btn>
                        </v-layout>
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="1">
                <v-subheader>~</v-subheader>
            </v-col>
            <v-col cols="1">
                <v-menu
                    ref="menuVisible2"
                    v-model="menuVisible2"
                    :close-on-content-click="false"
                    :return-value.sync="dateEnd"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateEnd"
                            append-icon="event"
                            @click:append="on.click"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="dateEnd"
                        no-title
                        scrollable
                        value="yyyy/MM/dd"
                    >
                        <v-layout justify-end row1>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menuVisible2.save(dateEnd); changeTime()"
                            >
                                confirm
                            </v-btn>
                        </v-layout>
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="1">
                <v-subheader>Time</v-subheader>
            </v-col>
            <v-col cols="1">
                <v-combobox
                    v-model="timeStart"
                    :items="times"
                    label="time start"
                    @change="localChangeTime"
                    outlined
                ></v-combobox>
                <!-- <v-menu
                    ref="menuVisible3"
                    v-model="menuVisible3"
                    :close-on-content-click="false"
                    :return-value.sync="timeStart"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="timeStart"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-card flat class="tt-container">
                        <vue-good-table :columns="columns_t" :rows="rows_t">
                            <template slot="table-row" slot-scope="props">
                                <button type="button" class="btn btn-primary" v-on:click="timeStart=props.column.field">Select</button>
                            </template>
                        </vue-good-table>
                        <v-layout justify-end row1>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menuVisible3.save(timeStart); localChangeTime()"
                            >
                                confirm
                            </v-btn>
                        </v-layout>
                    </v-card>
                </v-menu> -->
            </v-col>
            <v-col cols="1">
                <v-subheader>~</v-subheader>
            </v-col>
            <v-col cols="1">
                <v-combobox
                    v-model="timeEnd"
                    :items="times"
                    label="time end"
                    @change="localChangeTime"
                    outlined
                ></v-combobox>
            </v-col>
        </v-layout>
        <v-container justify-center v-for="(room, roomIndex) in roomNames" :key="(room, roomIndex)">
            <v-row>
                <v-col rows="12" sm="6" md="3">
                <h1>{{room}}</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-card flat color="light-blue lighten-5" class="ma-10" width="40%" height="40%" v-for="(person, personIndex) in persons[roomIndex]" :key="(person, personIndex)">
                    <v-img
                        :class="{'row-pointer': !persons[roomIndex][personIndex], 'booked-room': persons[roomIndex][personIndex]}"
                        :alt="room + (personIndex+1).toString()"
                        :src="require('../assets/RoomPhotos/' + room + (personIndex+1).toString() + '.jpg')"
                        max-height="100%"
                        max-width="100%"
                        contain
                        @click="getID(roomIndex, personIndex); Popmenu($event)"
                    > <!-- outTime(timesStart[roomIndex][personIndex], timesEnd[roomIndex][personIndex])> -->
                        <v-card class="embed-card" flat color="light-blue lighten-5" position="bottom right">
                            <v-subheader>Person {{ person }} </v-subheader>
                        </v-card>
                    </v-img>
                </v-card>
            </v-row>
        </v-container>

        <v-row
            class="d-flex"
            justify="center"
        >
        <v-menu
            ref="menuVisible"
            v-model="menuVisible"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            absolute
            offset-y
            :position-x="x"
            :position-y="y"
            min-width="auto"
        >
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
                                <span v-if="props.column.field !== 'room' && noOccupy(props.column.field) &&  props.row.room === currentRoomType">
                                    <span v-if="props.column.field == wantTime">
                                        Select
                                    </span>
                                    <span v-else>
                                        <button type="button" class="btn btn-primary" v-on:click="wantTime=props.column.field">Rent</button>
                                    </span>
                                </span>
                                <span v-else> {{ props.formattedRow[props.column.field] }} </span>
                            </template>
                        </vue-good-table>
                        <v-layout justify-end row1>
                            <v-btn
                                v-if="wantTime"
                                text
                                color="primary"
                                @click="$refs.menuVisible.save(date); Rent()"
                            >
                                confirm
                            </v-btn>
                        </v-layout>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-date-picker
                            v-model="date"
                            no-title
                            scrollable
                            value="yyyy/MM/dd"
                        >
                            <v-layout justify-end row1>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menuVisible.save(date); Rent()"
                                >
                                    confirm
                                </v-btn>
                            </v-layout>
                        </v-date-picker>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-menu>
        </v-row>
    </v-app>
</template> 

<script>
export default {
    data () {
        return {
            menuVisible1: false,
            menuVisible2: false,
            times: [
                '0800',
                '0900',
                '1000',
                '1100',
                '1200',
                '1300',
                '1400',
                '1500',
                '1600',
                '1700',
                '1800',
                '1900',
                '2000',
            ],
            menuVisible3: false,
            menuVisible4: false,
            menuVisible: false,
            roomTypeIndex: 0,
            roomIndex: 0,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateBegin: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            timeStart: '0800',
            timeEnd: '1000',
            roomNames: [
                'RoomA',
                'RoomB',
                'RoomC'
            ],
            persons: [
                [
                    '',
                    '',
                    ''
                ],
                [
                    '',
                    '',
                ],
                [
                    '',
                    '',
                ],
            ],
            tab: null,
            items: [
                'Day', 'Month',
            ],
            x: 0,
            y: 0,
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
            ],
            columns_t: [
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
            rows_t: [
                {
                    
                },
            ],
            currentRoomType: '',
            wantTime: '',
            roomOccupys: [
                {
                    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    roomType: 'RoomA',
                    roomIndex: 2,
                    user: 'LilB',
                    theme: 'Discussion',
                    timeStart: "0900",
                    timeEnd: "1100"
                },
                {
                    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    roomType: 'RoomA',
                    roomIndex: 2,
                    user: 'LilB',
                    theme: 'Discussion',
                    timeStart: "1300",
                    timeEnd: "1700"
                }
            ]
        };
    },
    beforeMount() {
        this.changeTime()
    },
    mounted() {
        if (this.$activityWindowReturn === 'booking')
            this.$emit('bookingR')
    },
    methods: {
        getID (roomIndex, personIndex) {
            this.roomTypeIndex = roomIndex;
            this.roomIndex = personIndex;
            this.currentRoomType = this.roomNames[roomIndex] + (personIndex+1).toString();
        },
        Popmenu (event) {
            if (!this.menuVisible) {
                this.x = event.clientX;
                this.y = event.clientY;
            }
            if (!this.persons[this.roomTypeIndex][this.roomIndex]) {
                this.menuVisible = true;
            }
        },
        Rent () {
            console.log(this.$userName)
            this.timeEnd = (parseInt(this.wantTime) + 100).toString()
            if (this.timeEnd.length == 3)
                this.timeEnd = '0' + this.timeEnd

            let data = {
                roomInfo: {
                    roomType: this.roomNames[this.roomTypeIndex] + (this.roomIndex+1).toString(),
                    theme: '',
                    chairPerson: this.$email,
                    date: this.date,
                    timeStart: this.wantTime,
                    timeEnd: this.timeEnd,
                    emails: [],
                    agenda: '',
                    notes: ''
                },
                fromSite: 'booking',
                roomOccupys: this.roomOccupys
            };
            this.$router.params = data
            this.$router.replace('/activityWindow')
        },
        changeTime() {
            this.$emit('FetchRoomByDateInterval', this, this.dateBegin, this.dateEnd)
            // this.fetchRoomByDateIntervalResponse(this)
        },
        localChangeTime() {
            if (this.timeEnd <= this.timeStart)
            {
                this.timeEnd = (parseInt(this.timeStart) + 100).toString()
                if (this.timeEnd.length == 3)
                    this.timeEnd = '0' + this.timeEnd
            }

            this.persons = [
                [
                    '',
                    '',
                    ''
                ],
                [
                    '',
                    '',
                ],
                [
                    '',
                    '',
                ],
            ]
            for (let index = 0; index < this.roomOccupys.length; index++)
            {
                if (this.fillTime(this.roomOccupys[index].timeStart, this.roomOccupys[index].timeEnd))
                {
                    this.persons[this.roomNames.indexOf(this.roomOccupys[index].roomType)][this.roomOccupys[index].roomIndex - 1] = this.roomOccupys[index].user
                }
            }
        },
        fetchRoomByDateIntervalResponse(data) {
            this.roomOccupys = []
            for (let index = 0; index < data.length; index++)
            {
                let roomOccupy = {
                    date: data[index].Date,
                    user: data[index].User,
                    room: data[index].Room,
                    roomType: data[index].Room.replace('1','').replace('2','').replace('3',''),
                    roomIndex: parseInt(data[index].Room.replace('Room','').replace('A','').replace('B','').replace('C','')),
                    theme: data[index].Theme,
                    timeStart: data[index].TimeStart,
                    timeEnd: data[index].TimeEnd,
                }
                roomOccupys.push(roomOccupy)
            }
            this.localChangeTime()
        },
        fillTime(s, e) {
            return ((parseInt(e) >= parseInt(this.timeStart) && parseInt(e) < parseInt(this.timeEnd)) ||
                    (parseInt(s) >= parseInt(this.timeStart) && parseInt(s) < parseInt(this.timeEnd)))
        },
        noOccupy(d) {
            for (let index = 0; index < this.roomOccupys.length; index++)
            {
                if (this.roomOccupys[index].date == this.date && this.roomOccupys[index].roomType + (this.roomOccupys[index].roomIndex).toString() === this.currentRoomType && d >= this.roomOccupys[index].timeStart && d <= this.roomOccupys[index].timeEnd)
                    return false
            }
            return true
        },
    }
}</script>

<style scoped>
.row-pointer {
    cursor: pointer;
}
.embed-card {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
}
.booked-room {
    transition: all 250ms;
    filter: grayscale(1);
}
</style>