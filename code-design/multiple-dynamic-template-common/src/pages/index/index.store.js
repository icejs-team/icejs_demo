class IndexStore extends am.Store {
    constructor () {

        this.state = {
            userInfo: {
                username: "jou",
                password: "a123456",
            },
            counter: 0,
            plusFive () {
                return this.counter + 5;
            }
        };

        // 方式一：授权和state定义放在不同的地方，用于之前没有授权后面需要添加授权的情况
        // 授权时，如果被授权组件或模块中，它或它的父级没有注入该Store则会报错
        this.auth({
            userInfo: [indexModule],
            plusFive: [indexModule]
        });

        // 方式二：授权和state定义放在一起，用于一开始即使用到授权或喜欢集中处理的情况
        // 这样写的劣势是每个state项都要定义为对象，好处是一目了然
        /** 
        this.state = {
            userInfo: {
                value: {
                    username: "jou",
                    password: "a123456",
                },
                auth: [indexModule]
            },
            counter: 0,
            plusFive: {
                get () {
                    return this.counter + 5;
                },
                auth: [indexModule]
            }
        }
        */
    }
    updateUserInfo (username, password) {
        this.state.username = username;
        this.state.password = password;
    }
}