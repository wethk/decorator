import { isImmutable } from './assert';
import deepEqual from './deepEqual';
import shallowEqual from './shallowEqual';

function shouldComponentUpdate(isDeep) {
  return function (nextProps, nextState) {

    const hasArgImmutable = isImmutable([this.props, nextProps, this.state, nextState]);
    if (isDeep || hasArgImmutable) {
      return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
    }
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

  };
}

export default function pureRender(isDeep = false) {
  return function (component) {

    if (component.prototype.shouldComponentUpdate !== undefined) {
      throw Error('类方法已挂载shouldComponentUpdate');
    }

    component.prototype.shouldComponentUpdate = shouldComponentUpdate(isDeep);
    return component;
  };
}
