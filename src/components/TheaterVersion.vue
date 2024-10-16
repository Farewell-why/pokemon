<template>
    <div>
        <div :class="{ h: true, j: sshhooww }">
            <div :style="find" class="i" v-for="itemb in picture" :key="itemb.id">
                <a v-bind:href="itemb.go" target="_blank"><img class="s" v-bind:src="itemb.img"></a>
            </div>
        </div>
        <div class="p">
            <el-button-group v-if="!sshhooww" class="q">
                <el-button @click="moveup" type="primary" icon="el-icon-arrow-left">上一页</el-button>
            </el-button-group>
            <el-row class="q" v-for="itema in ye" :key="itema.id">
                <el-button v-if="!sshhooww" @click="move(itema.id)" v-bind:type=itema.type circle plain> {{
                    itema.msg }}
                </el-button>
            </el-row>
            <el-button-group v-if="!sshhooww" class="q">
                <el-button @click="movedown" type="primary">下一页<i class="el-icon-arrow-right"></i></el-button>
            </el-button-group>
            <div class="o" @click="show(), move(0)" ref="a">显示全部</div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'TheaterVersion',
    data() {
        return {
            ye: [
                { id: 0, type: 'primary', msg: 1 },
                { id: 1, type: 'success', msg: 2 },
                { id: 2, type: 'info', msg: 3 },
                { id: 3, type: 'warning', msg: 4 },
                { id: 4, type: 'danger', msg: 5 }
            ],
            picture: [
                { id: 0, img: require('../assets/a.jpg'), go: 'https://www.bilibili.com/video/BV1Px411i77k' },
                { id: 1, img: require('../assets/b.jpg'), go: 'https://www.bilibili.com/video/BV1WW411q7LG' },
                { id: 2, img: require('../assets/c.jpg'), go: 'https://www.bilibili.com/video/BV1Ys411o7Ty' },
                { id: 3, img: require('../assets/d.jpg'), go: 'https://www.bilibili.com/video/BV1yt411W7TK' },
                { id: 4, img: require('../assets/e.jpg'), go: 'https://www.bilibili.com/video/BV1Ax41147RR' },
                { id: 5, img: require('../assets/f.jpg'), go: 'https://www.bilibili.com/video/BV1ex411v7kb' },
                { id: 6, img: require('../assets/g.jpg'), go: 'https://www.bilibili.com/video/BV1xx411v7Qr' },
                { id: 7, img: require('../assets/h.jpg'), go: 'https://www.bilibili.com/video/BV1xx411v7o3' },
                { id: 8, img: require('../assets/i.jpg'), go: 'https://www.bilibili.com/video/BV14x411v7PV' },
                { id: 9, img: require('../assets/j.jpg'), go: 'https://www.bilibili.com/video/BV14x411v7ED' },
                { id: 10, img: require('../assets/k.jpg'), go: 'https://www.bilibili.com/video/BV1rx411v7t4' },
                { id: 11, img: require('../assets/l.jpg'), go: 'https://www.bilibili.com/video/BV1rx411v7tY' },
                { id: 12, img: require('../assets/m.jpg'), go: 'https://www.bilibili.com/video/BV1rx411v7tA' },
                { id: 13, img: require('../assets/n.jpg'), go: 'https://www.bilibili.com/video/BV1rx411v7gY' },
                { id: 14, img: require('../assets/o.jpg'), go: 'https://www.bilibili.com/video/BV12x411x7bY' },
                { id: 15, img: require('../assets/p.jpg'), go: 'https://www.bilibili.com/video/BV16x411v75Y' },
                { id: 16, img: require('../assets/q.jpg'), go: 'https://www.bilibili.com/video/BV1Lx411n7ZY' },
                { id: 17, img: require('../assets/r.jpg'), go: 'https://www.bilibili.com/video/BV1As41197pe' },
                { id: 18, img: require('../assets/s.jpg'), go: 'https://www.bilibili.com/video/BV1zp411f7nX' },
                { id: 19, img: require('../assets/t.jpg'), go: 'https://www.bilibili.com/video/BV1dW41187Rv' },
                { id: 20, img: require('../assets/u.jpg'), go: 'https://www.bilibili.com/video/BV1r4411p72t' },
                { id: 21, img: require('../assets/v.jpg'), go: 'https://www.bilibili.com/video/BV1Lm411Q7RZ' },
                { id: 22, img: require('../assets/w.jpg'), go: 'https://www.bilibili.com/video/BV1FW42197LN' }
            ],
            count: 0,
            sshhooww: false

        }
    },
    computed: {
        find() {
            return {
                transform: 'translateY(' + this.count + 'px)'
            }
        }
    },
    methods: {
        moveup() {
            if (this.count !== 0) {
                this.count += 360
            }
        },
        movedown() {
            if (this.count !== -1440) {
                this.count -= 360
            }
        },
        move(a) {
            this.count = a * -360
        },
        show() {
            this.sshhooww = !this.sshhooww
            if (this.sshhooww === true) {
                this.$refs.a.innerHTML = '隐藏全部'
            }
            if (this.sshhooww === false) {
                this.$refs.a.innerHTML = '显示全部'
            }
        }
    }
}

</script>

<style scoped>
.s {
    width: 100%;
    height: 100%;
}

.h {
    width: 1200px;
    height: 360px;
    margin: auto;
    overflow: hidden;
}

.i {
    height: 240px;
    width: 180px;
    margin: 60px 30px;
    box-shadow: 8px 8px 12px 8px rgba(0, 0, 0, .3);
    transition: 1s;
    float: left;
    transition: transform 0.3s ease;
}

.i::after {
    content: '';
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    pointer-events: none;
}

.i:hover::after {
    display: block;
}

.j {
    height: 100%;
    overflow: auto;
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

.p {
    display: flex;
    justify-content: center;
}

.q {
    margin: 0 10px;
}
</style>
