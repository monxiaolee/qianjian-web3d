<template>
    <div class="parkWrapper"></div>
</template>
<script>
import Experience from './Experience.js'
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        this.$nextTick(() => {
            window.experience = new Experience({
                targetElemnt: document.querySelector('.parkWrapper')
            })
        })
    }
}
</script>
<style lang="scss" scoped></style>