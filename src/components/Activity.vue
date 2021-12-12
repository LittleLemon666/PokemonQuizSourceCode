<template>
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
</template> 

<script>
export default {
    data () {
        return {
            dates: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
   }
}</script>