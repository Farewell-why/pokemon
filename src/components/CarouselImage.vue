<template>
    <div class="f">
        <el-carousel :interval="4000" type="card" height="500px">
            <el-carousel-item v-for="item in photo" :key="item.id">
                <a :href="item.go">
                    <img class="r" :src="item.img">
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: 'CarouselImage',
    data() {
        return {
            photo: [
                { id: 0, img: require('../assets/lunboc.jpg'), go: 'https://search.bilibili.com/all?keyword=%E5%AE%9D%E5%8F%AF%E6%A2%A6' },
                { id: 1, img: require('../assets/lunbob.jpg'), go: '#b' },
                { id: 2, img: require('../assets/lunboa.jpg'), go: '#a' },
                { id: 3, img: require('../assets/lunbod.jpg'), go: '#d' },
                { id: 4, img: require('../assets/lunboe.jpg'), go: '#e' }
            ]

        }
    }
}
</script>

<style scoped>
.r {
    width: 100%;
    height: 100%;
}

.f {
    height: 500px;
    width: 1500px;
    margin: auto;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
