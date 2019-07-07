let bindCallbackMap = []

let onClickDocument = (e)=>{
  let {target} = e
  bindCallbackMap.forEach((item)=>{
    if(target === item.el || item.el.contains(target)){
      return
    }else{
      item.callback()

    }
  })
}
document.addEventListener('click',onClickDocument)

export default {
  bind:function (el, binding, vnode) {
    bindCallbackMap.push({el,callback:binding.value})
  }
}

let removeListener = ()=>{
  document.removeEventListener('click',onClickDocument)
}

export {removeListener}
