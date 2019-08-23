/**
 * @file 所有item的基类
 * @author wuyupeng
 */
export default {

    props: ['title', 'imageList'],

    methods: {
        skip(e) {
            console.log('skipskip:', e);
        }
    }
}
