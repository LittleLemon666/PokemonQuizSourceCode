<template>
<v-app>
    <div class="box">
        <v-layout>
        <div class="counter">
            <h1 class="text-center" style="color:green"> {{ parseInt(time/60) }}:{{ (time%60).toString().padStart(2,0) }} </h1>
            <a @click="giveup">放棄?</a>
        </div>
        <div class="pokeInfo">
            <span>輸入所有1008隻寶可夢的名字!</span>
            <el-input type = "text" v-model = "pokemonGuess" auto-complete = "off" placeholder = "寶可夢名字" @change="search" @input="search"></el-input>
            <span>猜對{{count}} / 1008</span>
        </div>
        </v-layout>
    </div>
    <div class="pokemonTable">
        <v-layout>
            <div class="pokemonTable">
                <table class="pokemonTable">
                    <thead>
                        <tr>
                            <th class="gx" v-for="(column, index) in columns" :key="index" style="color:#eee; background:#3366cc"> {{column}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in pokemonsData1" :key="index">
                            <td class="gx" v-for="(column, indexColumn) in columns" :key="indexColumn">
                                <span v-if="isGiveup && column==='Pokémon' && !item.flag" style="color:red">
                                    {{item[column]}}
                                </span>
                                <span v-else-if="item.flag || column==='No.' || column==='Type'">
                                    {{item[column]}}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pokemonTable">
                <table class="pokemonTable">
                    <thead>
                        <tr>
                            <th class="gx" v-for="(column, index) in columns" :key="index" style="color:#eee; background:#3366cc"> {{column}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in pokemonsData2" :key="index">
                            <td class="gx" v-for="(column, indexColumn) in columns" :key="indexColumn">
                                <span v-if="isGiveup && column==='Pokémon' && !item.flag" style="color:red">
                                    {{item[column]}}
                                </span>
                                <span v-else-if="item.flag || column==='No.' || column==='Type'">
                                    {{item[column]}}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pokemonTable">
                <table class="pokemonTable">
                    <thead>
                        <tr>
                            <th class="gx" v-for="(column, index) in columns" :key="index" style="color:#eee; background:#3366cc"> {{column}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in pokemonsData3" :key="index">
                            <td class="gx" v-for="(column, indexColumn) in columns" :key="indexColumn">
                                <span v-if="isGiveup && column==='Pokémon' && !item.flag" style="color:red">
                                    {{item[column]}}
                                </span>
                                <span v-else-if="item.flag || column==='No.' || column==='Type'">
                                    {{item[column]}}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </v-layout>
    </div>
</v-app>

</template>

<script>
// import pokemonList from '../pokemonList.json'
import pokemonList from '../pokemonTypeList.json'
export default {
    data() {
        return {
            columns: ["No.", "Type", "Pokémon"],
            pokemonsData: pokemonList,
            pokemonsData1: pokemonList.slice(0,336),
            pokemonsData2: pokemonList.slice(336,672),
            pokemonsData3: pokemonList.slice(672),
            pokemonGuess: '',
            count: 0,
            timer: null,
            time: 3600,
            isGiveup: false
        };
        
    },
    mounted: function() {
        for (var i = 0; i < this.pokemonsData.length; i++)
            this.pokemonsData[i].flag = false
        this.timer = setInterval(this.countdown, 1000)
    },
    methods: {
        countdown() {
            if (!this.isGiveup && this.time > 0)
                this.time--
            if (this.time <= 0)
                this.isGiveup = true
        },
        search() {
            let pokeIndex = this.pokemonsData.findIndex(x => x.Pokémon === this.pokemonGuess)
            if (pokeIndex !== -1 && !this.pokemonsData[pokeIndex].flag) {
                this.pokemonsData[pokeIndex].flag = true
                this.pokemonGuess = ''
                this.count++
            }
        },
        giveup() {
            this.isGiveup = true
        }
    }
}</script>

<style>
.pokeInfo {
    text-align: left;
    background: #fff;
}
.pokemonTable {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
.gx {
    padding-top: 5px;
    padding-right: 8px;
    padding-bottom: 5px;
    padding-left: 8px;
    font-size: 13px;
}
</style>