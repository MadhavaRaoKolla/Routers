import React, { Component } from "react";

class Errorboundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("error and info,", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComp = this.props.fallback;
        return <FallbackComp />;
      }
    }
    return this.props.children;
  }
}

export default Errorboundary;
