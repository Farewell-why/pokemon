<template>
    <div class="background" :style="{
        backgroundImage: `url(${images[nextIndex]})`,
        transition: 'background-image 1s ease-in-out'
    }">
        <div class="buttons">
            <el-button type="info" icon="el-icon-caret-left" circle plain class="left-button"
                @click="previous"></el-button>
            <el-button type="info" icon="el-icon-caret-right" circle plain class="right-button"
                @click="next"></el-button>
        </div>
        <div class="image-group">
            <img v-for="(image, index) in currentImages" :key="index" :src="image.src" :class="imageItemClass(image)"
                :data-direction="image.direction">
        </div>
        <!-- 新增的中间盒子 -->
        <router-link :to="centerLink" class="center-box" v-if="centerText && !isExternal(centerLink)">
            {{ centerText }}
        </router-link>
        <a :href="centerLink" class="center-box" target="_blank" v-if="centerText && isExternal(centerLink)">
            {{ centerText }}
        </a>
    </div>
</template>

<script>
export default {
    name: 'HomeMy',
    data() {
        return {
            currentIndex: 0,
            nextIndex: 0,
            isAnimating: false,
            images: [
                require('@/assets/background1.jpg'),
                require('@/assets/background2.jpg'),
                require('@/assets/background3.jpg')
            ],
            imageGroups: [
                [
                    { src: require('@/assets/top_left1.png'), direction: 'top-left' },
                    { src: require('@/assets/top_right1.png'), direction: 'top-right' },
                    { src: require('@/assets/bottom_left1.png'), direction: 'bottom-left' },
                    { src: require('@/assets/bottom_right1.png'), direction: 'bottom-right' }
                ],
                [
                    { src: require('@/assets/top_left2.png'), direction: 'top-left' },
                    { src: require('@/assets/top_right2.png'), direction: 'top-right' },
                    { src: require('@/assets/bottom_left2.png'), direction: 'bottom-left' },
                    { src: require('@/assets/bottom_right2.png'), direction: 'bottom-right' }
                ],
                [
                    { src: require('@/assets/top_left3.png'), direction: 'top-left' },
                    { src: require('@/assets/top_right3.png'), direction: 'top-right' },
                    { src: require('@/assets/bottom_left3.png'), direction: 'bottom-left' },
                    { src: require('@/assets/bottom_right3.png'), direction: 'bottom-right' }
                ]
            ],
            currentImages: [],
            centerText: '', // 中间盒子的文本
            centerLink: '', // 中间盒子的链接
            timer: null
        }
    },
    methods: {
        setCenterContent(index) {
            switch (index) {
                case 0:
                    this.centerText = '我的精灵'
                    this.centerLink = './fairy'
                    break
                case 1:
                    this.centerText = '前往宝可梦对战平台'
                    this.centerLink = 'https://pokemonshowdown.com/'
                    break
                case 2:
                    this.centerText = '属性克制'
                    this.centerLink = './kezhi'

                    break
                default:
                    this.centerText = ''
                    this.centerLink = ''
            }
        },
        next() {
            this.stopAutoSwitch() // 停止当前定时器
            this.resetImageAnimations() // 清除所有图片的动画状态
            this.nextIndex = (this.nextIndex + 1) % this.images.length
            this.currentImages = this.imageGroups[this.nextIndex]
            this.currentIndex = this.nextIndex
            this.setCenterContent(this.nextIndex)
            this.startAutoSwitch() // 重新启动定时器
            this.resetCenterBoxAnimation()
        },
        previous() {
            this.stopAutoSwitch() // 停止当前定时器
            this.resetImageAnimations() // 清除所有图片的动画状态
            this.nextIndex = (this.nextIndex - 1 + this.images.length) % this.images.length
            this.currentImages = this.imageGroups[this.nextIndex]
            this.currentIndex = this.nextIndex
            this.setCenterContent(this.nextIndex) // 设置中间盒子的内容
            this.startAutoSwitch() // 重新启动定时器
            this.resetCenterBoxAnimation()
        },
        resetImageAnimations() {
            this.$nextTick(() => { // 确保 DOM 更新后再操作
                this.$el.querySelectorAll('.image-item').forEach(img => {
                    img.style.animation = 'none' // 清除动画
                    // eslint-disable-next-line no-unused-expressions
                    img.offsetHeight
                    img.style.removeProperty('animation') // 移除动画属性
                    img.style.transform = 'translate(0, 0)' // 重置位置
                })
            })
        },
        resetCenterBoxAnimation() {
            const centerBox = this.$el.querySelector('.center-box')
            if (centerBox) {
                centerBox.style.animation = 'none' // 清除现有动画
                // eslint-disable-next-line no-unused-expressions
                centerBox.offsetHeight // 触发重绘
                centerBox.style.animation = '' // 重新应用动画
            }
        },
        startAutoSwitch() {
            this.timer = setInterval(() => {
                this.next() // 切换到下一张图片
            }, 10000) // 每10秒执行一次
        },
        stopAutoSwitch() {
            if (this.timer) {
                clearInterval(this.timer) // 清除定时器
                this.timer = null
            }
        },
        isExternal(link) {
            return /^(https?:\/\/)/.test(link)
        }
    },
    mounted() {
        this.currentImages = this.imageGroups[this.currentIndex]
        this.setCenterContent(this.currentIndex) // 初始化中间盒子的内容
        this.startAutoSwitch() // 组件挂载时启动自动切换
        this.resetCenterBoxAnimation()
    },
    beforeUnmount() {
        this.stopAutoSwitch() // 组件销毁前停止自动切换
    },
    computed: {
        imageItemClass() {
            return (image) => {
                return ['image-item', image.direction]
            }
        }
    }
}
</script>

<style scoped>
.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover;
}

.buttons {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    z-index: 1;
}

.left-button,
.right-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}

.left-button {
    left: 20px;
}

.right-button {
    right: 20px;
}

.image-group {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.image-item {
    width: 308px;
    height: 232px;
    object-fit: contain;
    border: 5px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
}

/* 定义动画规则 */
@keyframes moveTopLeft {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-250px, -50px);
    }
}

@keyframes moveTopRight {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(250px, -50px);
    }
}

@keyframes moveBottomLeft {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-250px, 50px);
    }
}

@keyframes moveBottomRight {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(250px, 50px);
    }
}

/* 应用动画到小图片 */
.image-item[data-direction="top-left"] {
    animation: moveTopLeft 1s linear forwards;
    animation-iteration-count: 1;
    /* 设置动画只播放一次 */
}

.image-item[data-direction="top-right"] {
    animation: moveTopRight 1s linear forwards;
    animation-iteration-count: 1;
}

.image-item[data-direction="bottom-left"] {
    animation: moveBottomLeft 1s linear forwards;
    animation-iteration-count: 1;
}

.image-item[data-direction="bottom-right"] {
    animation: moveBottomRight 1s linear forwards;
    animation-iteration-count: 1;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.center-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-size: 24px;
    text-align: center;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    text-decoration: none;
    /* 移除下划线 */
    display: inline-block;
    /* 使盒子内文本居中 */
    animation: fadeIn 0.5s ease-in-out;
}

.center-box-enter-active {
    animation: fadeIn 0.5s ease-in-out;
}

.center-box:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: translate(-50%, -50%) scale(1.05);
}

.center-box a {
    color: inherit;
    /* 继承父元素的颜色 */
    text-decoration: none;
    /* 移除下划线 */
}
</style>
