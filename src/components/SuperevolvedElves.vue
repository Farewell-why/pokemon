<template>
    <div>
        <div :class="{ x: true, ae: sshhoowwa }">
            <div :style="finda" class="ab" v-for="itemc in mega" :key="itemc.id">
                <a v-bind:href="itemc.go" target="_blank">
                    <div>
                        <div class="z">
                            <img class="aa" v-bind:src="itemc.img">
                        </div>
                        <span class="y">{{ itemc.msg }}</span>
                    </div>
                </a>
            </div>
        </div>
        <div class="ac">
            <el-button v-if="!sshhoowwa" @click="change" type="primary" icon="el-icon-refresh-right"
                round>换一批</el-button>
            <el-button-group v-if="!sshhoowwa" class="q">
                <el-button @click="moveupa" type="primary" icon="el-icon-arrow-left">上一页</el-button>
            </el-button-group>
            <el-row class="ad" v-for="iteme in yea" :key="iteme.id">
                <el-button v-if="!sshhoowwa" @click="movea(iteme.id)" type="info" round>{{ iteme.msg }}</el-button>
            </el-row>
            <el-button-group v-if="!sshhoowwa" class="q">
                <el-button @click="movedowna" type="primary">下一页<i class="el-icon-arrow-right"></i></el-button>
            </el-button-group>
            <div class="o" @click="showa(), movea(0)" ref="b">显示全部</div>
        </div>
    </div>
</template>

