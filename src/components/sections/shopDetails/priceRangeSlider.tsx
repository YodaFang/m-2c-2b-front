'use client'
import React, { useState } from "react";
import { Range } from "react-range";

const PriceRangeSlider = () => {
    const [values, setValues] = useState([10, 90]); // Min and Max values
    const minLimit = 0; // Slider minimum limit
    const maxLimit = 100; // Slider maximum limit

    return (
        <div className="w-full mt-5">
            <Range
                step={1}
                min={minLimit}
                max={maxLimit}
                values={values}
                onChange={(newValues) => setValues(newValues)}
                renderTrack={({ props, children }) => {
                    // Destructure key from props to avoid the warning
                    const { ...restProps } = props;
                    return (
                        <div
                            key={1}
                            {...restProps}
                            style={{
                                ...restProps.style,
                                height: "2px",
                                width: "100%",
                                background: "#4D4C4B",
                            }}
                        >
                            {children}
                        </div>
                    );
                }}
                renderThumb={({ props }) => {
                    // Destructure key from props to avoid the warning
                    const { key, ...restProps } = props;
                    return (
                        <div
                        key={key}
                            {...restProps}
                            style={{
                                ...restProps.style,
                                height: "8px",
                                width: "8px",
                                backgroundColor: "#4D4C4B",
                                borderRadius: "none",
                            }}
                        />
                    );
                }}
            />
            <div className="flex justify-between items-center mt-5">
                <div>
                    <span className='text-gray-1-foreground'>Price:</span>
                    <p className="border border-primary py-1 px-4 inline-flex gap-3 ml-2 text-secondary-foreground rounded-sm">${values[0]} - ${values[1]}</p>
                </div>
                <button className='px-4 py-1 bg-primary text-white leading-[162%] text-base rounded-[4px]'>Filter</button>
            </div>
        </div>
    );
};

export default PriceRangeSlider;
