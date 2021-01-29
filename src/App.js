import "./styles/index.scss";
import React from "react";
import Menu from "./components/menu/menu";
import MenuItem from "./components/menu/menuItem";
import SubMenu from "./components/menu/subMenu";
class App extends React.Component {
  show = menus => {
    let a = menus.map(menu => {
      if (menu.title) {
        return (
          <SubMenu
            title={menu.title}
            key={menu.title}
            route={menu.route}
            icon={menu.icon}
          >
            {this.show(menu.menus)}
          </SubMenu>
        );
      } else {
        return (
          <MenuItem route={menu.route} key={menu.item}>
            {menu.item}
          </MenuItem>
        );
      }
    });
    return a;
  };
  render() {
    const menus = [
      {
        title: "账户管理",
        icon: "iconzhanghuguanli",
        route: "/account",
        menus: [
          {
            title: "账号审核",
            menus: [
              { item: "团队账号注册审核", route: "/account/review/review" },
              { item: "团队账号审核记录", route: "/account/review/record" }
            ],
            route: "/account/review"
          },
          {
            item: "团队用户账号",
            route: "/account/team"
          },
          {
            item: "管理系统用户账号",
            route: "/account/managerment"
          }
        ]
      },
      {
        title: "服务管理",
        icon: "iconfuwuguanli1",
        route: "/service",
        menus: [
          {
            title: "服务类别管理",
            menus: [
              { item: "服务类别", route: "/service/category/category" },
              { item: "服务类别展示设置", route: "/service/category/settings" },
              { item: "服务类别操作记录", route: "/service/category/record" }
            ],
            route: "/service/category"
          },
          {
            item: "服务库管理",
            route: "/service/library"
          },
          {
            item: "服务上架管理",
            route: "/service/shelves"
          }
        ]
      },
      {
        item: "服务上架管理",
        route: "/service/shelves"
      }
    ];
    return (
      <div className="App">
        <Menu>{this.show(menus)}</Menu>
      </div>
    );
  }
}

export default App;
