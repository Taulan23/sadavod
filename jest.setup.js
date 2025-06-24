import '@testing-library/jest-dom'
import React from 'react'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
    }
  },
}))

// Mock Next.js image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />
  },
}))

// Mock styled-components
jest.mock('styled-components', () => {
  const styled = (tag) => () => {
    const StyledComponent = (props) => {
      const Component = typeof tag === 'string' ? tag : 'div';
      return React.createElement(Component, props);
    };
    return StyledComponent;
  };
  
  // Add properties like styled.div, styled.button etc.
  const styledProxy = new Proxy(styled, {
    get: (target, prop) => {
      if (typeof prop === 'string') {
        return target(prop);
      }
      return target[prop];
    }
  });
  
  return {
    __esModule: true,
    default: styledProxy,
    createGlobalStyle: () => () => null,
  };
}) 