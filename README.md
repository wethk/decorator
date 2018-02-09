## decorator
RN定制化装饰器，同时兼容其他平台

使用要求：1.babel
        2.transform-decorators-legacy(或其他decorators的babel插件，目前正在着手打造适合我们需求的babel decorator，敬请期待)

如果还不知道babel配置的，出门左转，[基友babel](http://babeljs.io/) 向你招手

### autobind(RN端不建议使用，JSC执行时存在异常)

为解决执行上下文变动的装饰器

注：请转babel-transfrom-decorator-autobind，autobind装饰器在rn项目中使用存在this丢失问题（偶发），目前使用箭头函数绑定在实例上，但也会出现this指向错误的情况（偶发），建议切换babel-transfrom-decorator-autobind使用，babel阶段移除@autobind，自动在constructor中添加bind.this。只需在babelrc中配置上babel插件可无痛解决autobind this丢失问题

装饰于类方法上

```js
// 形如
Class A{
    constructor(props){
        super(props)
        this.init = this.init.bind(this)
    }

    init(){
        ...
    }

}

// 可以写成
import { autobind } from 'biz-decorator'

Class A{
    constructor(props){
        super(props)
    }

    @autobind
    init(){
        ...
    }

}

```

### debounce/throttle

装饰于类方法上

参数： number 非必传 默认 300

```js
// 形如
import { autobind } from 'biz-decorator'

Class A{
    constructor(props){
        super(props)
    }

    @autobind
    debounce(){
        clearTimeout(this.timerRecorder)
        this.timerRecorder = setTimeout(()=>{
            ....
        },3000)

        ...
    }

    @autobind
    throttle(){
        if(this.timeRecorder - Date.now() > 3000){
            ....
            this.timeRecorder = Date.now()
        }
    }


}

// 可以写成
import { autobind, debounce, throttle } from 'biz-decorator'

Class A{
    constructor(props){
        super(props)
    }

    @autobind
    @debounce(3000)
    debounce(){
        ...
    }

    @autobind
    @throttle(3000)
    throttle(){
        ....
    }

}

```

### pureRender

集成immutable的PureRender，如果你还不知道pureRender是什么....please Baidu

装饰于类上

参数 ：bool  非必传 true/false 深比较/浅比较 默认false 

```js
import { pureRender } from 'biz-decorator'

@pureRender(true)
Class A{
    ...
}


```

