<template>
    <div>
        <table class="type-chart">
            <thead>
                <tr>
                    <th>
                        攻击\防御
                    </th>
                    <template v-for="type of types">
                        <th :key="type">{{ type }}</th> <!-- 这些是防御属性 -->
                    </template>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, attackType) in chart" :key="attackType">
                    <th>{{ attackType }}</th> <!-- 这些是攻击属性 -->
                    <template v-for="defendType in types">
                        <td :key="`${attackType}-${defendType}`" :class="effectivenessClass(row[defendType])">
                            {{ row[defendType] }}
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>

        <h3>选择精灵属性：</h3>
        <el-button v-for="type in types" :key="type" :type="buttonType(type)"
            :class="{ selected: selectedTypes.includes(type) }" @click="toggleSelectType(type)">
            {{ type }}
        </el-button>
        <h3>已选属性：</h3>
        <p v-if="selectedTypes.length > 0">
            {{ selectedTypes.join(' 和 ') }}
        </p>
        <h3>相克关系：</h3>
        <ul>
            <li v-if="superEffective.length > 0">4倍抵抗：<span v-for="type in superEffective" :key="type">{{ type
                    }}&nbsp;</span>
            </li>
            <li v-if="effective.length > 0">2倍抵抗：<span v-for="type in effective" :key="type">{{ type }}&nbsp;</span>
            </li>
            <li v-if="notVeryEffective.length > 0">2倍克制：<span v-for="type in notVeryEffective" :key="type">{{ type
                    }}&nbsp;</span></li>
            <li v-if="superEffectiveAttack.length > 0">4倍克制：<span v-for="type in superEffectiveAttack" :key="type">{{
                type
                    }}&nbsp;</span></li>
            <li v-if="noEffect.length > 0">无效：<span v-for="type in noEffect" :key="type">{{ type }}&nbsp;</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'AttributeRestraint',
    data() {
        return {
            types: [
                '普通', '格斗', '飞行', '毒', '地面', '岩石', '虫', '幽灵', '钢', '火', '水', '草', '电', '超能', '冰', '龙', '恶', '妖精'
            ],
            chart: {
                普通: {
                    普通: '*1', 格斗: '*1', 飞行: '*1', 毒: '*1', 地面: '*1', 岩石: '*0.5', 虫: '*1', 幽灵: '*0', 钢: '*0.5', 火: '*1', 水: '*1', 草: '*1', 电: '*1', 超能: '*1', 冰: '*1', 龙: '*1', 恶: '*1', 妖精: '*1'
                },
                格斗: {
                    普通: '*2', 格斗: '*1', 飞行: '*0.5', 毒: '*0.5', 地面: '*1', 岩石: '*2', 虫: '*0.5', 幽灵: '*0', 钢: '*2', 火: '*1', 水: '*1', 草: '*1', 电: '*1', 超能: '*0.5', 冰: '*2', 龙: '*1', 恶: '*2', 妖精: '*0.5'
                },
                飞行: {
                    普通: '*1', 格斗: '*2', 飞行: '*1', 毒: '*1', 地面: '*1', 岩石: '*0.5', 虫: '*2', 幽灵: '*1', 钢: '*0.5', 火: '*1', 水: '*1', 草: '*2', 电: '*0.5', 超能: '*1', 冰: '*1', 龙: '*1', 恶: '*1', 妖精: '*1'
                },
                毒: {
                    普通: '*1', 格斗: '*1', 飞行: '*1', 毒: '*0.5', 地面: '*0.5', 岩石: '*0.5', 虫: '*1', 幽灵: '*0.5', 钢: '*0', 火: '*1', 水: '*1', 草: '*2', 电: '*1', 超能: '*1', 冰: '*1', 龙: '*1', 恶: '*1', 妖精: '*2'
                },
                地面: {
                    普通: '*1', 格斗: '*1', 飞行: '*0', 毒: '*2', 地面: '*1', 岩石: '*2', 虫: '*0.5', 幽灵: '*1', 钢: '*2', 火: '*2', 水: '*1', 草: '*0.5', 电: '*2', 超能: '*1', 冰: '*1', 龙: '*1', 恶: '*1', 妖精: '*1'
                },
                岩石: {
                    普通: '*1', 格斗: '*0.5', 飞行: '*2', 毒: '*1', 地面: '*0.5', 岩石: '*1', 虫: '*2', 幽灵: '*1', 钢: '*0.5', 火: '*2', 水: '*1', 草: '*1', 电: '*1', 超能: '*1', 冰: '*2', 龙: '*1', 恶: '*1', 妖精: '*1'
                },
                虫: {
                    普通: '*1', 格斗: '*0.5', 飞行: '*0.5', 毒: '*0.5', 地面: '*1', 岩石: '*1', 虫: '*1', 幽灵: '*0.5', 钢: '*0.5', 火: '*0.5', 水: '*1', 草: '*2', 电: '*1', 超能: '*2', 冰: '*1', 龙: '*1', 恶: '*2', 妖精: '*0.5'
                },
                幽灵: {
                    普通: '*0', 格斗: '*1', 飞行: '*1', 毒: '*1', 地面: '*1', 岩石: '*1', 虫: '*1', 幽灵: '*2', 钢: '*1', 火: '*1', 水: '*1', 草: '*1', 电: '*1', 超能: '*2', 冰: '*1', 龙: '*1', 恶: '*0.5', 妖精: '*1'
                },
                钢: {
                    普通: '*1', 格斗: '*1', 飞行: '*1', 毒: '*1', 地面: '*1', 岩石: '*2', 虫: '*1', 幽灵: '*1', 钢: '*0.5', 火: '*0.5', 水: '*0.5', 草: '*1', 电: '*0.5', 超能: '*1', 冰: '*2', 龙: '*1', 恶: '*1', 妖精: '*2'
                },
                火: {
                    普通: '*1', 格斗: '*1', 飞行: '*1', 毒: '*1', 地面: '*1', 岩石: '*0.5', 虫: '*2', 幽灵: '*1', 钢: '*2', 火: '*0.5', 水: '*0.5', 草: '*2', 电: '*1', 超能: '*1', 冰: '*2', 龙: '*0.5', 恶: '*1', 妖精: '*1'
                },
                水: {
                    普通: '*1', 格斗: '*1', 飞行: '*1', 毒: '*1', 地面: '*2', 岩石: '*2', 虫: '*1', 幽灵: '*1', 钢: '*1', 火: '*2', 水: '*0.5', 草: '*0.5', 电: '*1', 超能: '*1', 冰: '*1', 龙: '*0.5', 恶: '*1', 妖精: '*1'
                },
                草: {
                    普通: '*1', 格斗: '*1', 飞行: '*0.5', 毒: '*0.5', 地面: '*2', 岩石: '*2', 虫: '*0.5', 幽灵: '*1', 钢: '*0.5', 火: '*0.5', 水: '*2', 草: '*0.5', 电: '*1', 超能: '*1', 冰: '*1', 龙: '*0.5', 恶: '*1', 妖精: '*1'
                },
                电: {
                    普通: '*1', 格斗: '*1', 飞行: '*2', 毒: '*1', 地面: '*0', 岩石: '*1', 虫: '*1', 幽灵: '*1', 钢: '*1', 火: '*1', 水: '*2', 草: '*0.5', 电: '*0.5', 超能: '*1', 冰: '*1', 龙: '*0.5', 恶: '*1', 妖精: '*1'
                },
                超能: {
                    普通: '*1', 格斗: '*2', 飞行: '*1', 毒: '*2', 地面: '*1', 岩石: '*1', 虫: '*1', 幽灵: '*1', 钢: '*0.5', 火: '*1', 水: '*1', 草: '*1', 电: '*1', 超能: '*0.5', 冰: '*1', 龙: '*1', 恶: '*0', 妖精: '*1'
                },
                冰: {
                    普通: '*1', 格斗: '*1', 飞行: '*2', 毒: '*1', 地面: '*2', 岩石: '*1', 虫: '*1', 幽灵: '*1', 钢: '*0.5', 火: '*0.5', 水: '*0.5', 草: '*2', 电: '*1', 超能: '*1', 冰: '*0.5', 龙: '*2', 恶: '*1', 妖精: '*1'
                },
                龙: {
                    普通: '*1', 格斗: '*1', 飞行: '*1', 毒: '*1', 地面: '*1', 岩石: '*1', 虫: '*1', 幽灵: '*1', 钢: '*0.5', 火: '*1', 水: '*1', 草: '*1', 电: '*1', 超能: '*1', 冰: '*1', 龙: '*2', 恶: '*1', 妖精: '*0'
                },
                恶: {
                    普通: '*1', 格斗: '*0.5', 飞行: '*1', 毒: '*1', 地面: '*1', 岩石: '*1', 虫: '*1', 幽灵: '*2', 钢: '*1', 火: '*1', 水: '*1', 草: '*1', 电: '*1', 超能: '*2', 冰: '*1', 龙: '*1', 恶: '*0.5', 妖精: '*0.5'
                },
                妖精: {
                    普通: '*1', 格斗: '*2', 飞行: '*1', 毒: '*0.5', 地面: '*1', 岩石: '*1', 虫: '*1', 幽灵: '*1', 钢: '*0.5', 火: '*0.5', 水: '*1', 草: '*1', 电: '*1', 超能: '*1', 冰: '*1', 龙: '*2', 恶: '*2', 妖精: '*1'
                }
            },
            selectedTypes: [], // 用户选择的类型
            superEffective: [], // 4倍抵抗
            effective: [], // 2倍抵抗
            notVeryEffective: [], // 2倍克制
            superEffectiveAttack: [], // 4倍克制
            noEffect: []// 无效果
        }
    },
    methods: {
        effectivenessClass(effectiveness) {
            let className = ''
            if (effectiveness === '*2') {
                className = 'super-effective'
            } else if (effectiveness === '*0.5') {
                className = 'not-very-effective'
            } else if (effectiveness === '*0') {
                className = 'no-effect'
            }
            return className
        },
        buttonType(type) {
            // 根据类型返回不同的按钮颜色
            const colorMap = {
                普通: 'primary',
                格斗: 'primary',
                飞行: 'primary',
                毒: 'primary',
                地面: 'primary',
                岩石: 'primary',
                虫: 'primary',
                幽灵: 'primary',
                钢: 'primary',
                火: 'primary',
                水: 'primary',
                草: 'primary',
                电: 'primary',
                超能: 'primary',
                冰: 'primary',
                龙: 'primary',
                恶: 'primary',
                妖精: 'primary'
            }
            return colorMap[type] || 'primary'
        },
        toggleSelectType(type) {
            const index = this.selectedTypes.indexOf(type)
            if (index === -1) {
                if (this.selectedTypes.length < 2) {
                    this.selectedTypes.push(type)
                }
            } else {
                this.selectedTypes.splice(index, 1)
            }
            if (this.selectedTypes.length >= 2) {
                this.calculateRelations()
            } else {
                this.resetRelations()
            }
        },
        calculateRelations() {
            this.superEffective = []
            this.effective = []
            this.notVeryEffective = []
            this.superEffectiveAttack = []
            this.noEffect = []

            const combinedEffectiveness = {}

            // 计算每个攻击属性对所有选定防御属性的效果
            this.selectedTypes.forEach(selectedType => {
                this.types.forEach(attackType => {
                    const effectiveness = this.chart[attackType][selectedType]

                    if (!combinedEffectiveness[attackType]) {
                        combinedEffectiveness[attackType] = {}
                    }

                    // 如果任何一个防御属性对攻击属性无效，则整体无效
                    if (effectiveness === '*0') {
                        combinedEffectiveness[attackType].invalid = true
                    } else {
                        if (!combinedEffectiveness[attackType].invalid) {
                            if (effectiveness === '*2') {
                                combinedEffectiveness[attackType].effect = (combinedEffectiveness[attackType].effect || 1) * 2
                            } else if (effectiveness === '*0.5') {
                                combinedEffectiveness[attackType].effect = (combinedEffectiveness[attackType].effect || 1) / 2
                            }
                        }
                    }
                })
            })

            // 根据最终计算结果分类
            Object.keys(combinedEffectiveness).forEach(attackType => {
                if (combinedEffectiveness[attackType].invalid) {
                    this.noEffect.push(attackType) // 无效
                } else {
                    const value = combinedEffectiveness[attackType].effect || 1

                    if (value === 4) {
                        this.superEffectiveAttack.push(attackType) // 4倍克制
                    } else if (value === 2) {
                        this.notVeryEffective.push(attackType) // 2倍克制
                    } else if (value === 0.25) {
                        this.superEffective.push(attackType) // 4倍抵抗
                    } else if (value === 0.5) {
                        this.effective.push(attackType) // 2倍抵抗
                    }
                }
            })
        },
        resetRelations() {
            this.superEffective = []
            this.effective = []
            this.notVeryEffective = []
            this.superEffectiveAttack = []
            this.noEffect = []
        }
    }
}
</script>

<style scoped>
.type-chart {
    border-collapse: collapse;
    width: 100%;
}

.type-chart th,
.type-chart td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.type-chart th {
    background-color: #f2f2f2;
}

.type-chart .super-effective {
    background-color: lightgreen;
}

.type-chart .not-very-effective {
    background-color: lightcoral;
}

.type-chart .no-effect {
    background-color: lightgray;
}

.el-button {
    margin: 5px;
}

.selected {
    font-weight: bold;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

ul {
    list-style-type: none;
    padding-left: 0;
}
</style>
