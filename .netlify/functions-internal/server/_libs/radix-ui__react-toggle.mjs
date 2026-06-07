import { r as reactExports, j as jsxRuntimeExports } from "./react.mjs";
import { c as composeEventHandlers } from "./radix-ui__primitive.mjs";
import { u as useControllableState } from "./@radix-ui/react-use-controllable-state+[...].mjs";
import { P as Primitive } from "./radix-ui__react-primitive.mjs";
var NAME = "Toggle";
var Toggle = reactExports.forwardRef((props, forwardedRef) => {
  const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
  const [pressed, setPressed] = useControllableState({
    prop: pressedProp,
    onChange: onPressedChange,
    defaultProp: defaultPressed ?? false,
    caller: NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.button,
    {
      type: "button",
      "aria-pressed": pressed,
      "data-state": pressed ? "on" : "off",
      "data-disabled": props.disabled ? "" : void 0,
      ...buttonProps,
      ref: forwardedRef,
      onClick: composeEventHandlers(props.onClick, () => {
        if (!props.disabled) {
          setPressed(!pressed);
        }
      })
    }
  );
});
Toggle.displayName = NAME;
var Root = Toggle;
export {
  Root as R,
  Toggle as T
};
