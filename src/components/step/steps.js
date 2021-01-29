import React, { Component } from "react";
import classNames from "classnames";

export const StepsContext = React.createContext({ index: "0" });
class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  renderChildren() {
    const { children, type } = this.props;
    return React.Children.map(children, (child, index) => {
      if (child.type.displayName === "Step") {
        return React.cloneElement(child, {
          type,
          index
        });
      } else {
        console.log("Warning: Steps has a child which is not a Step component");
      }
    });
  }

  componentDidMount() {
    this.setState({
      current: this.props.current
    });
  }

  render() {
    const { current } = this.state;
    const { className, style, type } = this.props;
    const classes = classNames("steps", className, {
      [type]: type
    });
    return (
      <ul className={classes} style={style}>
        <StepsContext.Provider
          value={{
            index: current ? current : 0
          }}
        >
          {this.renderChildren()}
        </StepsContext.Provider>
      </ul>
    );
  }
}

Steps.defaultProps = {
  defaultIndex: "0",
  type: ""
};

export default Steps;
