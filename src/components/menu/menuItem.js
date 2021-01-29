import React from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

class MenuItem extends React.Component {
  static contextType = MenuContext;
  render() {
    const { index, disabled, className, style, children } = this.props;
    const classes = classNames("nsp_menu_item", className, {
      "is-disabled": disabled,
      "is-active": this.context.index === index
    });
    const handleClick = () => {
      if (this.context.onSelect && !disabled && typeof index === "string") {
        this.context.onSelect(index);
      }
    };

    return (
      <li className={classes} style={style} onClick={handleClick}>
        {children}
      </li>
    );
  }
}

MenuItem.defaultProps = {};

MenuItem.displayName = "MenuItem";

export default MenuItem;
