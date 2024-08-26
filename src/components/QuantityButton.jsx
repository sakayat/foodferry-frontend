import { Minus, Plus } from "lucide-react";
import React from "react";

const QuantityButton = ({
  handleChangePlusValue,
  handleChangeMinusValue,
  quantity,
  setQuantity,
  disableButton
}) => {
  return (
    <div className="flex items-center justify-between gap-2 border border-black p-2 w-24 md:w-36">
      <div className="text-2xl cursor-pointer" onClick={handleChangeMinusValue}>
      <div
                  className={`w-6 text-2xl cursor-pointer ${
                    disableButton ? "text-gray-600" : ""
                  }`}
                  onClick={() => handleChangeMinusValue()}
                  disabled={disableButton}
                >
                  <Minus size={18} />
                </div>
      </div>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="outline-none font-bold text-center w-6"
      />
      <div className="text-2xl cursor-pointer" onClick={handleChangePlusValue}>
        <Plus size={18} />
      </div>
    </div>
  );
};

export default QuantityButton;
