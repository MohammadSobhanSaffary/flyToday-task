import React from "react";

interface CounterProps {
    count: number;
    increase: (value: number) => void;
    decrease: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({count, increase, decrease}) => {
    return (
        <div className="flex items-center space-x-2 px-2 py-1 border rounded-md bg-gray-800 text-white w-16 justify-between">
            <span className="text-lg font-semibold">{count}</span>
            <div className="flex flex-col items-center justify-between h-full gap-1">
                <button
                    onClick={() => increase()}
                    className="text-md  w-4 h-4 bg-gray-700 flex items-center justify-center rounded hover:bg-gray-600 focus:outline-none"
                >
                    +
                </button>
                <button
                    onClick={() => decrease()}
                    className="text-md  w-4 h-4 bg-gray-700 flex items-center justify-center rounded hover:bg-gray-600 focus:outline-none"
                >
                    -
                </button>

            </div>


        </div>
    );
};

export default Counter;