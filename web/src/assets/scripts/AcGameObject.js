// 存储所有AcGameObject实例的数组
const AC_GAME_OBJECTS = []

// AcGameObject基类
export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this) // 将当前对象加入全局对象数组
        this.timedelta = 0 // 两帧之间的时间间隔
        this.has_called_start = false // 是否已调用start方法
    }

    // 只在第一帧执行一次
    start() {

    }

    // 每一帧都会执行，除了第一帧
    update() {

    }

    // 销毁前执行，可用于清理操作
    on_destroy() {

    }

    // 销毁对象，从全局对象数组中移除
    destroy() {
        this.on_destroy();

        for(let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i]
            if(obj == this){
                AC_GAME_OBJECTS.splice(i) // 从数组中移除当前对象
                break
            }
        }
    }
}

let last_timestamp  // 上一次执行的时刻

// step函数：每一帧调用，驱动所有AcGameObject对象的生命周期
const step = timestamp => {
    for(let obj of AC_GAME_OBJECTS){
        if(!obj.has_called_start){
            obj.has_called_start = true
            obj.start() // 首帧调用start方法
        }else{
            obj.timedelta = timestamp - last_timestamp // 计算两帧之间的时间间隔
            obj.update() // 每帧调用update方法
        }
    }
    last_timestamp = timestamp // 更新上一次的时间戳
    requestAnimationFrame(step) // 注册下一帧回调
}

requestAnimationFrame(step) // 启动动画帧循环