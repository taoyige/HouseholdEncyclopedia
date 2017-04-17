# webpck-demo
一个webpack模板

```
  npm install
  
  webpack-dev-server
```
"# HouseholdEncyclopedia" 


### 解决`Warning: [react-router] You cannot change <Router routes>; it will be ignored`问题
> 问题：路由一开始定义了就不要再去改变它了
> 原因：刚修改store后，会重新执行render方法(因为订阅的了render方法)
> 解决：更新store时，不更新Router

```
    /**
     * 阻止Router主键更新
     */
    shouldComponentUpdate(){
      return false;
    }

```