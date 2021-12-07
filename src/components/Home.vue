<template>
    <v-app>
        <div class="content">
            <v-layout justify-space-between rowt>
                    <div class="picture">
                        <img src="../assets/logo.jpg" class="bar_picture">
                    </div>
                    <v-card flat>
                        <v-row>
                            <v-col>
                                <a @click = "Activity">Activity</a>
                            </v-col>
                            <v-col>
                                <a @click = "Booking">Booking</a>
                            </v-col>
                            <v-col>
                                <div>
                                    <v-toolbar
                                        rounded
                                        width=300
                                        dense
                                    >
                                        <v-text-field
                                            flat
                                            solo
                                            dense
                                            hide-details
                                            v-model="search_text"
                                        ></v-text-field>

                                        <v-btn
                                            icon
                                            class="hidden-xs-only"
                                        >
                                        <v-icon>mdi-magnify</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </div>
                            </v-col>
                            <v-col>
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
                                        <v-icon>mdi-cog</v-icon>
                                    </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            v-for="n in setting_items"
                                            :key="n"
                                            @click="() => {}"
                                        >
                                            <v-list-item-title>
                                                {{ n }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-card>
            </v-layout>
            <component :is="currentTab" keep-alive></component>
        </div>
    </v-app>
</template> 

<script>
export default {
    data () {
        return {
            search_text: '',
            setting_items: ['User info', 'Sign out'],
        };
    },
    methods: {
       Activity () {
           this.$router.replace('/Activity')
       },
       Booking() {
            this.$router.replace('/Booking')  
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