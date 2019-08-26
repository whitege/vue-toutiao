/**
 * @file vue-router
 * @author wuyupeng
 */

 export default class VueRouter {
    
    constructor(options) {
        this.routes = options.routes;
        this.history = new History();
        this.history.listen(newHash => {
            console.log('vm:', this.vm)
            console.log('hash:', newHash)
            this.vm.$forceUpdate()
        })
    }

    push(path) {
        window.location.hash = '#' + path
    }

    back() {
        window.history.back()
    }

    static install (Vue, options) {

        Vue.mixin({
            created() {
                // 自查
                if (this.$options.router) {
                    this.$options.router.vm = this
                    this.$router = this.$options.router
                }else {
                    this.$router = this.$parent.$router
                }
            }
        })

        Vue.component('router-view', {

            functional: true,

            render: (h, {props, children, parent}) => {
                const currentHash = location.hash;
                const router = parent.$options.router;
                const currentRoute = matcher(currentHash, router.routes)
                // 拿到当前路径下对应的组件
                console.log('currentRoute:', currentRoute)
                return h(currentRoute.component)
            }

        })

        Vue.component('router-link', {
            render: h=>{
                return h('span', {
                    on: {
                        click: this.clicking
                    },
                    
                    methods: {
                        clicking() {
                            window.history.back()
                            // this.$parent.$router.back
                        }
                    },
                })
            }
        })
    }

 }

 const matcher = (path, routesConfig) => {
    return routesConfig
        .find(route => {
            return route.path === path.replace(/^#/, '')
        })
 }

 class History {

    listen(callback) {
        window.addEventListener('hashchange', ()=>{
            callback && callback(window.location.hash)
        })
    }

    push(path){
        window.location.hash = '#' + path
    }
 }