<script scoped>
export default {
    name: 'SuperevolvedElves',
    data() {
        return {
            mega: [
                { id: 0, img: require('../assets/mega (1).png'), go: 'https://www.bilibili.com/video/BV1xa411s7sD', msg: '水箭龟' },
                { id: 1, img: require('../assets/mega (2).png'), go: 'https://www.bilibili.com/video/BV17L4y1w7xA', msg: '路卡利欧' },
                { id: 2, img: require('../assets/mega (3).png'), go: 'https://www.bilibili.com/video/BV14S4y1n7ic', msg: '恰雷姆' },
                { id: 3, img: require('../assets/mega (4).png'), go: 'https://www.bilibili.com/video/BV1nB4y1e7E1', msg: '班吉拉斯' },
                { id: 4, img: require('../assets/mega (5).png'), go: 'https://www.bilibili.com/video/BV1dT411E7pi', msg: '暴雪王' },
                { id: 5, img: require('../assets/mega (6).png'), go: 'https://www.bilibili.com/video/BV1pG411p7P3', msg: '巨钳螳螂' },
                { id: 6, img: require('../assets/mega (7).png'), go: 'https://www.bilibili.com/video/BV1iS4y1E7kD', msg: '阿勃梭鲁' },
                { id: 7, img: require('../assets/mega (8).png'), go: 'https://www.bilibili.com/video/BV1uV4y1E7gY', msg: '蜥蜴王' },
                { id: 8, img: require('../assets/mega (9).png'), go: 'https://www.bilibili.com/video/BV1ya411T76p', msg: '暴飞龙' },
                { id: 9, img: require('../assets/mega (10).png'), go: 'https://www.bilibili.com/video/BV1Xd4y1T7se', msg: '沙奈朵' },
                { id: 10, img: require('../assets/mega (11).png'), go: 'https://www.bilibili.com/video/BV1NB4y1675X', msg: '黑鲁加' },
                { id: 11, img: require('../assets/mega (12).png'), go: 'https://www.bilibili.com/video/BV1mB4y157AA', msg: '胡地' },
                { id: 12, img: require('../assets/mega (13).png'), go: 'https://www.bilibili.com/video/BV1r14y147Gt', msg: '大钢蛇' },
                { id: 13, img: require('../assets/mega (14).png'), go: 'https://www.bilibili.com/video/BV1Md4y1Z7xe', msg: '蒂安希' },
                { id: 14, img: require('../assets/mega (15).png'), go: 'https://www.bilibili.com/video/BV1gd4y1A7VL', msg: '拉帝欧斯' },
                { id: 15, img: require('../assets/mega (16).png'), go: 'https://www.bilibili.com/video/BV1XP41157jC', msg: '耿鬼' },
                { id: 16, img: require('../assets/mega (17).png'), go: 'https://www.bilibili.com/video/BV1WG4y167AZ', msg: '凯罗斯' },
                { id: 17, img: require('../assets/mega (18).png'), go: 'https://www.bilibili.com/video/BV1X14y1s7zN', msg: '化石翼龙' },
                { id: 18, img: require('../assets/mega (19).png'), go: 'https://www.bilibili.com/video/BV18G411377y', msg: '呆壳兽' },
                { id: 19, img: require('../assets/mega (20).png'), go: 'https://www.bilibili.com/video/BV1dP411P7E8', msg: '喷火龙X' },
                { id: 20, img: require('../assets/mega (21).png'), go: 'https://www.bilibili.com/video/BV1Tb4y1W7pL', msg: '喷火龙Y' },
                { id: 21, img: require('../assets/mega (22).png'), go: 'https://www.bilibili.com/video/BV1Y34y147xc', msg: '长耳兔' },
                { id: 22, img: require('../assets/mega (23).png'), go: 'https://www.bilibili.com/video/BV1fS4y1N79z', msg: '大比鸟' },
                { id: 23, img: require('../assets/mega (24).png'), go: 'https://www.bilibili.com/video/BV1gF411G7eD', msg: '勾魂眼' },
                { id: 24, img: require('../assets/mega (25).png'), go: 'https://www.bilibili.com/video/BV12u411i7wd', msg: '拉帝亚斯' },
                { id: 25, img: require('../assets/mega (26).png'), go: 'https://www.bilibili.com/video/BV1Nr4y1W7yb', msg: '冰鬼护' },
                { id: 26, img: require('../assets/mega (27).png'), go: 'https://www.bilibili.com/video/BV1yS4y1w72W', msg: '袋兽' },
                { id: 27, img: require('../assets/mega (28).png'), go: 'https://www.bilibili.com/video/BV18S4y1A7Xi', msg: '妙蛙花' },
                { id: 28, img: require('../assets/mega (29).png'), go: 'https://www.bilibili.com/video/BV1mB4y127Bx', msg: '烈咬陆鲨' },
                { id: 29, img: require('../assets/mega (30).png'), go: 'https://www.bilibili.com/video/BV1Ta411e7RQ', msg: '巨牙鲨' },
                { id: 30, img: require('../assets/mega (31).png'), go: 'https://www.bilibili.com/video/BV1xY4y187eB', msg: '赫拉克罗斯' },
                { id: 31, img: require('../assets/mega (32).png'), go: 'https://www.bilibili.com/video/BV1jF411A7Hu', msg: '诅咒娃娃' },
                { id: 32, img: require('../assets/mega (33).png'), go: 'https://www.bilibili.com/video/BV1844y137Y7', msg: '波士可罗拉' },
                { id: 33, img: require('../assets/mega (34).png'), go: 'https://www.bilibili.com/video/BV1tS4y1h7Zk', msg: '火焰鸡' },
                { id: 34, img: require('../assets/mega (35).png'), go: 'https://www.bilibili.com/video/BV12F411j78x', msg: '暴鲤龙' },
                { id: 35, img: require('../assets/mega (36).png'), go: 'https://www.bilibili.com/video/BV15r4y1b7dL', msg: '大嘴娃' },
                { id: 36, img: require('../assets/mega (37).png'), go: 'https://www.bilibili.com/video/BV1dS4y1B7qa', msg: '七夕青鸟' },
                { id: 37, img: require('../assets/mega (38).png'), go: 'https://www.bilibili.com/video/BV1XA4y1o7j6', msg: '差不多娃娃' },
                { id: 38, img: require('../assets/mega (39).png'), go: 'https://www.bilibili.com/video/BV1u3411V7xg', msg: '巨沼怪' },
                { id: 39, img: require('../assets/mega (40).png'), go: 'https://www.bilibili.com/video/BV1NY4y1V7vC', msg: '喷火驼' },
                { id: 40, img: require('../assets/mega (41).png'), go: 'https://www.bilibili.com/video/BV16L4y1K7BS', msg: '巨金怪' },
                { id: 41, img: require('../assets/mega (42).png'), go: 'https://www.bilibili.com/video/BV1uT41157AV', msg: '艾路雷朵' },
                { id: 42, img: require('../assets/mega (43).png'), go: 'https://www.bilibili.com/video/BV1xa411s7sD', msg: '电龙' },
                { id: 43, img: require('../assets/mega (44).png'), go: 'https://www.bilibili.com/video/BV18T411G7eR', msg: '大针蜂' },
                { id: 44, img: require('../assets/mega (45).png'), go: 'https://www.bilibili.com/video/BV1A3411u79e', msg: '雷电兽' }
            ],
            yea: [
                { id: 0, msg: 1 },
                { id: 1, msg: 2 },
                { id: 2, msg: 3 },
                { id: 3, msg: 4 },
                { id: 4, msg: 5 },
                { id: 5, msg: 6 },
                { id: 6, msg: 7 },
                { id: 7, msg: 8 }
            ],
            counta: 0,
            sshhoowwa: false
        }
    },
    computed: {
        finda() {
            return {
                transform: 'translateY(' + this.counta + 'px)'
            }
        }
    },
    methods: {
        moveupa() {
            if (this.counta !== 0) {
                this.counta += 250
            }
        },
        movedowna() {
            if (this.counta !== -1750) {
                this.counta -= 250
            }
        },
        movea(a) {
            this.counta = a * -250
        },
        showa() {
            this.sshhoowwa = !this.sshhoowwa
            if (this.sshhoowwa === true) {
                this.$refs.b.innerHTML = '隐藏全部'
            }
            if (this.sshhoowwa === false) {
                this.$refs.b.innerHTML = '显示全部'
            }
        },
        change() {
            this.mega = this.mega.slice().sort(() => 0.5 - Math.random())
        }
    }
}

</script>

<style scoped>
.x {
    width: 1300px;
    height: 500px;
    overflow: hidden;
    margin: auto;

}

.ae {
    height: 100%;
    overflow: auto;
}

.aa {
    width: 100%;
    height: 100%;
}

.ab {
    width: 240px;
    height: 190px;
    float: left;
    transition: 1s;
    transition: transform 0.3s ease;
    margin: 30px 10px;
    box-shadow: 8px 8px 12px 8px rgba(0, 0, 0, .3);
}

.z {
    width: 240px;
    height: 160px;
}

.y {
    display: inline-flex;
    height: 25px;
    width: 240px;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: normal;
    color: black;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    border-top: 5px solid lightgreen;
}

.y:hover {
    color: aqua;
}

.ac {
    display: flex;
    justify-content: center;
}

.ad {
    margin: 0 10px;
}

.o {
    padding: 10px 70px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    margin-left: 100px;
}

/* 当鼠标悬停在按钮上时改变其背景色和边框颜色 */
.o:hover {
    background-color: darkorange;
}
</style>
