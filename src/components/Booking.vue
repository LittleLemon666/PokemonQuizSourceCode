<template>
    <v-app>
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
                        :alt=room
                        :src="require('../assets/RoomPhotos/' + room + (personIndex+1).toString() + '.jpg')"
                        max-height="100%"
                        max-width="100%"
                        contain
                        @click="Rent"
                    >
                        <v-card class="embed-card" flat color="light-blue lighten-5" position="bottom right">
                            <v-subheader>Person {{ person }} </v-subheader>
                        </v-card>
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
            dates: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
            ]
        };
    },
    methods: {
        Rent () {
            //this.$router.replace('/login')
            console.log(this.roomInfo)
            this.$emit('Reserve', this, this.roomInfo)
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