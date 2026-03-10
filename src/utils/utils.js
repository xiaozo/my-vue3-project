
import {
    customRef
} from 'vue';

// 自动保存到 localStorage
function useLocalStorageRef(key, initialValue) {
    return customRef((track, trigger) => {
        let value = uni.getStorageSync(key) || initialValue

        return {
            get() {
                track()
                return value
            },
            set(newValue) {
                value = newValue
                uni.setStorageSync(key, newValue);
                trigger()
            }
        }
    })
}

export { 
    useLocalStorageRef
 }