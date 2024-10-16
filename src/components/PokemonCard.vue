<template>
    <div>
        <div class="btop"></div>
        <div class="ba">
            <div class="be">
                <div class="bg">
                    <div class="bi">
                        <img class="bq" src="../assets/pokemon1.png">
                        <img class="br" src="../assets/pokemon2.png">
                        <img class="bs" :src=pokemonshow.sprites.front_shiny>
                    </div>
                </div>
                <div class="bh">
                    <div class="bi">
                        <img class="bq" src="../assets/pokemon1.png">
                        <img class="br" src="../assets/pokemon2.png">
                        <img class="bs" :src=pokemonshow.sprites.back_default>
                    </div>
                </div>
            </div>
            <div class=" bd">
                <img class="bj" src="../assets/pokemon1.png">
                <img class="bo" src="../assets/pokemon2.png">
                <img class="bp" :src=pokemonshow.sprites.front_default>
            </div>
            <div class="bf">
                <div class="bl">
                    <div class="bm">编号：</div>
                    <div class="bn"> {{ pokemonshow.id.toString().padStart(5, '0') }}</div>
                </div>
                <div class="bl">
                    <div class="bm">名称：</div>
                    <div class="bn">{{ getName(pokemonshow.name) }}</div>
                </div>
                <div class="bl">
                    <div class="bm">身高：</div>
                    <div class="bn">{{ divideByTenAndRound(pokemonshow.height) }}m</div>
                </div>
                <div class="bl">
                    <div class="bm">体重：</div>
                    <div class="bn">{{ divideByTenAndRound(pokemonshow.weight) }}kg</div>
                </div>
                <div class="bm" v-if="!pokemoneggLoaded">该精灵无蛋组</div>
                <div class="bt" v-if="pokemoneggLoaded">
                    <div class="bm">蛋组：</div>
                    <div class="bn" v-for="itemi in pokemonegg.egg_groups" :key="itemi.id">
                        {{ itemi.name }}
                    </div>
                </div>
                <div class="bt">
                    <div class="bm">特性：</div>
                    <div v-for="itemj in pokemonshow.abilities" :key="itemj.id">
                        <div :class="{ bn: true, bk: itemj.is_hidden }">{{ itemj.ability.name }}</div>
                    </div>
                </div>
                <div class="bw">
                    <div v-for="itemk in pokemonshow.types" :key="itemk.id">
                        <div class="bu" :style="{ backgroundColor: typecolors[itemk.type.name] }">{{
                            getTypeName(itemk.type.name) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bv">
            <!-- 原有的种族值图表 -->
            <div class="by-title">种族值图表</div>
            <div class="by" id="statsChart" style="width: 750px; height: 500px;"></div>

            <!-- 总种族值信息 -->
            <div class="bx">总种族值: {{ baseStatsTotal }}</div>

            <!-- 新增的雷达图 -->
            <div class="bz-title">满级时能力值雷达图（红色最大，蓝色最小）</div>
            <div class="bz" id="radarChart" style="width: 750px; height: 750px;"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
export default {
    name: 'PokemonCard',
    data() {
        return {
            pokemonshow: {},
            pokemonname: {
                bulbasaur: '妙蛙种子',
                ivysaur: '妙蛙草',
                venusaur: '妙蛙花',
                charmander: '小火龙',
                charmeleon: '火恐龙',
                charizard: '喷火龙',
                squirtle: '杰尼龟',
                wartortle: '卡咪龟',
                blastoise: '水箭龟',
                caterpie: '绿毛虫',
                metapod: '铁甲蛹',
                butterfree: '巴大蝶',
                weedle: '独角虫',
                kakuna: '铁壳蛹',
                beedrill: '大针蜂',
                pidgey: '波波',
                pidgeotto: '比比鸟',
                pidgeot: '大比鸟',
                rattata: '小拉达',
                raticate: '拉达',
                spearow: '烈雀',
                fearow: '大嘴雀',
                ekans: '阿柏蛇',
                arbok: '阿柏怪',
                pikachu: '皮卡丘',
                raichu: '雷丘',
                sandshrew: '穿山鼠',
                sandslash: '穿山王',
                'nidoran-f': '尼多兰♀',
                nidorina: '尼多娜',
                nidoqueen: '尼多后',
                'nidoran-m': '尼多朗♂',
                nidorino: '尼多力诺',
                nidoking: '尼多王',
                clefairy: '皮皮',
                clefable: '皮可西',
                vulpix: '六尾',
                ninetales: '九尾',
                jigglypuff: '胖丁',
                wigglytuff: '胖可丁',
                zubat: '超音蝠',
                golbat: '大嘴蝠',
                oddish: '走路草',
                gloom: '臭臭花',
                vileplume: '霸王花',
                paras: '派拉斯',
                parasect: '派拉斯特',
                venonat: '毛球',
                venomoth: '摩鲁蛾',
                diglett: '地鼠',
                dugtrio: '三地鼠',
                meowth: '喵喵',
                persian: '猫老大',
                psyduck: '可达鸭',
                golduck: '哥达鸭',
                mankey: '猴怪',
                primeape: '火暴猴',
                growlithe: '卡蒂狗',
                arcanine: '风速狗',
                poliwag: '蚊香蝌蚪',
                poliwhirl: '蚊香君',
                poliwrath: '蚊香泳士',
                abra: '凯西',
                kadabra: '勇基拉',
                alakazam: '胡地',
                machop: '腕力',
                machoke: '豪力',
                machamp: '怪力',
                bellsprout: '喇叭芽',
                weepinbell: '口呆花',
                victreebel: '大食花',
                tentacool: '玛瑙水母',
                tentacruel: '毒刺水母',
                geodude: '小拳石',
                graveler: '隆隆石',
                golem: '隆隆岩',
                ponyta: '小火马',
                rapidash: '烈焰马',
                slowpoke: '呆呆兽',
                slowbro: '呆壳兽',
                magnemite: '小磁怪',
                magneton: '三合一磁怪',
                farfetchd: '大葱鸭',
                doduo: '嘟嘟',
                dodrio: '嘟嘟利',
                seel: '小海狮',
                dewgong: '白海狮',
                grimer: '臭泥',
                muk: '臭臭泥',
                shellder: '大舌贝',
                cloyster: '刺甲贝',
                gastly: '鬼斯',
                haunter: '鬼斯通',
                gengar: '耿鬼',
                onix: '大岩蛇',
                drowzee: '催眠貘',
                hypno: '引梦貘人',
                krabby: '大钳蟹',
                kingler: '巨钳蟹',
                voltorb: '霹雳电球',
                electrode: '顽皮雷弹',
                exeggcute: '蛋蛋',
                exeggutor: '椰蛋树',
                cubone: '卡拉卡拉',
                marowak: '嘎啦嘎啦',
                hitmonlee: '飞腿郎',
                hitmonchan: '快拳郎',
                lickitung: '大舌头',
                koffing: '瓦斯弹',
                weezing: '双弹瓦斯',
                rhyhorn: '独角犀牛',
                rhydon: '钻角犀兽',
                chansey: '吉利蛋',
                tangela: '蔓藤怪',
                kangaskhan: '袋兽',
                horsea: '墨海马',
                seadra: '海刺龙',
                goldeen: '角金鱼',
                seaking: '金鱼王',
                staryu: '海星星',
                starmie: '宝石海星',
                'mr-mime': '魔墙人偶',
                scyther: '飞天螳螂',
                jynx: '迷唇姐',
                electabuzz: '电击兽',
                magmar: '鸭嘴火兽',
                pinsir: '凯罗斯',
                tauros: '肯泰罗',
                magikarp: '鲤鱼王',
                gyarados: '暴鲤龙',
                lapras: '拉普拉斯',
                ditto: '百变怪',
                eevee: '伊布',
                vaporeon: '水伊布',
                jolteon: '雷伊布',
                flareon: '火伊布',
                porygon: '多边兽',
                omanyte: '菊石兽',
                omastar: '多刺菊石兽',
                kabuto: '化石盔',
                kabutops: '镰刀盔',
                aerodactyl: '化石翼龙',
                snorlax: '卡比兽',
                articuno: '急冻鸟',
                zapdos: '闪电鸟',
                moltres: '火焰鸟',
                'articuno-galar': '急冻鸟-伽勒尔',
                'zapdos-galar': '闪电鸟-伽勒尔',
                'moltres-galar': '火焰鸟-伽勒尔',
                dratini: '迷你龙',
                dragonair: '哈克龙',
                dragonite: '快龙',
                mewtwo: '超梦',
                mew: '梦幻',
                chikorita: '菊草叶',
                bayleef: '月桂叶',
                meganium: '大竺葵',
                cyndaquil: '火球鼠',
                quilava: '火岩鼠',
                typhlosion: '火暴兽',
                totodile: '小锯鳄',
                croconaw: '蓝鳄',
                feraligatr: '大力鳄',
                sentret: '尾立',
                furret: '大尾立',
                hoothoot: '咕咕',
                noctowl: '猫头夜鹰',
                ledyba: '芭瓢虫',
                liedian: '安瓢虫',
                spinarak: '圆丝蛛',
                ariados: '阿利多斯',
                crobat: '叉字蝠',
                chinchou: '灯笼鱼',
                lanturn: '电灯怪',
                pichu: '皮丘',
                cleffa: '皮宝宝',
                igglybuff: '宝宝丁',
                togepi: '波克比',
                togetic: '波克基古',
                natu: '天然雀',
                xatu: '天然鸟',
                mareep: '咩利羊',
                flaaffy: '茸茸羊',
                ampharos: '电龙',
                bellossom: '美丽花',
                marill: '玛力露',
                azumarill: '玛力露丽',
                sudowoodo: '树才怪',
                politoed: '蚊香蛙皇',
                hoppip: '毽子草',
                skiploom: '毽子花',
                jumpluff: '毽子棉',
                aipom: '长尾怪手',
                sunkern: '向日种子',
                sunflora: '向日花怪',
                yanma: '蜻蜻蜓',
                wooper: '乌波',
                quagsire: '沼王',
                espeon: '太阳伊布',
                umbreon: '月亮伊布',
                murkrow: '黑暗鸦',
                slowking: '呆呆王',
                misdreavus: '梦妖',
                unown: '未知图腾',
                wobbuffet: '果然翁',
                girafarig: '麒麟奇',
                pineco: '榛果球',
                forretress: '佛烈托斯',
                dunsparce: '土龙弟弟',
                gligar: '天蝎',
                steelix: '大钢蛇',
                snubbull: '布鲁',
                granbull: '布鲁皇',
                qwilfish: '千针鱼',
                scizor: '巨钳螳螂',
                shuckle: '壶壶',
                heracross: '赫拉克罗斯',
                sneasel: '狃拉',
                teddiursa: '熊宝宝',
                ursaring: '圈圈熊',
                slugma: '熔岩虫',
                magcargo: '熔岩蜗牛',
                swinub: '小山猪',
                piloswine: '长毛猪',
                corsola: '太阳珊瑚',
                remoraid: '铁炮鱼',
                octillery: '章鱼桶',
                delibird: '信使鸟',
                mantine: '巨翅飞鱼',
                skarmory: '盔甲鸟',
                houndour: '戴鲁比',
                houndoom: '黑鲁加',
                kingdra: '刺龙王',
                phanpy: '小小象',
                donphan: '顿甲',
                stantler: '惊角鹿',
                smeargle: '图图犬',
                tyrogue: '无畏小子',
                hitmontop: '战舞郎',
                smoochum: '迷唇娃',
                elekid: '电击怪',
                magby: '鸭嘴宝宝',
                miltank: '大奶罐',
                blissey: '幸福蛋',
                raikou: '雷公',
                entei: '炎帝',
                suicune: '水君',
                larvitar: '幼基拉斯',
                pupitar: '沙基拉斯',
                tyranitar: '班基拉斯',
                lugia: '洛奇亚',
                'ho-oh': '凤王',
                celebi: '时拉比',
                treecko: '木守宫',
                grovyle: '森林蜥蜴',
                sceptile: '蜥蜴王',
                torchic: '火稚鸡',
                combusken: '力壮鸡',
                blaziken: '火焰鸡',
                mudkip: '水跃鱼',
                marshtomp: '沼跃鱼',
                swampert: '巨沼怪',
                poochyena: '土狼犬',
                mightyena: '大狼犬',
                zigzagoon: '蛇纹熊',
                linoone: '直冲熊',
                wurmple: '刺尾虫',
                silcoon: '甲壳茧',
                beautifly: '狩猎凤蝶',
                cascoon: '盾甲茧',
                dustox: '毒粉蛾',
                lotad: '莲叶童子',
                lombre: '莲帽小童',
                ludicolo: '乐天河童',
                seedot: '橡实果',
                nuzleaf: '长鼻叶',
                shiftry: '狡猾天狗',
                taillow: '傲骨燕',
                swellow: '大王燕',
                wingull: '长翅鸥',
                pelipper: '大嘴鸥',
                ralts: '拉鲁拉丝',
                kirlia: '奇鲁莉安',
                gardevoir: '沙奈朵',
                surskit: '溜溜糖球',
                masquerain: '雨翅蛾',
                shroomish: '蘑蘑菇',
                breloom: '斗笠菇',
                slakoth: '懒人獭',
                vigoroth: '过动猿',
                slaking: '请假王',
                nincada: '土居忍士',
                ninjask: '铁面忍者',
                shedinja: '脱壳忍者',
                whismur: '咕妞妞',
                loudred: '吼爆弹',
                exploud: '爆音怪',
                makuhita: '幕下力士',
                hariyama: '铁掌力士',
                azurill: '露力丽',
                nosepass: '朝北鼻',
                skitty: '向尾喵',
                delcatty: '优雅猫',
                sableye: '勾魂眼',
                mawile: '大嘴娃',
                aron: '可可多拉',
                lairon: '可多拉',
                aggron: '波士可多拉',
                meditite: '玛沙那',
                medicham: '恰雷姆',
                electrike: '落雷兽',
                manectric: '雷电兽',
                plusle: '正电拍拍',
                minun: '负电拍拍',
                volbeat: '电萤虫',
                illumise: '甜甜萤',
                roselia: '毒蔷薇',
                gulpin: '溶食兽',
                swalot: '吞食兽',
                carvanha: '利牙鱼',
                sharpedo: '巨牙鲨',
                wailmer: '吼吼鲸',
                wailord: '吼鲸王',
                numel: '呆火驼',
                camerupt: '喷火驼',
                torkoal: '煤炭龟',
                spoink: '跳跳猪',
                grumpig: '噗噗猪',
                spinda: '晃晃斑',
                trapinch: '大颚蚁',
                vibrava: '超音波幼虫',
                flygon: '沙漠蜻蜓',
                cacnea: '刺球仙人掌',
                cacturne: '梦歌仙人掌',
                swablu: '青绵鸟',
                altaria: '七夕青鸟',
                zangoose: '猫鼬斩',
                seviper: '饭匙蛇',
                lunatone: '月石',
                solrock: '太阳岩',
                barboach: '泥泥鳅',
                whiscash: '鲶鱼王',
                corphish: '龙虾小兵',
                crawdaunt: '铁螯龙虾',
                baltoy: '天秤偶',
                claydol: '念力土偶',
                lileep: '触手百合',
                cradily: '摇篮百合',
                anorith: '太古羽虫',
                armaldo: '太古盔甲',
                feebas: '丑丑鱼',
                milotic: '美纳斯',
                castform: '飘浮泡泡',
                kecleon: '变隐龙',
                shuppet: '怨影娃娃',
                banette: '诅咒娃娃',
                duskull: '夜巡灵',
                dusclops: '彷徨夜灵',
                tropius: '热带龙',
                chimecho: '风铃铃',
                absol: '阿勃梭鲁',
                wynaut: '小果然',
                snorunt: '雪童子',
                glalie: '冰鬼护',
                spheal: '海豹球',
                sealeo: '海魔狮',
                walrein: '帝牙海狮',
                clamperl: '珍珠贝',
                huntail: '猎斑鱼',
                gorebyss: '樱花鱼',
                relicanth: '古空棘鱼',
                luvdisc: '爱心鱼',
                bagon: '宝贝龙',
                shelgon: '甲壳龙',
                salamence: '暴飞龙',
                beldum: '铁哑铃',
                metang: '金属怪',
                metagross: '巨金怪',
                regirock: '雷吉洛克',
                regice: '雷吉艾斯',
                registeel: '雷吉斯奇鲁',
                latias: '拉帝亚斯',
                latios: '拉帝欧斯',
                kyogre: '盖欧卡',
                groudon: '固拉多',
                rayquaza: '烈空坐',
                jirachi: '基拉祈',
                turtwig: '草苗龟',
                grotle: '树林龟',
                torterra: '土台龟',
                chimchar: '小火焰猴',
                monferno: '猛火猴',
                infernape: '烈焰猴',
                piplup: '波加曼',
                prinplup: '波皇子',
                empoleon: '帝王拿波',
                starly: '姆克儿',
                staravia: '姆克鸟',
                staraptor: '姆克鹰',
                bidoof: '大牙狸',
                bibarel: '大尾狸',
                kricketot: '圆法师',
                kricketune: '音箱蟀',
                shinx: '小猫怪',
                luxio: '勒克猫',
                luxray: '伦琴猫',
                budew: '含羞苞',
                roserade: '罗丝雷朵',
                cranidos: '头盖龙',
                rampardos: '战槌龙',
                shieldon: '盾甲龙',
                bastiodon: '护城龙',
                burmy: '结草儿',
                'wormadam-plant': '结草贵妇-草木蓑衣',
                mothim: '绅士蛾',
                combee: '三蜜蜂',
                vespiquen: '蜂女王',
                pachirisu: '帕奇利兹',
                buizel: '泳圈鼬',
                floatzel: '浮潜鼬',
                cherubi: '樱花宝',
                cherrim: '樱花儿',
                shellos: '无壳海兔',
                gastrodonEast: '海兔兽-东海',
                gastrodon: '海兔兽',
                ambipom: '双尾怪手',
                drifloon: '飘飘球',
                drifblim: '随风球',
                buneary: '卷卷耳',
                lopunny: '长耳兔',
                mismagius: '梦妖魔',
                honchkrow: '乌鸦头头',
                glameow: '魅力喵',
                purugly: '东施喵',
                chingling: '铃铛响',
                stunky: '臭鼬噗',
                skuntank: '坦克臭鼬',
                bronzor: '铜镜怪',
                bronzong: '青铜钟',
                bonsly: '盆才怪',
                'mime-jr': '魔尼尼',
                happiny: '小福蛋',
                chatot: '聒噪鸟',
                spiritomb: '花岩怪',
                gible: '圆陆鲨',
                gabite: '尖牙陆鲨',
                garchomp: '烈咬陆鲨',
                munchlax: '小卡比兽',
                riolu: '利欧路',
                lucario: '路卡利欧',
                hippopotas: '沙河马',
                hippowdon: '河马兽',
                skorupi: '钳尾蝎',
                drapion: '龙王蝎',
                croagunk: '不良蛙',
                toxicroak: '毒骷蛙',
                carnivine: '尖牙笼',
                finneon: '荧光鱼',
                lumineon: '霓虹鱼',
                mantyke: '小球飞鱼',
                snover: '雪笠怪',
                abomasnow: '暴雪王',
                weavile: '玛狃拉',
                magnezone: '自爆磁怪',
                lickilicky: '大舌舔',
                rhyperior: '超甲狂犀',
                tangrowth: '巨蔓藤',
                electivire: '电击魔兽',
                magmortar: '鸭嘴炎兽',
                togekiss: '波克基斯',
                yanmega: '远古巨蜓',
                leafeon: '叶伊布',
                glaceon: '冰伊布',
                gliscor: '天蝎王',
                mamoswine: '象牙猪',
                porygon2: '多边兽II',
                'porygon-z': '多边兽Z',
                gallade: '艾路雷朵',
                probopass: '大朝北鼻',
                dusknoir: '黑夜魔灵',
                froslass: '雪妖女',
                rotom: '洛托姆',
                uxie: '由克希',
                mesprit: '艾姆利多',
                azelf: '亚克诺姆',
                'dialga-origin': '帝牙卢卡-起源形态',
                dialga: '帝牙卢卡',
                'palkia-origin': '帕路奇亚-起源形态',
                palkia: '帕路奇亚',
                heatran: '席多蓝恩',
                regigigas: '雷吉奇卡斯',
                'giratina-origin': '骑拉帝纳-起源形态',
                giratina: '骑拉帝纳',
                cresselia: '克雷色利亚',
                phione: '霏欧纳',
                manaphy: '玛纳霏',
                darkrai: '达克莱伊',
                'shaymin-land': '谢米-陆上形态',
                victini: '比克提尼',
                snivy: '藤藤蛇',
                servine: '青藤蛇',
                serperior: '君主蛇',
                tepig: '暖暖猪',
                pignite: '炒炒猪',
                emboar: '炎武王',
                oshawott: '水水獭',
                dewott: '双刃丸',
                samurott: '大剑鬼',
                patrat: '探探鼠',
                watchog: '步哨鼠',
                lillipup: '小约克',
                herdier: '哈约克',
                stoutland: '长毛狗',
                purrloin: '扒手猫',
                liepard: '酷豹',
                pansage: '花椰猴',
                simisage: '花椰猿',
                pansear: '爆香猴',
                simisear: '爆香猿',
                panpour: '冷水猴',
                simipour: '冷水猿',
                munna: '食梦梦',
                musharna: '梦梦蚀',
                pidove: '豆豆鸽',
                tranquill: '咕咕鸽',
                unfezant: '高傲雉鸡',
                blitzle: '斑斑马',
                zebstrika: '雷电斑马',
                roggenrola: '石丸子',
                boldore: '地幔岩',
                gigalith: '庞岩怪',
                woobat: '滚滚蝙蝠',
                swoobat: '心蝙蝠',
                drilbur: '螺钉地鼠',
                excadrill: '龙头地鼠',
                audino: '差不多娃娃',
                timburr: '搬运小匠',
                gurdurr: '铁骨土人',
                conkeldurr: '修建老匠',
                tympole: '圆蝌蚪',
                palpitoad: '蓝蟾蜍',
                seismitoad: '蟾蜍王',
                throh: '投摔鬼',
                sawk: '打击鬼',
                sewaddle: '虫宝包',
                swadloon: '宝包茧',
                leavanny: '保姆虫',
                venipede: '百足蜈蚣',
                whirlipede: '车轮球',
                scolipede: '蜈蚣王',
                cottonee: '木棉球',
                whimsicott: '风妖精',
                petilil: '百合根娃娃',
                lilligant: '裙儿小姐',
                'basculin-blue-striped': '野蛮鲈鱼-蓝条纹',
                'basculin-white-striped': '野蛮鲈鱼-白条纹',
                'basculin-red-striped': '野蛮鲈鱼-红条纹',
                sandile: '黑眼鳄',
                krokorok: '混混鳄',
                krookodile: '流氓鳄',
                darumaka: '火红不倒翁',
                'darmanitan-standard': '达摩狒狒',
                maractus: '沙铃仙人掌',
                dwebble: '石居蟹',
                crustle: '岩殿居蟹',
                scraggy: '滑滑小子',
                scrafty: '头巾混混',
                sigilyph: '象征鸟',
                yamask: '哭哭面具',
                cofagrigus: '死神棺',
                tirtouga: '原盖海龟',
                carracosta: '肋骨海龟',
                archen: '始祖小鸟',
                archeops: '始祖大鸟',
                trubbish: '破破袋',
                garbodor: '灰尘山',
                zorua: '索罗亚',
                zoroark: '索罗亚克',
                minccino: '泡沫栗鼠',
                cinccino: '奇诺栗鼠',
                gothita: '哥德宝宝',
                gothorita: '哥德小童',
                gothitelle: '哥德小姐',
                solosis: '单卵细胞球',
                duosion: '双卵细胞球',
                reuniclus: '人造细胞卵',
                ducklett: '鸭宝宝',
                swanna: '舞天鹅',
                vanillite: '迷你冰',
                vanillish: '多多冰',
                vanilluxe: '双倍多多冰',
                deerling: '四季鹿',
                sawsbuckSummer: '萌芽鹿-夏天的样子',
                sawsbuckAutumn: '萌芽鹿-秋天的样子',
                sawsbuckWinter: '萌芽鹿-冬天的样子',
                sawsbuck: '萌芽鹿',
                emolga: '电飞鼠',
                karrablast: '盖盖虫',
                escavalier: '骑士蜗牛',
                foongus: '哎呀球菇',
                amoonguss: '败露球菇',
                frillish: '轻飘飘',
                jellicent: '胖嘟嘟',
                alomomola: '保姆曼波',
                joltik: '电电虫',
                galvantula: '电蜘蛛',
                ferroseed: '种子铁球',
                ferrothorn: '坚果哑铃',
                klink: '齿轮儿',
                klang: '齿轮组',
                klinklang: '齿轮怪',
                tynamo: '麻麻小鱼',
                eelektrik: '麻麻鳗',
                eelektross: '麻麻鳗鱼王',
                elgyem: '小灰怪',
                beheeyem: '大宇怪',
                litwick: '烛光灵',
                lampent: '灯火幽灵',
                chandelure: '水晶灯火灵',
                axew: '牙牙',
                fraxure: '斧牙龙',
                haxorus: '双斧战龙',
                cubchoo: '喷嚏熊',
                beartic: '冻原熊',
                cryogonal: '几何雪花',
                shelmet: '小嘴蜗',
                accelgor: '敏捷虫',
                stunfisk: '泥巴鱼',
                mienfoo: '功夫鼬',
                mienshao: '师父鼬',
                druddigon: '赤面龙',
                golett: '泥偶小人',
                golurk: '泥偶巨人',
                pawniard: '驹刀小兵',
                bisharp: '劈斩司令',
                bouffalant: '爆炸头水牛',
                rufflet: '毛头小鹰',
                braviary: '勇士雄鹰',
                vullaby: '秃鹰丫头',
                mandibuzz: '秃鹰娜',
                heatmor: '熔蚁兽',
                durant: '铁蚁',
                deino: '单首龙',
                zweilous: '双首暴龙',
                hydreigon: '三首恶龙',
                larvesta: '燃烧虫',
                volcarona: '火神蛾',
                cobalion: '勾帕路翁',
                terrakion: '代拉基翁',
                virizion: '毕力吉翁',
                'tornadus-therian': '龙卷云-灵兽形态',
                'thundurus-therian': '雷电云-灵兽形态',
                'landorus-therian': '土地云-灵兽形态',
                'enamorus-therian': '眷恋云-灵兽形态',
                'tornadus-incarnate': '龙卷云-化身形态',
                'thundurus-incarnate': '雷电云-化身形态',
                'landorus-incarnate': '土地云-化身形态',
                'enamorus-incarnate': '眷恋云-化身形态',
                reshiram: '莱希拉姆',
                zekrom: '捷克罗姆',
                'kyurem-white': '酋雷姆-焰白',
                'kyurem-black': '酋雷姆-暗黑',
                kyurem: '酋雷姆',
                'keldeo-ordinary': '凯路迪欧-平常的样子',
                'meloetta-aria': '美洛耶塔-歌声形态',
                genesect: '盖诺赛克特',
                chespin: '哈力栗',
                quilladin: '胖胖哈力',
                chesnaught: '布里卡隆',
                fennekin: '火狐狸',
                braixen: '长尾火狐',
                delphox: '妖火红狐',
                froakie: '呱呱泡蛙',
                frogadier: '呱头蛙',
                greninja: '甲贺忍蛙',
                'greninja-battle-bond': '甲贺忍蛙-牵绊',
                'greninja-ash': '甲贺忍蛙-小智版',
                bunnelby: '掘掘兔',
                diggersby: '掘地兔',
                fletchling: '小箭雀',
                fletchinder: '火箭雀',
                talonflame: '烈箭鹰',
                scatterbug: '粉蝶虫',
                spewpa: '粉蝶蛹',
                'vivillon-archiepelago': '彩粉蝶-群岛花纹',
                'vivillon-continental': '彩粉蝶-大陆花纹',
                'vivillon-elegant': '彩粉蝶-高雅花纹',
                'vivillon-garden': '彩粉蝶-庭园花纹',
                'vivillon-highPlains': '彩粉蝶-荒野花纹',
                'vivillon-icySnow': '彩粉蝶-冰雪花纹',
                'vivillon-jungle': '彩粉蝶-热带雨林花纹',
                'vivillon-marine': '彩粉蝶-大海花纹',
                'vivillon-modern': '彩粉蝶-摩登花纹',
                'vivillon-monsoon': '彩粉蝶-骤雨花纹',
                'vivillon-ocean': '彩粉蝶-大洋花纹',
                'vivillon-polar': '彩粉蝶-雪国花纹',
                'vivillon-river': '彩粉蝶-大河花纹',
                'vivillon-sandstorm': '彩粉蝶-沙尘花纹',
                'vivillon-savanna': '彩粉蝶-热带草原花纹',
                'vivillon-sun': '彩粉蝶-太阳花纹',
                'vivillon-tundra': '彩粉蝶-雪原花纹',
                vivillon: '彩粉蝶',
                litleo: '小狮狮',
                pyroar: '火炎狮',
                flabebe: '花蓓蓓',
                'floette-orange': '花叶蒂-橙花',
                'floette-white': '花叶蒂-白花',
                'floette-yellow': '花叶蒂-黄花',
                'floette-blue': '花叶蒂-蓝花',
                floette: '花叶蒂',
                'florges-orange': '花洁夫人-橙花',
                'florges-white': '花洁夫人-白花',
                'florges-yellow': '花洁夫人-黄花',
                'florges-blue': '花洁夫人-蓝花',
                florges: '花洁夫人',
                skiddo: '坐骑小羊',
                gogoat: '坐骑山羊',
                pancham: '顽皮熊猫',
                pangoro: '流氓熊猫',
                'furfrou-heart': '多丽米亚-心形造型',
                'furfrou-dandy': '多丽米亚-绅士造型',
                'furfrou-debutante': '多丽米亚-淑女造型',
                'furfrou-diamond': '多丽米亚-菱形造型',
                'furfrou-matron': '多丽米亚-贵妇造型',
                'furfrou-pharaoh': '多丽米亚-国王造型',
                'furfrou-star': '多丽米亚-星形造型',
                'furfrou-laReine': '多丽米亚-女王造型',
                'furfrou-kabuki': '多丽米亚-歌舞伎造型',
                furfrou: '多丽米亚',
                espurr: '妙喵',
                'meowstic-male': '超能妙喵-雄性的样子',
                'meowstic-female': '超能妙喵-雌性的样子',
                honedge: '独剑鞘',
                doublade: '双剑鞘',
                'aegislash-shield': '坚盾剑怪-盾牌形态',
                spritzee: '粉香香',
                aromatisse: '芳香精',
                swirlix: '绵绵泡芙',
                slurpuff: '胖甜妮',
                inkay: '好啦鱿',
                malamar: '乌贼王',
                binacle: '龟脚脚',
                barbaracle: '龟足巨铠',
                skrelp: '垃垃藻',
                dragalge: '毒藻龙',
                clauncher: '铁臂枪虾',
                clawitzer: '钢炮臂虾',
                helioptile: '伞电蜥',
                heliolisk: '光电伞蜥',
                tyrunt: '宝宝暴龙',
                tyrantrum: '怪颚龙',
                amaura: '冰雪龙',
                aurorus: '冰雪巨龙',
                sylveon: '仙子伊布',
                hawlucha: '摔角鹰人',
                dedenne: '咚咚鼠',
                carbink: '小碎钻',
                goomy: '黏黏宝',
                sliggoo: '黏美儿',
                goodra: '黏美龙',
                klefki: '钥圈儿',
                phantump: '小木灵',
                trevenant: '朽木妖',
                'pumpkaboo-average': '南瓜精-普通尺寸',
                'gourgeist-average': '南瓜怪人-普通尺寸',
                bergmite: '冰宝',
                avalugg: '冰岩怪',
                noibat: '嗡蝠',
                noivern: '音波龙',
                'xerneas-neutral': '哲尔尼亚斯-放松模式',
                'xerneas-active': '哲尔尼亚斯-活跃模式',
                xerneas: '哲尔尼亚斯',
                yveltal: '伊裴尔塔尔',
                'zygarde-complete': '基格尔德-完全体形态',
                'zygarde-50': '基格尔德-50%形态',
                'zygarde-10-power-construct': '基格尔德-10%力量形态',
                'zygarde-50-power-construct': '基格尔德-50%力量形态',
                zygarde: '基格尔德',
                diancie: '蒂安希',
                hoopa: '胡帕',
                volcanion: '波尔凯尼恩',
                rowlet: '木木枭',
                dartrix: '投羽枭',
                decidueye: '狙射树枭',
                litten: '火斑喵',
                torracat: '炎热喵',
                incineroar: '炽焰咆哮虎',
                popplio: '球球海狮',
                brionne: '花漾海狮',
                primarina: '西狮海壬',
                pikipek: '小笃儿',
                trumbeak: '喇叭啄鸟',
                toucannon: '铳嘴大鸟',
                yungoos: '猫鼬少',
                gumshoos: '猫鼬探长',
                grubbin: '强颚鸡母虫',
                charjabug: '虫电宝',
                vikavolt: '锹农炮虫',
                crabrawler: '好胜蟹',
                crabominable: '好胜毛蟹',
                'oricorio-pom-pom': '花舞鸟-啪滋啪滋风格',
                'oricorio-pau': '花舞鸟-呼啦呼啦风格',
                'oricorio-sensu': '花舞鸟-轻盈轻盈风格',
                'oricorio-baile': '花舞鸟-热辣热辣风格',
                cutiefly: '萌虻',
                ribombee: '蝶结萌虻',
                rockruff: '岩狗狗',
                'lycanroc-midnight': '鬃岩狼人-黑夜',
                'lycanroc-dusk': '鬃岩狼人-黄昏',
                'lycanroc-midday': '鬃岩狼人-白天',
                'wishiwashi-solo': '弱丁鱼-单独的样子',
                mareanie: '好坏星',
                toxapex: '超坏星',
                mudbray: '泥驴仔',
                mudsdale: '重泥挽马',
                dewpider: '滴蛛',
                araquanid: '滴蛛霸',
                fomantis: '伪螳草',
                lurantis: '兰螳花',
                morelull: '睡睡菇',
                shiinotic: '灯罩夜菇',
                salandit: '夜盗火蜥',
                salazzle: '焰后蜥',
                stufful: '童偶熊',
                bewear: '穿着熊',
                bounsweet: '甜竹竹',
                steenee: '甜舞妮',
                tsareena: '甜冷美后',
                comfey: '花疗环环',
                oranguru: '智挥猩',
                passimian: '投掷猴',
                wimpod: '胆小虫',
                golisopod: '具甲武者',
                sandygast: '沙丘娃',
                palossand: '噬沙堡爷',
                pyukumuku: '拳海参',
                'type-null': '属性：空',
                silvally: '银伴战兽',
                'minior-orange': '小陨星-橙色核心',
                'minior-yellow': '小陨星-黄色核心',
                'minior-green': '小陨星-绿色核心',
                'minior-blue': '小陨星-蓝色核心',
                'minior-indigo': '小陨星-浅蓝色核心',
                'minior-violet': '小陨星-紫色核心',
                'minior-red-meteor': '小陨星-红色流星',
                'minior-orange-meteor': '小陨星-橙色流星',
                'minior-yellow-meteor': '小陨星-黄色流星',
                'minior-green-meteor': '小陨星-绿色流星',
                'minior-blue-meteor': '小陨星-蓝色流星',
                'minior-indigo-meteor': '小陨星-浅蓝色流星',
                'minior-violet-meteor': '小陨星-紫色流星',
                komala: '树枕尾熊',
                turtonator: '爆焰龟兽',
                togedemaru: '托戈德玛尔',
                'mimikyu-disguised': '谜拟Q-画皮形态',
                bruxish: '磨牙彩皮鱼',
                drampa: '老翁龙',
                dhelmise: '破破舵轮',
                'jangmo-o': '心鳞宝',
                'hakamo-o': '鳞甲龙',
                'kommo-o': '杖尾鳞甲龙',
                'tapu-koko': '卡璞・鸣鸣',
                'tapu-lele': '卡璞・蝶蝶',
                'tapu-bulu': '卡璞・哞哞',
                'tapu-fini': '卡璞・鳍鳍',
                cosmog: '科斯莫古',
                cosmoem: '科斯莫姆',
                solgaleo: '索尔迦雷欧',
                lunala: '露奈雅拉',
                nihilego: '虚吾伊德',
                buzzwole: '爆肌蚊',
                pheromosa: '费洛美螂',
                xurkitree: '电束木',
                celesteela: '铁火辉夜',
                kartana: '纸御剑',
                guzzlord: '恶食大王',
                necrozma: '奈克洛兹玛',
                magearna: '玛机雅娜',
                marshadow: '玛夏多',
                poipole: '毒贝比',
                naganadel: '四颚针龙',
                stakataka: '垒磊石',
                blacephalon: '砰头小丑',
                zeraora: '捷拉奥拉',
                meltan: '美录坦',
                melmetal: '美录梅塔',
                grookey: '敲音猴',
                thwackey: '啪咚猴',
                rillaboom: '轰擂金刚猩',
                scorbunny: '炎兔儿',
                raboot: '腾蹴小将',
                cinderace: '闪焰王牌',
                sobble: '泪眼蜥',
                drizzile: '变涩蜥',
                inteleon: '千面避役',
                skwovet: '贪心栗鼠',
                greedent: '藏饱栗鼠',
                rookidee: '稚山雀',
                corvisquire: '蓝鸦',
                corviknight: '钢铠鸦',
                blipbug: '索侦虫',
                dottler: '天罩虫',
                orbeetle: '以欧路普',
                nickit: '偷儿狐',
                thievul: '狐大盗',
                gossifleur: '幼棉棉',
                eldegoss: '白蓬蓬',
                wooloo: '毛辫羊',
                dubwool: '毛毛角羊',
                chewtle: '咬咬龟',
                drednaw: '暴噬龟',
                'deoxys-attack': '代欧奇希斯-攻击形态',
                'deoxys-defense': '代欧奇希斯-防御形态',
                'deoxys-speed': '代欧奇希斯-速度形态',
                'deoxys-normal': '代欧奇希斯-普通形态',
                yamper: '来电汪',
                boltund: '逐电犬',
                rolycoly: '小炭仔',
                carkol: '大炭车',
                coalossal: '巨炭山',
                applin: '啃果虫',
                flapple: '苹裹龙',
                appletun: '丰蜜龙',
                silicobra: '沙包蛇',
                sandaconda: '沙螺蟒',
                cramorant: '古月鸟',
                arrokuda: '刺梭鱼',
                barraskewda: '戽斗尖梭',
                toxel: '毒电婴',
                'toxtricity-low-key': '颤弦蝾螈-低调形态',
                'toxtricity-amped': '颤弦蝾螈-高调形态',
                sizzlipede: '烧火蚣',
                centiskorch: '焚焰蚣',
                clobbopus: '拳拳蛸',
                grapploct: '八爪武师',
                sinistea: '来悲茶',
                polteageist: '怖思壶',
                hatenna: '迷布莉姆',
                hattrem: '提布莉姆',
                hatterene: '布莉姆温',
                impidimp: '捣蛋小妖',
                morgrem: '诈唬魔',
                grimmsnarl: '长毛巨魔',
                obstagoon: '堵拦熊',
                perrserker: '喵头目',
                cursola: '魔灵珊瑚',
                sirfetchd: '葱游兵',
                'mr-rime': '踏冰人偶',
                runerigus: '死神板',
                milcery: '小仙奶',
                'alcremie-rubyc': '霜奶仙-奶香红钻',
                'alcremie-matchac': '霜奶仙-奶香抹茶',
                'alcremie-mintc': '霜奶仙-奶香薄荷',
                'alcremie-lemonc': '霜奶仙-奶香柠檬',
                'alcremie-saltc': '霜奶仙-奶香雪盐',
                'alcremie-rubys': '霜奶仙-红钻综合',
                'alcremie-caramels': '霜奶仙-焦糖综合',
                'alcremie-rainbows': '霜奶仙-三色综合',
                alcremie: '霜奶仙',
                falinks: '列阵兵',
                pincurchin: '啪嚓海胆',
                snom: '雪吞虫',
                frosmoth: '雪绒蛾',
                stonjourner: '巨石丁',
                'eiscue-ice': '冰砌鹅-冻结头',
                'indeedee-male': '爱管侍-雄性的样子',
                'indeedee-female': '爱管侍-雌性的样子',
                'morpeko-full-belly': '莫鲁贝可-满腹花纹',
                cufant: '铜象',
                copperajah: '大王铜象',
                dracozolt: '雷鸟龙',
                arctozolt: '雷鸟海兽',
                dracovish: '鳃鱼龙',
                arctovish: '鳃鱼海兽',
                duraludon: '铝钢龙',
                dreepy: '多龙梅西亚',
                drakloak: '多龙奇',
                dragapult: '多龙巴鲁托',
                'zacian-crowned': '苍响-剑之王',
                zacian: '苍响',
                'zamazenta-crowned': '藏玛然特-盾之王',
                zamazenta: '藏玛然特',
                'eternatus-eternamax': '无极汰那-无极巨化',
                eternatus: '无极汰那',
                kubfu: '熊徒弟',
                'urshifu-rapid-strike': '武道熊师-连击流',
                'urshifu-single-strike': '武道熊师-一击流',
                'zarude-dada': '萨戮德-阿爸',
                zarude: '萨戮德',
                regieleki: '雷吉艾勒奇',
                regidrago: '雷吉铎拉戈',
                glastrier: '雪暴马',
                spectrier: '灵幽马',
                'calyrex-shadow': '蕾冠王-黑马',
                'calyrex-ice': '蕾冠王-白马',
                calyrex: '蕾冠王',
                'slowking-galar': '呆呆王-伽勒尔',
                'slowbro-galar': '呆壳兽-伽勒尔',
                'slowpoke-galar': '呆呆兽-伽勒尔',
                wyrdeer: '诡角鹿',
                kleavor: '劈斧螳螂',
                ursaluna: '月月熊',
                'basculegion-male': '幽尾玄鱼-雄性的样子',
                'basculegion-female': '幽尾玄鱼-雌性的样子',
                sneasler: '大狃拉',
                overqwil: '万针鱼',
                sprigatito: '新叶喵',
                floragato: '蒂蕾喵',
                meowscarada: '魔幻假面喵',
                fuecoco: '呆火鳄',
                crocalor: '炙烫鳄',
                skeledirge: '骨纹巨声鳄',
                quaxly: '润水鸭',
                quaxwell: '涌跃鸭',
                quaquaval: '狂欢浪舞鸭',
                lechonk: '爱吃豚',
                'squawkabilly-green-plumage': '怒鹦哥-绿羽毛',
                'squawkabilly-blue-plumage': '怒鹦哥-蓝羽毛',
                'squawkabilly-yellow-plumage': '怒鹦哥-黄羽毛',
                'squawkabilly-white-plumage': '怒鹦哥-白羽毛',
                'oinkologne-male': '飘香豚-雄性的样子',
                'oinkologne-female': '飘香豚-雌性的样子',
                'dudunsparce-two-segment': '土龙节节',
                'dudunsparce-three-segment': '土龙节节-三节形态',
                tarountula: '团珠蛛',
                spidops: '操陷蛛',
                nymble: '豆蟋蟀',
                lokix: '烈腿蝗',
                rellor: '虫滚泥',
                rabsca: '虫甲圣',
                greavard: '墓仔狗',
                houndstone: '墓扬犬',
                flittle: '飘飘雏',
                espathra: '超能艳鸵',
                farigiraf: '奇麒麟',
                wiglett: '海地鼠',
                wugtrio: '三海地鼠',
                dondozo: '吃吼霸',
                veluza: '轻身鳕',
                finizen: '波普海豚',
                'palafin-zero': '海豚侠',
                'palafin-hero': '海豚侠-全能形态',
                palafin: '海豚侠',
                smoliv: '迷你芙',
                dolliv: '奥利纽',
                arboliva: '奥利瓦',
                capsakid: '热辣娃',
                scovillain: '狠辣椒',
                tadbulb: '光蚪仔',
                bellibolt: '电肚蛙',
                varoom: '噗隆隆',
                revavroom: '普隆隆姆',
                orthworm: '拖拖蚓',
                tandemaus: '一对鼠',
                'maushold-family-of-four': '一家鼠-四只家庭',
                'maushold-family-of-three': '一家鼠-三只家庭',
                maushold: '一家鼠',
                cetoddle: '走鲸',
                cetitan: '浩大鲸',
                frigibax: '凉脊龙',
                arctibax: '冻脊龙',
                baxcalibur: '戟脊龙',
                'tatsugiri-droopy': '米立龙-下垂姿势',
                'tatsugiri-stretchy': '米立龙-平挺姿势',
                'tatsugiri-curly': '米立龙',
                cyclizar: '摩托蜥',
                pawmi: '布拨',
                pawmo: '布土拨',
                pawmot: '巴布土拨',
                wattrel: '电海燕',
                kilowattrel: '大电海燕',
                bombirdier: '下石鸟',
                flamigo: '缠红鹤',
                klawf: '毛崖蟹',
                nacli: '盐石宝',
                naclstack: '盐石垒',
                garganacl: '盐石巨灵',
                glimmet: '晶光芽',
                glimmora: '晶光花',
                shroodle: '滋汁鼹',
                grafaiai: '涂标客',
                fidough: '狗仔包',
                dachsbun: '麻花犬',
                maschiff: '偶叫獒',
                mabosstiff: '獒教父',
                bramblin: '纳噬草',
                brambleghast: '怖纳噬草',
                gimmighoul: '索财灵',
                gholdengo: '赛富豪',
                'great-tusk': '雄伟牙',
                'brute-bonnet': '猛恶菇',
                'sandy-shocks': '沙铁皮',
                'scream-tail': '吼叫尾',
                'flutter-mane': '振翼发',
                'slither-wing': '爬地翅',
                'roaring-moon': '轰鸣月',
                'iron-treads': '铁辙迹',
                'iron-moth': '铁毒蛾',
                'iron-hands': '铁臂膀',
                'iron-jugulis': '铁脖颈',
                'iron-thorns': '铁荆棘',
                'iron-bundle': '铁包袱',
                'iron-valiant': '铁武者',
                'ting-lu': '古鼎鹿',
                'chien-pao': '古剑豹',
                'wo-chien': '古简蜗',
                'chi-yu': '古玉鱼',
                koraidon: '故勒顿',
                miraidon: '密勒顿',
                tinkatink: '小锻匠',
                tinkatuff: '巧锻匠',
                tinkaton: '巨锻将',
                charcadet: '炭小侍',
                armarouge: '红莲铠骑',
                ceruledge: '苍炎刃鬼',
                toedscool: '原野水母',
                toedscruel: '陆地水母',
                kingambit: '仆刀将军',
                clodsire: '土王',
                annihilape: '弃世猴',
                'iron-leaves': '铁斑叶',
                'walking-wake': '波荡水',
                'raging-bolt': '猛雷鼓',
                archaludon: '铝钢桥龙',
                'gouging-fire': '破空焰',
                'iron-boulder': '铁磐岩',
                'iron-crown': '铁头壳',
                ogerpon: '厄诡椪',
                dipplin: '裹蜜虫',
                hydrapple: '蜜集大蛇',
                sinistcha: '来悲粗茶',
                poltchageist: '斯魔茶',
                fezandipiti: '吉稚鸡',
                munkidori: '愿增猿',
                okidogi: '够赞狗',
                pecharunt: '桃歹郎',
                terapagos: '太乐巴戈斯',
                'charizard-mega-x': '喷火龙-超级进化-x',
                'charizard-mega-y': '喷火龙-超级进化-y',
                'venusaur-mega': '妙蛙花-超级进化',
                'blastoise-mega': '水箭龟-超级进化',
                'beedrill-mega': '大针蜂-超级进化',
                'pidgeot-mega': '大比鸟-超级进化',
                'alakazam-mega': '胡地-超级进化',
                'slowbro-mega': '呆壳兽-超级进化',
                'gengar-mega': '耿鬼-超级进化',
                'kangaskhan-mega': '袋兽-超级进化',
                'pinsir-mega': '凯罗斯-超级进化',
                'gyarados-mega': '暴鲤龙-超级进化',
                'aerodactyl-mega': '化石翼龙-超级进化',
                'lopunny-mega': '长耳兔-超级进化',
                'garchomp-mega': '烈咬陆鲨-超级进化',
                'lucario-mega': '路卡利欧-超级进化',
                'abomasnow-mega': '暴雪王-超级进化',
                'gallade-mega': '艾路雷朵-超级进化',
                'rayquaza-mega': '烈空座-超级进化',
                'salamence-mega': '暴飞龙-超级进化',
                'metagross-mega': '巨金怪-超级进化',
                'latias-mega': '拉帝亚斯-超级进化',
                'latios-mega': '拉帝欧斯-超级进化',
                'banette-mega': '诅咒娃娃-超级进化',
                'absol-mega': '阿勃梭鲁-超级进化',
                'glalie-mega': '冰鬼护-超级进化',
                'gardevoir-mega': '沙奈朵-超级进化',
                'sableye-mega': '勾魂眼-超级进化',
                'mawile-mega': '大嘴娃-超级进化',
                'aggron-mega': '波士可多拉-超级进化',
                'medicham-mega': '恰雷姆-超级进化',
                'manectric-mega': '雷电兽-超级进化',
                'sharpedo-mega': '巨牙鲨-超级进化',
                'camerupt-mega': '喷火驼-超级进化',
                'altaria-mega': '七夕青鸟-超级进化',
                'houndoom-mega': '黑鲁加-超级进化',
                'tyranitar-mega': '班基拉斯-超级进化',
                'sceptile-mega': '蜥蜴王-超级进化',
                'blaziken-mega': '火焰鸡-超级进化',
                'swampert-mega': '巨沼怪-超级进化',
                'ampharos-mega': '电龙-超级进化',
                'steelix-mega': '大钢蛇-超级进化',
                'scizor-mega': '巨钳螳螂-超级进化',
                'heracross-mega': '赫拉克罗斯-超级进化',
                'mewtwo-mega-x': '超梦-超级进化-x',
                'mewtwo-mega-y': '超梦-超级进化-y',
                'audino-mega': '差不多娃娃-超级进化',
                'diancie-mega': '蒂安希-超级进化',
                'venusaur-gmax': '妙蛙花-超极巨化',
                'charizard-gmax': '喷火龙-超极巨化',
                'blastoise-gmax': '水箭龟-超极巨化',
                'butterfree-gmax': '巴大蝶-超极巨化',
                'cinderace-gmax': '闪焰王牌-超极巨化',
                'inteleon-gmax': '千面避役-超极巨化',
                'rillaboom-gmax': '轰擂金刚猩-超极巨化',
                'rattata-alola': '小拉达-阿罗拉',
                'raticate-alola': '拉达-阿罗拉',
                'raticate-alola-totem': '霸主拉达-阿罗拉',
                'pikachu-cosplay': '换装皮卡丘',
                'pikachu-rock-star': '硬摇滚皮卡丘',
                'pikachu-belle': '贵妇皮卡丘',
                'pikachu-pop-star': '偶像皮卡丘',
                'pikachu-phd': '博士皮卡丘',
                'pikachu-libre': '面罩摔角手皮卡丘',
                'pikachu-original-cap': '皮卡丘-初始帽子',
                'pikachu-hoenn-cap': '皮卡丘-丰缘帽子',
                'pikachu-sinnoh-cap': '皮卡丘-神奥帽子',
                'pikachu-unova-cap': '皮卡丘-合众帽子',
                'pikachu-world-cap': '皮卡丘-世界帽子',
                'pikachu-kalos-cap': '皮卡丘-卡洛斯帽子',
                'pikachu-alola-cap': '皮卡丘-阿罗拉帽子',
                'pikachu-partner-cap': '皮卡丘-就决定是你了之帽子',
                'pikachu-starter-cap': '搭档皮卡丘',
                'pikachu-gmax': '皮卡丘-超极巨化',
                'raichu-alola': '雷丘-阿罗拉',
                'sandshrew-alola': '穿山鼠-阿罗拉',
                'sandslash-alola': '穿山王-阿罗拉',
                'vulpix-alola': '六尾-阿罗拉',
                'ninetales-alola': '九尾-阿罗拉',
                'diglett-alola': '地鼠-阿罗拉',
                'dugtrio-alola': '三地鼠-阿罗拉',
                'meowth-alola': '喵喵-阿罗拉',
                'meowth-galar': '喵喵-伽勒尔',
                'meowth-gmax': '喵喵-超极巨化',
                'persian-alola': '猫老大-阿罗拉',
                'machamp-gmax': '怪力-超极巨化',
                'geodude-alola': '小拳石-阿罗拉',
                'graveler-alola': '隆隆石-阿罗拉',
                'golem-alola': '隆隆岩-阿罗拉',
                'ponyta-galar': '小火马-伽勒尔',
                'rapidash-galar': '烈焰马-伽勒尔',
                'farfetchd-galar': '大葱鸭-伽勒尔',
                'grimer-alola': '臭泥-阿罗拉',
                'muk-alola': '臭臭泥-阿罗拉',
                'gengar-gmax': '耿鬼-超极巨化',
                'kingler-gmax': '巨钳蟹-超极巨化',
                'exeggutor-alola': '椰蛋树-阿罗拉',
                'marowak-alola': '嘎啦嘎啦-阿罗拉',
                'marowak-alola-totem': '嘎啦嘎啦-阿罗拉-霸主',
                'weezing-galar': '双弹瓦斯-伽勒尔',
                'mr-mime-galar': '魔墙人偶-伽勒尔',
                'lapras-gmax': '拉普拉斯-超极巨化',
                'eevee-starter': '搭档伊布',
                'eevee-gmax': '伊布-超极巨化',
                'snorlax-gmax': '卡比兽-超极巨化',
                'urshifu-single-strike-gmax': '武道熊师一击流-超极巨化',
                'urshifu-rapid-strike-gmax': '武道熊师连击流-超极巨化',
                'pichu-spikey-eared': '刺刺耳皮丘',
                'corsola-galar': '太阳珊瑚-伽勒尔',
                'zigzagoon-galar': '蛇纹熊-伽勒尔',
                'linoone-galar': '直冲熊-伽勒尔',
                'castform-sunny': '飘浮泡泡-太阳',
                'castform-rainy': '飘浮泡泡-雨水',
                'castform-snowy': '飘浮泡泡-雪云',
                'kyogre-primal': '盖欧卡-原始回归',
                'groudon-primal': '固拉多-原始回归',
                'wormadam-sandy': '结草贵妇-沙土蓑衣',
                'wormadam-trash': '结草贵妇-垃圾蓑衣',
                'cherrim-sunshine': '樱花儿-晴天形态',
                'rotom-heat': '加热洛托姆',
                'rotom-wash': '清洗洛托姆',
                'rotom-frost': '结冰洛托姆',
                'rotom-fan': '旋转洛托姆',
                'rotom-mow': '切割洛托姆',
                'shaymin-sky': '谢米-天空形态',
                'arceus-bug': '阿尔宙斯-虫属性',
                'arceus-dark': '阿尔宙斯-恶属性',
                'arceus-dragon': '阿尔宙斯-龙属性',
                'arceus-electric': '阿尔宙斯-电属性',
                'arceus-fairy': '阿尔宙斯-妖精属性',
                'arceus-fighting': '阿尔宙斯-格斗属性',
                'arceus-fire': '阿尔宙斯-火属性',
                'arceus-flying': '阿尔宙斯-飞行属性',
                'arceus-ghost': '阿尔宙斯-幽灵属性',
                'arceus-grass': '阿尔宙斯-草属性',
                'arceus-ground': '阿尔宙斯-地面属性',
                'arceus-ice': '阿尔宙斯-冰属性',
                'arceus-poison': '阿尔宙斯-毒属性',
                'arceus-psychic': '阿尔宙斯-超能力属性',
                'arceus-rock': '阿尔宙斯-岩石属性',
                'arceus-steel': '阿尔宙斯-钢属性',
                'arceus-water': '阿尔宙斯-水属性',
                'darumaka-galar': '火红不倒翁-伽勒尔',
                'darmanitan-galar-zen': '达摩狒狒-伽勒尔-达摩模式',
                'darmanitan-galar-standard': '达摩狒狒-伽勒尔',
                'yamask-galar': '哭哭面具-伽勒尔',
                'garbodor-gmax': '灰尘山-超极巨化',
                'stunfisk-galar': '泥巴鱼-伽勒尔',
                'keldeo-resolute': '凯路迪欧-觉悟',
                'meloetta-pirouette': '美洛耶塔-舞步形态',
                'genesect-douse': '盖诺赛克特-水流卡带',
                'genesect-shock': '盖诺赛克特-闪电卡带',
                'genesect-burn': '盖诺赛克特-火焰卡带',
                'genesect-chill': '盖诺赛克特-冰冻卡带',
                'vivillon-fancy': '彩粉蝶-花纹',
                'vivillon-pokeball': '菜粉蝶-球球花纹',
                'floette-eternal': '花叶蒂-永恒之花',
                'meowstic-f': '超能妙喵-雌性的样子',
                'oinkologne-f': '飘香豚-雌性的样子',
                'basculegion-f': '幽尾玄鱼-雌性的样子',
                'indeedee-f': '爱管侍-雌性的样子',
                'zoroark-hisui': '索罗亚克-洗翠',
                'arcanine-hisui': '风速狗-洗翠',
                'electrode-hisui': '顽皮雷弹-洗翠',
                'avalugg-hisui': '冰岩怪-洗翠',
                'braviary-hisui': '勇士雄鹰-洗翠',
                'decidueye-hisui': '狙射树枭-洗翠',
                'goodra-hisui': '黏美龙-洗翠',
                'growlithe-hisui': '卡蒂狗-洗翠',
                'lilligant-hisui': '裙儿小姐-洗翠',
                'qwilfish-hisui': '千针鱼-洗翠',
                'samurott-hisui': '大剑鬼-洗翠',
                'sliggoo-hisui': '黏美儿-洗翠',
                'sneasel-hisui': '狃拉-洗翠',
                'typhlosion-hisui': '火暴兽-洗翠',
                'voltorb-hisui': '霹雳电球-洗翠',
                'zorua-hisui': '索罗亚-洗翠',
                'wooper-paldea': '乌波-帕底亚',
                'aegislash-blade': '坚盾剑怪-刀剑形态',
                'pumpkaboo-small': '南瓜精-小尺寸',
                'pumpkaboo-large': '南瓜精-大尺寸',
                'pumpkaboo-super': '南瓜精-特大尺寸',
                'gourgeist-small': '南瓜怪人-小尺寸',
                'gourgeist-large': '南瓜怪人-大尺寸',
                'gourgeist-super': '南瓜怪人-特大尺寸',
                'hoopa-unbound': '解放胡帕',
                'gumshoos-totem': '猫鼬探长-霸主',
                'vikavolt-totem': '锹农炮虫-霸主',
                'ribombee-totem': '蝶结萌虻-霸主',
                'wishiwashi-school': '弱丁鱼-鱼群',
                'araquanid-totem': '霸主滴蛛霸',
                'lurantis-totem': '霸主兰螳花',
                'salazzle-totem': '霸主焰后蜥',
                'silvally-bug': '银伴战兽-虫子',
                'silvally-dark': '银伴战兽-黑暗',
                'silvally-dragon': '银伴战兽-龙',
                'silvally-electric': '银伴战兽-电子',
                'silvally-fairy': '银伴战兽-妖精',
                'silvally-fighting': '银伴战兽-战斗',
                'silvally-fire': '银伴战兽-火焰',
                'silvally-flying': '银伴战兽-飞翔',
                'silvally-ghost': '银伴战兽-幽灵',
                'silvally-grass': '银伴战兽-青草',
                'silvally-ground': '银伴战兽-大地',
                'silvally-ice': '银伴战兽-冰雪',
                'silvally-poison': '银伴战兽-毒',
                'silvally-psychic': '银伴战兽-精神',
                'silvally-rock': '银伴战兽-岩石',
                'silvally-steel': '银伴战兽-钢铁',
                'silvally-water': '银伴战兽-清水',
                'minior-meteor': '小陨星-流星',
                'togedemaru-totem': '托戈德玛尔-霸主',
                'mimikyu-busted': '谜拟Q-现形',
                'mimikyu-totem': '谜拟Q-霸主',
                'mimikyu-busted-totem': '谜拟Q-霸主-现形',
                'kommo-o-totem': '杖尾鳞甲龙-霸主',
                'necrozma-dusk': '奈克洛兹玛-黄昏之鬃',
                'necrozma-dawn': '奈克洛兹玛-拂晓之翼',
                'necrozma-ultra': '究极奈克洛兹玛',
                'magearna-original': '玛机雅娜-500年前的颜色',
                'melmetal-gmax': '美录梅塔-超极巨化',
                'corviknight-gmax': '钢铠鸦-超极巨化',
                'orbeetle-gmax': '以欧路普-超极巨化',
                'drednaw-gmax': '暴噬龟-超极巨化',
                'coalossal-gmax': '巨炭山-超极巨化',
                'flapple-gmax': '苹裹龙-超极巨化',
                'appletun-gmax': '丰蜜龙-超极巨化',
                'sandaconda-gmax': '沙螺蟒-超极巨化',
                'cramorant-gulping': '古月鸟-一口吞',
                'cramorant-gorging': '古月鸟-大口吞',
                'toxtricity-gmax': '颤弦蝾螈-超极巨化',
                'toxtricity-low-key-gmax': '颤弦蝾螈-低调形态-超极巨化',
                'centiskorch-gmax': '焚焰蚣-超极巨化',
                'hatterene-gmax': '布莉姆温-超极巨化',
                'grimmsnarl-gmax': '长毛巨魔-超极巨化',
                'alcremie-gmax': '霜奶仙-超极巨化',
                'eiscue-noice': '冰砌鹅-解冻形态',
                'morpeko-hangry': '莫鲁贝可-空腹花纹',
                'copperajah-gmax': '大王铜象-超极巨化',
                'duraludon-gmax': '铝钢龙-超极巨化',
                'darmanitan-zen': '达摩狒狒-达摩模式',
                'raticate-totem-alola': '拉达-阿罗拉-霸主',
                'mimikyu-totem-disguised': '谜拟Q-画皮-霸主',
                'mimikyu-totem-busted': '谜拟Q-击倒-霸主',
                'rockruff-own-tempo': '岩狗狗-我行我素',
                'gimmighoul-roaming': '索财灵-徒步形态',
                'ursaluna-bloodmoon': '月月熊-赫月',
                'ogerpon-cornerstone-mask': '厄诡椪-础石',
                'ogerpon-wellspring-mask': '厄诡椪-水井',
                'ogerpon-hearthflame-mask': '厄诡椪-火灶',
                'terapagos-stellar': '太乐巴戈斯-星晶形态',
                'terapagos-terastal': '太乐巴戈斯-太晶形态',
                'tauros-paldea-combat-breed': '肯泰罗-帕底亚-斗战种',
                'tauros-paldea-blaze-breed': '肯泰罗-帕底亚-火炽种',
                'tauros-paldea-aqua-breed': '肯泰罗-帕底亚-水澜种',
                arceus: '阿尔宙斯'
            },
            pokemonegg: {},
            pokemoneggLoaded: false,
            typenames: {
                fire: '火',
                grass: '草',
                electric: '电',
                water: '水',
                ground: '地面',
                rock: '岩石',
                fairy: '妖精',
                poison: '毒',
                bug: '虫',
                dragon: '龙',
                psychic: '超能',
                flying: '飞行',
                fighting: '格斗',
                normal: '普通',
                ghost: '幽灵',
                steel: '钢',
                ice: '冰',
                dark: '恶'
            },
            typecolors: {
                fire: '#ff927d',
                grass: '#bdffa3',
                electric: '#ffcc33',
                water: '#77bbff',
                ground: '#f1dda0',
                rock: '#e1d08c',
                fairy: '#fbcbfb',
                poison: '#c689ba',
                bug: '#daec44',
                dragon: '#a194ff',
                psychic: '#ff9cc4',
                flying: '#99bbff',
                fighting: '#dd9988',
                normal: '#e7e7d8',
                ghost: '#9f9fec',
                steel: '#dfdfe1',
                ice: '#dbf6ff',
                dark: '#bda396'
            },
            statsChartInstance: null,
            radarChartInstance: null,
            baseStatsTotal: 0 // 新增变量存储种族值总和
        }
    },

    async created() {
        try {
            const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
            this.pokemonshow = pokemonRes.data

            try {
                const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.$route.params.id}`)
                this.pokemonegg = speciesRes.data
                // 计算种族值总和

                this.pokemoneggLoaded = true
            } catch (error) {
                console.error('Error fetching species data:', error)
                this.pokemoneggLoaded = false // 标记为已加载，但可能为空
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            this.pokemoneggLoaded = false
        }
        this.initStatsChart()
        this.initRadarChart()
        this.calculateBaseStatsTotal()
    },
    methods: {
        calculateBaseStatsTotal() {
            // 计算种族值总和
            this.baseStatsTotal = this.pokemonshow.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
        },
        getName(name) {
            return this.pokemonname[name] || name
        },
        divideByTenAndRound(num) {
            // 将数字除以 10
            const result = num / 10
            // 保留一位小数
            const roundedResult = parseFloat(result.toFixed(1))
            return roundedResult
        },
        getTypeName(name) {
            return this.typenames[name] || name
        },
        initStatsChart() {
            this.statsChartInstance = echarts.init(document.getElementById('statsChart'))

            const option = {
                backgroundColor: 'transparent', // 使用透明背景
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            backgroundColor: 'rgba(255,255,255,0.8)' // 提高提示框可读性
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                    borderColor: '#444', // 设置网格边框颜色
                    borderWidth: 1 // 设置网格边框宽度
                },
                xAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#aaa' // 提高 X 轴线条可见度
                        }
                    },
                    axisLabel: {
                        color: '#bbb' // 提高 X 轴标签可见度
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#444'] // 设置分割线颜色
                        }
                    },
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: [
                        'HP', 'Attack', 'Defense',
                        'Sp. Attack', 'Sp. Defense', 'Speed'
                    ],
                    axisLine: {
                        lineStyle: {
                            color: '#aaa' // 提高 Y 轴线条可见度
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#666' // 提高 Y 轴刻度线可见度
                        }
                    },
                    axisLabel: {
                        color: '#bbb' // 提高 Y 轴标签可见度
                    }
                },
                series: [
                    {
                        name: '种族值',
                        type: 'bar',
                        barWidth: '60%',
                        itemStyle: {
                            color: function (params) {
                                // 根据不同的种族值设置不同的颜色
                                const colorList = ['#87CEFA', '#FFA07A', '#90EE90', '#FFD700', '#ADD8E6', '#FFC0CB']
                                return colorList[params.dataIndex]
                            }
                        },
                        label: {
                            show: true,
                            position: 'right',
                            color: '#fff', // 设置标签文字颜色为白色
                            fontSize: 12 // 设置字体大小
                        },
                        data: this.pokemonshow.stats.map(stat => stat.base_stat)
                    }
                ]
            }

            this.statsChartInstance.setOption(option)
        },
        initRadarChart() {
            const baseStats = this.pokemonshow.stats.map(stat => stat.base_stat)

            // 计算最大能力值
            const maxStats = baseStats.map(stat => {
                if (stat.name === 'hp') {
                    return Math.floor(stat * 2 + 204)
                } else {
                    return Math.floor((stat * 2 + 99) * 1.1)
                }
            })

            // 计算最小能力值
            const minStats = baseStats.map(stat => {
                if (stat.name === 'hp') {
                    return Math.floor(stat * 2 + 110)
                } else {
                    return Math.floor((stat * 2 + 5) * 0.9)
                }
            })

            this.radarChartInstance = echarts.init(document.getElementById('radarChart'))

            const radarOption = {
                backgroundColor: 'transparent', // 使用透明背景
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255,255,255,0.8)' // 提高提示框可读性
                },
                radar: {
                    name: {
                        textStyle: {
                            color: '#bbb',
                            backgroundColor: 'transparent',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: 'HP', max: 700 }, // 每格100，共7格
                        { name: 'Attack', max: 500 },
                        { name: 'Defense', max: 500 },
                        { name: 'Sp. Attack', max: 500 },
                        { name: 'Sp. Defense', max: 500 },
                        { name: 'Speed', max: 500 }
                    ],
                    center: ['50%', '50%'], // 雷达图的位置
                    radius: '60%', // 雷达图的大小
                    splitNumber: 7, // 每格100
                    axisLine: {
                        lineStyle: {
                            color: '#aaa' // 提高雷达图线条可见度
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)']
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#444' // 设置分割线颜色
                        }
                    }
                },
                series: [
                    {
                        name: '能力值范围',
                        type: 'radar',
                        itemStyle: {
                            normal: {
                                color: '#f00', // 最大值填充颜色
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 10
                            },
                            emphasis: {
                                color: '#ff0' // 鼠标悬停时的颜色
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(255,0,0,0.3)' // 颜色渐变
                                    }, {
                                        offset: 1, color: 'rgba(255,0,0,0)' // 颜色渐变
                                    }],
                                    globalCoord: false
                                },
                                opacity: 0.8
                            }
                        },
                        data: [
                            {
                                value: maxStats,
                                name: '最大能力值',
                                symbolSize: 8,
                                label: {
                                    show: true,
                                    position: 'top',
                                    color: '#fff', // 设置标签文字颜色为白色
                                    fontSize: 12 // 设置字体大小
                                }
                            },
                            {
                                value: minStats,
                                name: '最小能力值',
                                symbolSize: 8,
                                label: {
                                    show: true,
                                    position: 'bottom',
                                    color: '#fff', // 设置标签文字颜色为白色
                                    fontSize: 12 // 设置字体大小
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#00f' // 最小值填充颜色
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: 'rgba(0,0,255,0.3)'
                                            }, {
                                                offset: 1, color: 'rgba(0,0,255,0)'
                                            }],
                                            globalCoord: false
                                        },
                                        opacity: 0.8
                                    }
                                }
                            }
                        ]
                    }
                ]
            }

            this.radarChartInstance.setOption(radarOption)
        }
    }
}
</script>

<style scoped>
.btop {
    margin: auto;
    height: 50px;
    width: 1500px;
    background-color: rgb(14, 33, 77);
}

.ba {
    margin: auto;
    width: 1500px;
    height: 800px;
    background-color: rgb(14, 33, 77);

}

.bb {
    color: lightskyblue;
    font-style: normal;
    font-weight: 500;
    font-size: 40px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 800px;
    height: 40px;
    z-index: 3;
}

.bc {
    color: white;
    text-shadow: 2px 2px 20px black;
    font-style: normal;
    font-weight: 500;
    font-size: 50px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: absolute;
    top: 40px;
    left: 0px;
    width: 800px;
    height: 60px;
    z-index: 3;
}

.bd {
    width: 800px;
    height: 800px;
    margin: auto;
    float: left;
    position: relative;

}

.be {
    width: 400px;
    height: 800px;
    background-color: rgb(14, 33, 77);
    float: left;
}

.bf {
    width: 300px;
    height: 800px;
    background-color: rgb(14, 33, 77);
    float: left;
}

.bg {
    width: 400px;
    height: 400px;
}

.bh {
    width: 400px;
    height: 400px
}

.bi {
    width: 400px;
    height: 400px;
    position: relative;
}

.bq {
    width: 100%;
    animation-name: spin;
    animation-duration: 2s;
    /* 动画持续时间 */
    animation-iteration-count: infinite;
    /* 无限循环 */
    animation-timing-function: linear;
    /* 匀速旋转 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.br {
    width: 300px;
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 1;
}

.bs {
    width: 350px;
    position: absolute;
    top: 25px;
    left: 25px;
    z-index: 2;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.bj {
    width: 100%;
    animation-name: spin;
    animation-duration: 2s;
    /* 动画持续时间 */
    animation-iteration-count: infinite;
    /* 无限循环 */
    animation-timing-function: linear;
    /* 匀速旋转 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.bo {
    width: 600px;
    position: absolute;
    top: 100px;
    left: 100px;
    z-index: 1;
}

.bp {
    width: 700px;
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 2;
}

.bl {
    width: 300px;
    height: 100px;
}

.bm {
    height: 50px;
    width: 300px;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    font-family: 'Arial Narrow', Arial, sans-serif;
    color: lightskyblue;

}

.bn {
    height: 50px;
    width: 300px;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    font-family: 'Arial Narrow', Arial, sans-serif;
    color: white;

}

.bt {
    width: 300px;
}

.bk {
    color: hotpink;
}

.bv {
    margin: auto;
    width: 1500px;
    height: 750px;
    background-color: rgb(14, 33, 77);
    position: relative;
}

.bu {
    float: left;
    text-align: center;
    margin-right: 30px;
    border: none;
    border-radius: 10px;
    height: 30px;
    width: 100px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    font-family: 'Arial Narrow', Arial, sans-serif;
    color: black;

}

.bw {
    height: 50px;
    width: 300px;
}

.bv {
    position: relative;
    width: 1500px;
    height: 1000px;
    /* 调整高度以适应两个图表的高度 */
}

.by {
    position: absolute;
    top: 0;
    left: 0;
}

.by-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 750px;
    text-align: center;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    font-family: 'Arial Narrow', Arial, sans-serif;
    color: #333;
    background-color: rgba(255, 255, 255, 0.8);
    /* 背景颜色 */
    padding: 10px;
    /* 内边距 */
    z-index: 1;
    /* 确保标题在图表之上 */
}

.bx {
    position: absolute;
    top: 400px;
    left: 150px;
    width: 500px;
    height: 250px;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    font-family: 'Arial Narrow', Arial, sans-serif;
    color: lightskyblue;
    text-align: center;
    line-height: 250px;
    /* 居中文本 */
    z-index: 1;
    /* 确保文本在图表之上 */
}

.bz {
    position: absolute;
    top: 0;
    left: 750px;
}

.bz-title {
    position: absolute;
    top: 0;
    left: 750px;
    width: 750px;
    text-align: center;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    font-family: 'Arial Narrow', Arial, sans-serif;
    color: #333;
    background-color: rgba(255, 255, 255, 0.8);
    /* 背景颜色 */
    padding: 10px;
    /* 内边距 */
    z-index: 1;
    /* 确保标题在图表之上 */
}
</style>
