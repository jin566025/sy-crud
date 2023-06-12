export const findComponentDownward = (context, componentName) => {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options._componentTag;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
};


export const setHeaders = () => {
  let userInfo = localStorage.getItem("userInfo");
  let Platform = "educationAdmin";
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    Platform = userInfo.companyId ? "educationAdmin" : "educationAdmin";
  }
  let headers = {
    Authorization: localStorage.getItem("Authorization"),
    Platform
  };
  return headers;
};
