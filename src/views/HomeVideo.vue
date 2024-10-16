<template>
    <div>
        <DividingLine></DividingLine>
        <CarouselImage></CarouselImage>
        <DividingLine></DividingLine>
        <SegmentedLine id="e">剧场版大全</SegmentedLine>
        <DividingLine></DividingLine>
        <TheaterVersion></TheaterVersion>
        <DividingLine></DividingLine>
        <DividingLine></DividingLine>
        <SegmentedLine id="d">神兽大全</SegmentedLine>
        <DividingLine></DividingLine>
        <MythicalAnimals></MythicalAnimals>
        <SegmentedLine id="a">宝可梦番剧</SegmentedLine>
        <DividingLine></DividingLine>
        <DramaSeries></DramaSeries>
        <DividingLine></DividingLine>
        <SegmentedLine id="b">mega精灵大盘点</SegmentedLine>
        <DividingLine></DividingLine>
        <SuperevolvedElves></SuperevolvedElves>
        <DividingLine></DividingLine>
    </div>
</template>

<script>
import CarouselImage from '@/components/CarouselImage.vue'
import DividingLine from '@/components/DividingLine.vue'
import DramaSeries from '@/components/DramaSeries.vue'
import MythicalAnimals from '@/components/MythicalAnimals.vue'
import SegmentedLine from '@/components/SegmentedLine.vue'
import SuperevolvedElves from '@/components/SuperevolvedElves.vue'
import TheaterVersion from '@/components/TheaterVersion.vue'

export default {
    name: 'HomeVideo',
    components: {
        DividingLine,
        CarouselImage,
        SegmentedLine,
        TheaterVersion,
        DramaSeries,
        SuperevolvedElves,
        MythicalAnimals
    }
}
</script>

<style></style>
