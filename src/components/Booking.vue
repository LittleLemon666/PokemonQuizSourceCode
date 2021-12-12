<template>
    <v-app>
        <v-layout justify-end row0>
            <v-col cols="1">
                <v-subheader>Date</v-subheader>
            </v-col>
            <v-col cols="1">
                <v-menu
                    ref="menuVisible1"
                    v-model="menuVisible1"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            append-icon="event"
                            @click:append="on.click"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
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
                                @click="$refs.menuVisible1.save(date)"
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
                <v-text-field v-model="timeStart"></v-text-field>
            </v-col>
            <v-col cols="1">
                <v-subheader>~</v-subheader>
            </v-col>
            <v-col cols="1">
                <v-text-field v-model="timeEnd"></v-text-field>
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
                        :class="{'row-pointer': !isBooked[roomIndex][personIndex], 'booked-room': isBooked[roomIndex][personIndex]}"
                        :alt="room + (personIndex+1).toString()"
                        :src="require('../assets/RoomPhotos/' + room + (personIndex+1).toString() + '.jpg')"
                        max-height="100%"
                        max-width="100%"
                        contain
                        @click="getID(roomIndex, personIndex); Popmenu($event)"
                    >
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
                    <v-card flat>
                        
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
            roomTypeIndex: 0,
            roomIndex: 0,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            timeStart: '0700',
            timeEnd: '0900',
            roomNames: [
                'RoomA',
                'RoomB',
                'RoomC'
            ],
            persons: [
                [
                    'Lemon',
                    '',
                    '030'
                ],
                [
                    'Will',
                    '-3-',
                ],
                [
                    '',
                    '123',
                ],
            ],
            isBooked: [
                [
                    false,
                    true,
                    false,
                ],
                [
                    false,
                    false,
                ],
                [
                    true,
                    true,
                ],
            ],
            menuVisible: false,
            tab: null,
            items: [
                'Day', 'Month',
            ],
            x: 0,
            y: 0
        };
    },
    methods: {
        getID (roomIndex, personIndex) {
            this.roomTypeIndex = roomIndex;
            this.roomIndex = personIndex;
        },
        Popmenu (event) {
            if (!this.menuVisible) {
                this.x = event.clientX;
                this.y = event.clientY;
            }
            if (!this.isBooked[this.roomTypeIndex][this.roomIndex]) {
                this.menuVisible = true;
            }
        },
        Rent () {
            //console.log(this.$userName)
            let data = {
                roomType: this.roomNames[this.roomTypeIndex] + (this.roomIndex+1).toString(),
                date: this.date,
                timeStart: this.timeStart,
                timeEnd: this.timeEnd
            };
            console.log(data.roomType)
            this.$router.params = data
            this.$router.replace('/activityWindow')
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