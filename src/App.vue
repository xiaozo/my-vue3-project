<script>
import pagesJson from '@/pages.json'

///快速获取标题
const pagesItems = () => {

  let { pages, subPackages } = pagesJson;
  const items = {};
  const prefix = ''
  ///处理主包
  pages?.forEach((element) => {
    const path = `${prefix}${element.path}`;
    const style = element.style;
    items[path] = style;
  });

  subPackages?.forEach((element) => {
    const { root, pages } = element;
    pages.forEach((element) => {
      const path = `${prefix}${root}/${element.path}`;
      const style = element.style;
      items[path] = style;
    });
  });
  console.log("pagesItems", items);

  return items;
};

export default {
  onLaunch: function () {
    console.log('App Launch')
    this.globalData.pagesItems = pagesItems();
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    pagesItems: {},
    data: {
      ///展示自定义导航栏
      showCustomNavBar: true,
      ///navdark
      navDark: false,
      ///nav标题字体大小
      navTitleFontSize: "15px",
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-pro/index.scss";
@import "./static/scss/variables/variables.scss";
</style>
