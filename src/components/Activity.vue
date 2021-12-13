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
                        :key="item.title"
                        @click="settingAction(item.action)"
                    >
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-layout>

        <v-container justify-center v-for="(room, roomIndex) in rooms" :key="(room, roomIndex)">
            <v-row>
                <v-col rows="12" sm="6" md="3">
                <h1>{{ dates[roomIndex] + ' ' + timesStart[roomIndex] + '~' + timesEnd[roomIndex] }}</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-card flat color="light-blue lighten-5" class="ma-10" width="40%" height="40%">
                    <v-img
                        class="row-pointer"
                        :alt=room
                        :src="require('../assets/RoomPhotos/' + room + '.jpg')"
                        max-height="100%"
                        max-width="100%"
                        contain
                        @click="check"
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
            dates: [
                (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            ],
            timesStart: [
                '0700',
                '1300'
            ],
            timesEnd: [
                '0900',
                '1700'
            ],
            rooms: [
                'RoomA1',
                'RoomC2'
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
    methods: {
        settingAction(action){
            if (action === 'date'){
                this.sort_f = 'date'
            }
            else if (action === 'catagory'){
                this.sort_f = 'catagory'
            }
        },
        check() {

        }
   }
}</script>

<style scoped>
.row-pointer {
    cursor: pointer;
}
</style>