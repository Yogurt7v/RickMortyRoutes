import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error", error.message);
    console.log("errorInfo", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что то сломалось</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
