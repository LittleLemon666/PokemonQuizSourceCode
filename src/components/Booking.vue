<template>
    <p>Boooooooooooooooooooooooooooook!</p>
</template> 

<script>
export default {
    data () {
        return {
            dates: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        };
    },
}</script>