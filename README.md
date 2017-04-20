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

### 解决`setState(…): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op`问题
> 问题：更新state时发生错误
> 原因：触发shouldComponentUpdate钩子时会导致组件的unmount，如果此时更新state，则会出现问题
> 解决：简单的办法是给一个标签设置ref属性，然后通过判断该标签是否存在从而决定是否更新数据

```
  if(that.refs.myRef)
    that.setState({
      music: data,
    })
``` 