<template>
  <div class="">西直门的城市模型</div>
</template>

<script>
export default {
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
            width: ''
        }
    },
    mounted() {
        this.width = window.innerWidth
        this.height = window.innerHeight

        // 摄像机
        this.camera = new PerspectiveCamera(45,
            this.width / this.height,
            1,
            2000)

        this.camera.position.z = 70;
        this.camera.position.x = 50;
        this.camera.position.y = 10;

        // 场景
        this.scene = new THREE.Scene();

        // 灯光
        // 初始化灯光
        // 环境光 能保持整体都是亮点
        let ambientLight = new THREE.AmbientLight(0x404040)
        // 点光源 就像灯泡一样的效果  白色灯光 亮度0.6
        let pointLight = new THREE.PointLight(0xffffff, 0.6);

    },
    methods: {}
};
</script>

<style lang="less" scoped>
</style>