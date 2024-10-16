<template>
    <div>
        <div class="ec">
            <div class="ed">
                <a
                    href="https://baike.baidu.com/item/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E9%9B%86%E6%8D%A2%E5%BC%8F%E5%8D%A1%E7%89%8C%E6%B8%B8%E6%88%8F/24082211?fr=ge_ala">
                    <img src="../assets/game10.png" alt="">
                </a>
            </div>
            <div class="ea">
                <el-carousel indicator-position="outside" :interval="4000" height="500px">
                    <el-carousel-item v-for="itemz in pokegame" :key="itemz.id">
                        <a :href="itemz.go">
                            <img class="eb" :src="itemz.img">
                        </a>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="ee">
                <a href="https://unite.qq.com/">
                    <img src="../assets/game11.png" alt="">
                </a>
            </div>
        </div>
        <SegmentedLine>GBA分享</SegmentedLine>
        <div class="upload-container">
            <h2 class="title">文件上传</h2>
            <form @submit.prevent="uploadFiles" class="upload-form">
                <div class="form-group">
                    <label for="packageFile">安装包:</label>
                    <input type="file" id="packageFile" @change="onPackageChange" />
                </div>
                <div class="form-group">
                    <label for="coverImage">封面:</label>
                    <input type="file" id="coverImage" accept="image/*" @change="onCoverChange" />
                </div>
                <div class="form-group">
                    <label for="title">标题:</label>
                    <input type="text" id="title" v-model="title" required />
                </div>
                <button type="submit" :disabled="!canUpload" class="upload-button">上传</button>
            </form>

            <transition name="fade">
                <div class="upload-status" v-if="statusMessage">{{ statusMessage }}</div>
            </transition>

            <hr />

            <h2 class="title">预览</h2>
            <div class="preview-container">
                <img :src="coverPreview" alt="Cover Preview" class="preview-image" />
                <p class="preview-title">{{ title }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import SegmentedLine from '@/components/SegmentedLine.vue'
import axios from 'axios'
export default {
    name: 'HomeShopping',
    components: {
        SegmentedLine
    },
    data() {
        return {
            pokegame: [
                { id: 0, img: require('../assets/game2.png'), go: 'https://item.taobao.com/item.htm?abbucket=11&id=765165229293&ns=1&pisk=gbfqLxwYuSFqvqVBPUdw8XP0mNOvsIqQg1t6SNbMlnxDcNYM_gj_kn_gDG5wqNBbkdZx7qCPYfGbD-Qi_COgAkNQOZ3v6CqIK25d0xLeufVsnnbYc4AaNkNQOayDkC_uAsO47d8BRfAMndvkE3LmjFjMIU0k2FLimFc0zaxJqFmmixvoEFYsnfjiiYck5eMDSdDDE7YMqhAMndc2vhxIaeJ0R0v_6dU9_K-ho3lFy_80lHFpqfj1NEvVswxPPa1yuK-eehZuIsj5Ss1ve-kD6a6FbOj3VxtcLeSydtrEgMSvSN8G0W3eqs7NaKBSmxYegnJhipVs_ZJGU_RfilHdPa-DLQ67eo96giWpvK282G7ycGf2EmrWf9_5iLS3VbS9QOfXZsquTg5EXUmf41BqjAJDyU-QzzyL7Pu6ZeOP5AH9HTLyArUxBApDyU-QzzktBKdpzHaYk&priceTId=2147826f17290640253353533e9a4e&skuId=5261591644548&spm=a21n57.1.item.8.7043523c44O6e0&utparam=%7B%22aplus_abtest%22%3A%221d769b986e742da603cd01ffc9d21210%22%7D&xxc=taobaoSearch' },
                { id: 1, img: require('../assets/game3.png'), go: 'https://item.taobao.com/item.htm?abbucket=11&id=533742154857&ns=1&pisk=gKsmLnMTYZ8XQeuW18-bSyPVcH48kxt6l1n96hdazQRSDFRTl1YG6_TNDnBAZC5dsdIAXGbSj961D-tThn6XfhPL9kIGhtt_pyfCpiAyadByQCR4vSB2XxNL9kEguY-giWCvm1dBUpvebK8w7UykhKowbFJVU8vwBjuZ01WzEQ9tgju274RyIpmwbKR2abJBBKu2_coraQ9wbjl7UrRfbgSzGuYXh8bowi9DoBW2gtCF4VTSltOlfGSynTvC3ViZbgvDuG6CjYkDkNWBRiBUj0tAKa-yIGwESCYh7iKP07rePFSPaL5YBV9lSOSBcHDa0TxDieSGNlwCTTXNJUj8LktD0I79cOH3MTjcMtslBAuymnQk-ixUAjROy9jMIGN_q6XNdN8ljjjPC4uEV9o6URIr5VT2FLAKnWtvwIA7qZ2uE2y6uL9X982o5VT2FLALE80UlEJWhBC..&priceTId=2147828717290641256658334e1136&skuId=3504481412066&spm=a21n57.1.item.46.7043523c44O6e0&utparam=%7B%22aplus_abtest%22%3A%225f7f28fa5dd4bb064133f060e7a1ea82%22%7D&xxc=taobaoSearch' },
                { id: 2, img: require('../assets/game4.png'), go: 'https://item.taobao.com/item.htm?id=693421727597&ns=1&pisk=gmkihgsvUfP_z-CQlHy6iQ8ZC8Ad-Gwb1qBYk-U2TyzCBSzv1qVmk2NqBRnt-ru-ooHtHxcCn0ijBhwvfRi_h-8JyLHmfcwX2Q0S2AVULlnF3rzweFnaHGTJyLpD_MyDSU3TIqQNLuqz3lP4gW-3DozVQqPVLDzQco7a0O-nYyaU0NWN_W5U0oCN3qr2Lyr7Dl7agOWeLuzUu-zZN6Ra5xkELF931ltnELDzj54rbPotKvS_G1i3-bhoLlm3Dc5f3tk3j5kjVxjFj5hqV7Mt4KXQB0cULoDX4s40ZjkTLA8eUWNqL2rEWnCbxjmqFRwl0do3IPVrn29XV4on0bFnp3J7IRzZMRiAqFnnIVnsKmIVTR2tt7DgUL_akXnonoDXlp0o00G4txbG4h1Fa9iPhk-xLs1b_kZ3yGY7ByUgRpcMxHfyc5rQfzKHxs1b_kZ3yHxhaCNaAlaR.&priceTId=2147828717290641692762836e1136&skuId=5094537771438&spm=a21n57.1.item.91.7043523c44O6e0&utparam=%7B%22aplus_abtest%22%3A%2272016d498998d3e87f9c2993c851a045%22%7D&xxc=ad_ztc' },
                { id: 3, img: require('../assets/game5.png'), go: 'https://item.taobao.com/item.htm?abbucket=11&id=554700671271&ns=1&pisk=gw0Zh8t9_FLZAMY7OWU4aa8MIjaTZPvW7qwbijc01R2gCjV0uvDX6RGDBxu4Kjn66o9Og13EUZ_6BhhcuraDFLTWPfCTkrv5q_u-QOF7ZtYbIR4n6lfpOeTWPfhF15AStUgsBqyaaibmnlq3xSyhs-2inkb3MJbgiNVcKBPYKrVcSNY3x7PYiG2mnwb3w7e0nSbg-kVugr2mnoVnNBe0FwPzjQ63cEEABtrzEf2Foa5-9lxoCi_GS6NUj8qnYZVI85raEfu1JKh4t2gUVk1XByc-AAVUzFW8_DczSSuvZiy40VUULY8lkWniQ2qqRIKtTqyaqVqF_CUQ8SD00DpPP5zsYuuZXIBnsYwZqPhfadGU4Dr8tkfVjPiSNqEoSFW8duFqLuiwUNkl4BWYtOMEkcWc0lVLT8OeT3d2gsa3NylfDiEtvWyW6CIADlVLT8OeTiIYXzFUFCdO.&priceTId=2147828717290642224425535e1136&skuId=4978571247012&spm=a21n57.1.item.150.7043523c44O6e0&utparam=%7B%22aplus_abtest%22%3A%22e5ecafb6a78bb87a1dff1e56edd8abab%22%7D&xxc=taobaoSearch' },
                { id: 4, img: require('../assets/game6.png'), go: 'https://item.taobao.com/item.htm?abbucket=11&id=35543284921&ns=1&pisk=gi8iKMVxzhS1lIEChX7sm0kw5amdR5_ffKUAHZBqY9WQWiWxfKjDHps2WNd9KtJJnsL9kExQoQOXWf_x1NO1lZk-e4LD1C_jw0vWwFXF8sAU7R7qyAdNk5M-e43mbW7mIYpOSCIdL_fPu1SV0Mlh6syNui5wTXfVMRr47KREt91YQRrN0kWFi_4VuO5a865VM-z4bi7Ets6F_bTxbOT28eks-G1stTDwk1jGUCWw6sYEvwr6a9xHYe1Mt3Aacrz2-1jwlQT0T5j90QsWWQu0RNdkYw5Dlbrcngx2Ww8ZL4SC0eJFTdhYc6xDgU_1rSuwtNXG4EvIlb9ytI-RxehrPNbNQnQ6M7D9tFv91eAYgk7GWHjkSau7QtKpZEfDlxgHEIRW0MY0Ig-_YuzBar1EMerbcG5CtTFiFNBdI9gHjXc34jsNO16-tXqbcG5CtThntuo1b611e&priceTId=2147828717290642712008171e1136&skuId=3505467813916&spm=a21n57.1.item.184.7043523c44O6e0&utparam=%7B%22aplus_abtest%22%3A%22f716fc7c41e7b63940b2d727f99ca854%22%7D&xxc=taobaoSearch' },
                { id: 5, img: require('../assets/game7.png'), go: 'https://item.taobao.com/item.htm?abbucket=11&id=561308840820&ns=1&pisk=gRrSh3A6HQA7DD8zWMBq5fMmEWoQVWswNpMLIJKyp0n-9rwgObWhr0zjOSFjw3Wlr2hQZ033zXlrODw31t5NbGyuEDmR_1SZ8mj860H-92LRpjHIe1S50ZW8EDmdOK-d7Gwu6m0yGXHKHtMELvKL9UexDjDBeYFKwqdxCAmK9WFKkIHnIUH-92KvHjD6JYh-vKpxIvdKpDFLHtMEMP1jnaG8Ft4tJuaRDDw-GHKL2M0S1lTeAHwse4ZLFjw43oMSPfgmTsQL2SyL4u0cPUn33PNQJ5C2zbUsCSgaP1t717DLdvF5jdGYVJZjrrRJyAiSNVE-WM-QF2Ubc0rRtF24hb3s0r7ca2o7NPciyZf0O-Gz9ugvNslU7-r-l5C2cW0QJuoY2sI14ztZ17lBRKgMAxGNhtTH-rFCWQjAkD4KyxD4bt6XNe0-nxGNhtTH-4Hm3qWfhQTh.&priceTId=2147819e17290643381617732e9f8d&skuId=4574560680236&spm=a21n57.1.item.4.3ee3523cWlfRe9&utparam=%7B%22aplus_abtest%22%3A%2252d9f46211f6ca8e3573aba06a7d46b0%22%7D&xxc=taobaoSearch' },
                { id: 6, img: require('../assets/game8.png'), go: 'https://item.taobao.com/item.htm?abbucket=11&id=682463323023&ns=1&pisk=gNZmhBvOYruX_CLS1TofSwr_jZ_8lKisl5Kt6chNzblWDVlOl50g67gaDmeYZfPLsAEYXl4WjJw_DtiOhmwjfc5d9MEgh-i_BtRLDoxP4xey0hoNvseqXK1d9MIGuLoGi6Fxm-He4vDEbxuZ7YWoBA-Z_5uw48lSCARqQnWuUbGrQIow03ordAL2_5kwU4kIpn-q7jyrzAlr_coZgN7qGlrz4ssu_8rz4nZSnqcU3jyYCuWIkEwrZKJ0qz0STMhkbhro38hj8VxhWXzIM2hgagKmj8kgZ2UctnVgQJaZrlAVHWPzS5k7P1YitPyYRPul3iyomj0oH7perm4aGl0bod6QUmP7RXgVP_MuDk3iO4APg8eog24gM_tZMy2zZ2EJwHnUR7qi8DSPCU8eVJ-sUOEy5FgqFYcpn6ixwjc5qrXlEeWsuYMj9TXk5FgqFYcdETYFlqkShXC..&priceTId=2147824717290643638717639e9cbb&skuId=5088730531121&spm=a21n57.1.item.47.3ee3523cWlfRe9&utparam=%7B%22aplus_abtest%22%3A%2256eeb666d82becf995b70b33a37ff0e2%22%7D&xxc=taobaoSearch' },
                { id: 7, img: require('../assets/game9.png'), go: 'https://item.taobao.com/item.htm?id=692639113556&ns=1&pisk=gNcZhr997CdwouR7RyF4z_-DVSPTL5xW_jZboq005lqgfq40gDmXWlgDXml4xqH6W-tOuNhE4s16Xd3cgSNDV3OWNVQTMSx7ldf50GU0otAbjSjnWRbpRBOWNV3F5PYS-QGsXjW7ztfmmR23KzE3SPV0ney3PrVcs-fGKMqLoSV0n10hxzaVir4GieW35r6csO2gtk47ztV0im2ngxr0V6zzIUsnb_xPjEyUqVqFi_78mRjo8t15NRzgQj0bYyaITPya4JEXxKciAqcs6JpNIS3IUmkmqH6_jYzrY8Mw41orXr04ocRRzkcZuXytdGXgz5raEf2kGsuanvlU1fxAe2gUj8PIdpK_h5oZeueMpHnq8lim_JjwAoMSRf2EqH1ED-km1WcMxQSzYiUhfDlxQiX4IyUUVe8eeE8VlW47Tq6AHRHL8uT9WtBYIyUUVe8FHteTwyrWWFC..&priceTId=2147829017290644013264662e8847&skuId=5101363035804&spm=a21n57.1.item.94.3ee3523cWlfRe9&utparam=%7B%22aplus_abtest%22%3A%22f9b0bdba2cfe1bf8b4940839d8be10b4%22%7D&xxc=ad_ztc' }
            ],
            packageFile: null,
            coverFile: null,
            title: '',
            coverPreview: ''
        }
    },
    computed: {
        canUpload() {
            return !!this.packageFile && !!this.coverFile && !!this.title
        }
    },
    methods: {
        onPackageChange(e) {
            this.packageFile = e.target.files[0]
        },
        onCoverChange(e) {
            this.coverFile = e.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                this.coverPreview = reader.result
            }
            reader.readAsDataURL(this.coverFile)
        },
        async uploadFiles() {
            if (!this.canUpload) {
                alert('请确保所有字段都已填写')
                return
            }

            const formData = new FormData()
            formData.append('package', this.packageFile)
            formData.append('cover', this.coverFile)
            formData.append('title', this.title)

            try {
                await axios.post('/?', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                this.statusMessage = '文件上传成功！'
                setTimeout(() => {
                    this.statusMessage = ''
                }, 3000)
            } catch (error) {
                console.error(error)
                this.statusMessage = '文件上传失败，请稍后重试'
                setTimeout(() => {
                    this.statusMessage = ''
                }, 3000)
            }
        }
    }
}
</script>

<style>
.ea {
    height: 500px;
    width: 1000px;
    margin: auto;
}

.eb {
    width: 100%;
    height: 100%;
}

.ec {
    position: relative;
    width: 1500px;
    height: 500px;
    margin: 20px auto;
}

.ed {
    width: 230px;
    height: 500px;
    position: absolute;
    top: 0;
    left: 0;
}

.ee {
    width: 230px;
    height: 500px;
    position: absolute;
    top: 0;
    left: 1270px;
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

.upload-container {
    max-width: 400px;
    margin: auto;
}

.title {
    text-align: center;
}

.upload-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 1em;
}

.upload-button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
}

.upload-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.upload-button:hover:not(:disabled) {
    background-color: #45a049;
}

.upload-status {
    text-align: center;
    padding: 1em;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    margin-top: 1em;
}

.preview-container {
    text-align: center;
}

.preview-image {
    max-width: 100%;
    height: auto;
}

.preview-title {
    margin-top: 1em;
    font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
