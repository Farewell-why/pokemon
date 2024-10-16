<template>
    <div>
        <div class="w">
            <div class="u">
                <a href="https://www.bilibili.com/video/BV1kJhNeWE59" target="_blank"><img class="v"
                        src="../assets/nine.jpg" alt=""></a>
            </div>
            <div class="t" v-for="itemd in game" :key="itemd.id">
                <a v-bind:href="itemd.go" target="_blank"><img class="v" v-bind:src="itemd.img"></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DramaSeries',
    data() {
        return {
            game: [
                { id: 0, img: require('../assets/one.jpg'), go: 'https://www.bilibili.com/bangumi/play/ep97499' },
                { id: 1, img: require('../assets/two.jpg'), go: 'https://www.bilibili.com/bangumi/play/ss6161' },
                { id: 2, img: require('../assets/three.jpg'), go: 'https://www.bilibili.com/bangumi/play/ep105892' },
                { id: 3, img: require('../assets/four.jpg'), go: 'https://www.bilibili.com/bangumi/play/ep106180' },
                { id: 4, img: require('../assets/five.jpg'), go: 'https://www.bilibili.com/bangumi/play/ss5762' },
                { id: 5, img: require('../assets/six.jpg'), go: 'https://www.bilibili.com/bangumi/play/ss5692' },
                { id: 6, img: require('../assets/seven.jpg'), go: 'https://www.bilibili.com/bangumi/play/ss23795' },
                { id: 7, img: require('../assets/eight.jpg'), go: 'https://www.bilibili.com/bangumi/play/ss47066' }
            ]
        }
    }
}
</script>

<style scoped>
.u {
    width: 672px;
    height: 420px;
    margin: 20px 15px 0 50px;
    float: left;
    position: relative;
}

.u:hover::before {
    box-shadow: 8px 8px 12px 8px rgba(0, 0, 0, .3);
    display: block;
}

.u::before {
    content: '';
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3) url(../assets/bofang.png) no-repeat center;
    pointer-events: none;
}

.t {
    height: 200px;
    width: 150px;
    margin: 20px 15px 0 0;
    float: left;
    position: relative;
}

.t:hover::before {
    box-shadow: 8px 8px 12px 8px rgba(0, 0, 0, .3);
    display: block;
}

.t::before {
    content: '';
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3) url(../assets/bofang.png) no-repeat center;
    pointer-events: none;
}

.v {
    height: 100%;
    width: 100%;
}

.w {
    height: 440px;
    width: 1400px;
    margin: auto;
}
</style>
