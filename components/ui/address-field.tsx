import { ComboBox, Input, Label } from "react-aria-components";
import Popover from "./popover";
import ListBox from "./listbox";
import TextField from "./TextField";
import { Item } from "react-stately";
import { useRef } from "react";

export default function AddressField() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const 
  return (
    <ComboBox {...props}>
      <div ref={triggerRef}>
        <TextField />
      </div>
      <Popover triggerRef={triggerRef} >
        <ListBox>
          <Item>тыт</Item>
        </ListBox>
      </Popover>
    </ComboBox>
  );
}
