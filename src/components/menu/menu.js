import React, { Component } from "react";
import classNames from "classnames";

export const MenuContext = React.createContext({ index: "0" });
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActive: "0"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(index) {
    this.setState({
      currentActive: index
    });
    this.props.onSelect && this.props.onSelect(index);
  }
  renderChildren() {
    const { children } = this.props;
    return React.Children.map(children, (child, index) => {
      const { displayName } = child.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(child, {
          index: index.toString()
        });
      } else {
        console.log(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  }
  componentDidMount() {
    this.setState({
      currentActive: this.props.defaultIndex
    });
  }
  render() {
    const { currentActive } = this.state;
    const { className, mode, style, defaultOpenSubMenus } = this.props;
    const classes = classNames("nsp_menu", className, {
      "menu-vertical": mode === "vertical"
    });
    return (
      <ul className={classes} style={style}>
        <MenuContext.Provider
          value={{
            index: currentActive ? currentActive : "0",
            onSelect: this.handleClick,
            defaultOpenSubMenus
          }}
        >
          {this.renderChildren()}
        </MenuContext.Provider>
      </ul>
    );
  }
}

Menu.defaultProps = {
  defaultIndex: "0"
};

export default Menu;
