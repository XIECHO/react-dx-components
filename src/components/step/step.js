import React from "react";
import classNames from "classnames";
import { StepsContext } from "./steps";
import "./index.less";

class Step extends React.Component {
  static contextType = StepsContext;
  render() {
    const { index, className, style, children, type } = this.props;
    const classes = classNames("steps_item", className, {
      active: this.context.index > index,
      [type]: type
    });
    const arrow_left = classNames("steps_item_arrow_left", {
      first: index === 0
    });

    if (type === "arrow") {
      return (
        <li className={classes}>
          <div className={arrow_left}></div>
          <div className="steps_item_arrow_title">{children}</div>
          <div className="steps_item_arrow_right"></div>
        </li>
      );
    } else {
      return (
        <li className={classes} style={style}>
          {index > 0 && <hr className="steps_hr" />}
          <span className="steps_item_icon">{index + 1}</span>
          {children}
        </li>
      );
    }
  }
}

Step.displayName = "Step";
export default Step;
