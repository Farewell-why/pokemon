<template>
    <div>
        <div class="ah">
            <el-row>
                <el-button class="ai" @click="truegeneration = 'generation1'" type="success" plain>第一世代</el-button>
                <el-button class="ai" @click="truegeneration = 'generation2'" type="success" plain>第二世代</el-button>
                <el-button class="ai" @click="truegeneration = 'generation3'" type="success" plain>第三世代</el-button>
                <el-button class="ai" @click="truegeneration = 'generation4'" type="success" plain>第四世代</el-button>
                <el-button class="ai" @click="truegeneration = 'generation5'" type="success" plain>第五世代</el-button>
                <el-button class="ai" @click="truegeneration = 'generation6'" type="success" plain>第六世代</el-button>
                <el-button class="ai" @click="truegeneration = 'generation7'" type="success" plain>第七世代</el-button>
                <el-button class="ai" @click="truegeneration = 'generation8'" type="success" plain>第八世代</el-button>
                <el-button class="ai" @click="truegeneration = 'generation9'" type="success" plain>第九世代</el-button>
            </el-row>
        </div>
        <div class="ag">
            <el-carousel :interval="1000" type="card" height="500px" indicator-position="outside">
                <el-carousel-item v-for="itemf in generation[truegeneration]" :key="itemf.id">
                    <img class="r" :src="itemf.img">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MythicalAnimals',
    data() {
        return {
            generation: {
                generation1: [
                    { id: 0, img: require('../assets/day1 (1).jpg') },
                    { id: 1, img: require('../assets/day1 (2).jpg') },
                    { id: 2, img: require('../assets/day1 (3).jpg') }
                ],
                generation2: [
                    { id: 0, img: require('../assets/day2.jpg') },
                    { id: 1, img: require('../assets/day2a.jpg') },
                    { id: 2, img: require('../assets/day2b.jpg') }
                ],
                generation3: [
                    { id: 0, img: require('../assets/day3a.jpg') },
                    { id: 1, img: require('../assets/day3b.jpg') },
                    { id: 2, img: require('../assets/day3c.jpg') },
                    { id: 3, img: require('../assets/day3d.jpg') },
                    { id: 4, img: require('../assets/day3e.jpg') },
                    { id: 5, img: require('../assets/day3f.jpg') },
                    { id: 6, img: require('../assets/day3g.jpg') }
                ],
                generation4: [
                    { id: 0, img: require('../assets/day4a.jpg') },
                    { id: 1, img: require('../assets/day4b.jpg') },
                    { id: 2, img: require('../assets/day4c.jpg') },
                    { id: 3, img: require('../assets/day4d.jpg') },
                    { id: 4, img: require('../assets/day4e.jpg') },
                    { id: 5, img: require('../assets/day4f.jpg') }
                ],
                generation5: [
                    { id: 0, img: require('../assets/day5a.jpg') },
                    { id: 1, img: require('../assets/day5b.jpg') },
                    { id: 2, img: require('../assets/day5c.jpg') },
                    { id: 3, img: require('../assets/day5d.jpg') },
                    { id: 4, img: require('../assets/day5e.jpg') },
                    { id: 5, img: require('../assets/day5f.jpg') },
                    { id: 6, img: require('../assets/day5g.jpg') },
                    { id: 7, img: require('../assets/day5h.jpg') },
                    { id: 8, img: require('../assets/day5i.jpg') }
                ],
                generation6: [
                    { id: 0, img: require('../assets/day6a.jpg') },
                    { id: 1, img: require('../assets/day6b.jpg') },
                    { id: 2, img: require('../assets/day6c.jpg') },
                    { id: 3, img: require('../assets/day6d.jpg') },
                    { id: 4, img: require('../assets/day6e.jpg') }
                ],
                generation7: [
                    { id: 0, img: require('../assets/day7a.jpg') },
                    { id: 1, img: require('../assets/day7b.jpg') },
                    { id: 2, img: require('../assets/day7c.jpg') },
                    { id: 3, img: require('../assets/day7d.jpg') },
                    { id: 4, img: require('../assets/day7e.jpg') },
                    { id: 5, img: require('../assets/day7f.jpg') }
                ],
                generation8: [
                    { id: 0, img: require('../assets/day8a.jpg') },
                    { id: 1, img: require('../assets/day8b.jpg') },
                    { id: 2, img: require('../assets/day8c.jpg') },
                    { id: 3, img: require('../assets/day8d.jpg') }
                ],
                generation9: [
                    { id: 0, img: require('../assets/day9a.jpg') },
                    { id: 1, img: require('../assets/day9b.jpg') },
                    { id: 2, img: require('../assets/day9c.jpg') },
                    { id: 3, img: require('../assets/day9d.jpg') }
                ]
            },
            truegeneration: 'generation1'
        }
    }
}
</script>

<style scoped>
.ag {
    height: 500px;
    width: 1500px;
    margin: auto;
}

.ah {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 30px 0;
}

.ai {
    margin: 0 50px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.r {
    width: 100%;
    height: 100%;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
