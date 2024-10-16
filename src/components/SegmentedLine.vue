<template>
    <div class="g">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SegmentedLine'
}
</script>

<style scoped>
.g {
    width: 1300px;
    height: 40px;
    margin: auto;
    font-weight: 900;
    font-size: 30px;
    color: darkslateblue;
    border-bottom: 3px solid lightsteelblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-shadow: 5px 5px 6px rgba(0, 0, 0, .3);
}
</style>
