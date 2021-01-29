import React from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

class SubMenu extends React.Component {
  static contextType = MenuContext;
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = e => {
    e.preventDefault();
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  };
  renderChildren = () => {
    const { menuOpen } = this.state;
    const { index, children } = this.props;
    const subMenuClasses = classNames("", {
      "menu-opened": menuOpen
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const { displayName } = child.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(child, {
          index: `${index}-${i}`
        });
      } else {
        console.error(
          "Warning: SubMenu has a child which is not a MenuItem component"
        );
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  componentDidMount() {
    const openedSubMenus = this.context.defaultOpenSubMenus;
    const isOpened = this.props.index
      ? openedSubMenus.includes(this.props.index)
      : false;

    this.setState({
      menuOpen: isOpened
    });
  }
  render() {
    const { menuOpen } = this.state;
    const { index, title, className, icon } = this.props;
    const classes = classNames("nsp_submenu", className, {
      "is-active": this.context.index === index
    });
    return (
      <li className={classes}>
        <div className="nsp_submenu_title" onClick={this.handleClick}>
          <div>
            {icon && <i className={`iconfont ${icon} i`}></i>}
            <span>{title}</span>
          </div>
          <i
            className={classNames({
              iconfont: true,
              "iconicon-dropdown": true,
              open: menuOpen
            })}
          ></i>
        </div>
        {menuOpen && this.renderChildren()}
      </li>
    );
  }
}

SubMenu.displayName = "SubMenu";
export default SubMenu;
