<template>
    <v-app>
        <v-layout justify-end row0>
            <v-menu
                left
                bottom
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-sort-ascending</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="item in sort_items"
                        :key="(item.title, item.action)"
                        @click="settingAction(item.action)"
                    >
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-layout>

        <v-container justify-center v-for="(room, roomIndex) in sortedRoomsInfo" :key="(room, roomIndex)">
            <v-row>
                <v-col rows="12" sm="6" md="3">
                <h1>{{ room.date + ' ' + room.timeStart + '~' + room.timeEnd }}</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-card flat color="light-blue lighten-5" class="ma-10" width="40%" height="40%">
                    <v-img
                        class="row-pointer"
                        :alt=room.room
                        :src="require('../assets/RoomPhotos/' + room.room + '.jpg')"
                        max-height="100%"
                        max-width="100%"
                        contain
                        @click="check(roomIndex)"
                    >
                    </v-img>
                </v-card>
            </v-row>
        </v-container>
    </v-app>
</template> 

<script>
export default {
    data () {
        return {
            roomsInfo: [
                {
                    room: 'RoomC2',
                    theme: 'Hello',
                    chairPerson: 'Lemon',
                    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    timeStart: '0700',
                    timeEnd: '0900',
                    invited: 'b10815000@gapps.ntust.edu.tw',
                    agenda: 'I am a master of coding',
                    note: 'test'
                },
                {
                    room: 'RoomA1',
                    theme: 'World',
                    chairPerson: 'admin',
                    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    timeStart: '0900',
                    timeEnd: '1700',
                    invited: 'test@gmail.com',
                    agenda: 'XP',
                    note: '030'
                },
            ],
            sort_f: 'date',
            sort_items: [{
                title: 'Date',
                action: 'date'
            },
            {
                title: 'Category',
                action: 'catagory'
            }],
        };
    },
    computed: {
        sortedRoomsInfo() {
            let sortedRoomsInfoList = this.roomsInfo;

            if (this.sort_f === 'date') {
                this.roomsInfo.sort((a,b) => {
                    if (a.date < b.date || (a.date === b.date && a.timeStart < b.timeStart) || (a.date === b.date && a.timeStart === b.timeStart && a.timeEnd < b.timeEnd))
                        return -1;
                    else if (a.date > b.date || (a.date === b.date && a.timeStart > b.timeStart) || (a.date === b.date && a.timeStart === b.timeStart && a.timeEnd > b.timeEnd))
                        return 1;
                    else
                        return 0;
                })
            }
            else if (this.sort_f === 'catagory') {
                this.roomsInfo.sort((a,b) => {
                    if (a.room < b.room)
                        return -1;
                    else if (a.room > b.room)
                        return 1;
                    else
                        return 0;
                })
            }

            return sortedRoomsInfoList;
        },
    },
    beforeMount() {
        this.fetchRoomByActivity()
    },
    methods: {
        fetchRoomByActivity() {
            this.$emit('fetchRoomByActivity', this)
        },
        fetchRoomByActivityResponse(data) {
            this.roomsInfo.rooms = []
            this.roomsInfo.themes = []
            this.roomsInfo.chairPersons = []
            this.roomsInfo.dates = []
            this.roomsInfo.timesStart = []
            this.roomsInfo.timesEnd = []
            this.roomsInfo.agendas = []
            this.roomsInfo.notes = []
            for (let index = 0; index < data.length; index++) {
                this.roomsInfo.rooms.push(data[index].Room)
                this.roomsInfo.themes.push(data[index].Theme)
                this.roomsInfo.chairPersons.push(data[index].ChairPerson)
                this.roomsInfo.dates.push(data[index].Date)
                this.roomsInfo.timesStart.push(data[index].TimeStart)
                this.roomsInfo.timesEnd.push(data[index].TimeEnd)
                this.roomsInfo.agendas.push(data[index].Agenda)
                this.roomsInfo.notes.push(data[index].Note)
            }

            //sortRoom()
        },
        settingAction(action) {
            if (action === 'date') {
                this.sort_f = 'date'
            }
            else if (action === 'catagory') {
                this.sort_f = 'catagory'
            }

            //sortRoom()
        },
        check(roomIndex) {
            let data = {
                roomInfo: this.roomsInfo[roomIndex],
                fromSite: 'activity'
            };
            this.$router.params = data
            this.$router.replace('/activityWindow')
        }
   }
}</script>

<style scoped>
.row-pointer {
    cursor: pointer;
}
</style>