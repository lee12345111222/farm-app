import { Input } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { memo, useState } from "react";

interface Iprops{
    value?: string | undefined;
    onChange?: ((val: string) => void) | undefined;
    placeholder?:string;
}

export const PasswordInput = memo(({value, onChange, placeholder}: Iprops) => {

  const [visible, setVisible] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <Input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div className="text-base">
        {!visible ? (
          <EyeInvisibleOutline onClick={() => setVisible(true)} />
        ) : (
          <EyeOutline onClick={() => setVisible(false)} />
        )}
      </div>
    </div>
  );
});
