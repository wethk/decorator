import { isImmutable } from './assert';
import deepEqual from './deepEqual';
import shallowEqual from './shallowEqual';

export default function immutablePureRender(isDeep = false) {
  return function (target) {
    target.shouldComponentUpdate = (nextProps, nextState) => {
      const hasArgImmutable = isImmutable([this.props, nextProps, this.state, nextState]);
      if (isDeep || hasArgImmutable) {
        return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
      }
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    };
  };
}
