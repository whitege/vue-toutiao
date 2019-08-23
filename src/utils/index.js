/**
 * @file 
 * @author wuyupeng
 */
import echarts from 'echarts';

// 防抖函数
const createThrottle = (fn, delay = 1000) => {
    let status = 'START';
    return () => {
        if (status === 'WAITING') {
            return;
        }
        status = 'WAITING';
        setTimeout(() => {
            fn && fn();
            status = 'START';
        }, delay);
    };
};

// 节流函数
const createDebounce = (fn, delay = 1000) => {

    let timmer = null;

    return args => {
        clearTimeout(timmer);
        timmer = setTimeout(() => {
            fn && fn(args);
        }, delay);
    };
};

export const reachBottomNotify = {

    install: (Vue, options) => {

        Vue.mixin({

            data() {
                const data = {
                    scrollQueue: [],
                };
                return this.onReachBottom ? data : {};
            },

            created() {
                if (typeof this.onReachBottom === 'function') {
                    this.scrollQueue.push(() => {
                        this.onReachBottom();
                    });
                    this.$_listenScroll();
                }
            },

            methods: {

                $_listenScroll() {

                    const THRESHOLD = 50;
                    const throttle = createThrottle(() => {
                        this.scrollQueue.forEach(func => func());
                    });

                    // const debounce = createDebounce(() => {
                    //     this.scrollQueue.forEach(func => func());
                    // });

                    window.addEventListener('scroll', () => {
                        const offsetHeight = document.documentElement.offsetHeight;
                        const screenHeight = window.screen.height;
                        const scrollY = window.scrollY;
                        const gap = offsetHeight - screenHeight - scrollY;
                        if (gap < THRESHOLD) {
                            throttle();
                            // debounce();
                        }
                    });

                }
            }
        });

    }
};

export const functionalTool = {

    install: (Vue, options) => {

        Vue.mixin({
            methods: {
                createDebounce,
                createThrottle
            }
        });

        Vue.component('echarts', {

            props: {

                width: {
                    type: Number,
                    default: -1
                },

                height: {
                    type: Number,
                    default: -1
                },


                options: {
                    type: Object,
                    default: {}
                }

            },

            render(createElement) {

                return createElement(
                    'div',
                    {
                        attrs: {
                            id: this.randomId
                        },
                        style: this.canvasStyle,
                        directives: [
                            {
                                name: 'echarts'
                            }
                        ]
                    }
                );
            },

            mounted() {
                this.draw();
                this.$watch('options', options => {
                    this.draw();
                });
            },

            computed: {

                randomId() {
                    return 'echarts-' + Math.floor(Math.random() * 10);
                },

                canvasStyle() {
                    return {
                        height: this.height === -1 ? '100%' : this.height + 'px',
                        width: this.width === -1 ? '100%' : this.width + 'px'
                    }
                }

            },

            methods: {

                recieveEchartsContext(context) {
                    this.echartsContext = context;
                },

                draw() {
                    const options = this.options;
                    console.log('options options options options ::', options);
                    this.echartsContext.setOption(options);
                }

            }
        });

        Vue.directive('echarts', {
            inserted: (el, binding, vnode) => {
                const charts = echarts.init(el);
                vnode.context.recieveEchartsContext && vnode.context.recieveEchartsContext(charts);
            }
        });
    }

}
