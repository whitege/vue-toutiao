<template>
    <div>
        <span>这是登录页面</span>
        <button v-on:click="login">登录</button>
    </div>
</template>
<script>
export default {
    methods: {
        login(){
            document.cookie = 'uid=123456';
            this.$router.back();
            console.log('document cookie');
        }
    }
}
</script>
