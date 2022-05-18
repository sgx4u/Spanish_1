import { Checkbox } from "@mui/material";
import React from "react";

const CustomCheckBox = ({ onClick }) => {
    const [isChecked,setIsChecked]=React.useState(false)

  return <Checkbox checked={isChecked} onChange={(e)=>{
    setIsChecked(!isChecked)
    setTimeout(() => {
        setIsChecked(false)
    },600);
      }} onClick={onClick} />;
};

export default CustomCheckBox;
