import './App.css'
import {useReducer, useRef} from "react";
import t from "../public/translation.json"
import {Functions} from "./assets/Classes/Functions.ts";
import Counter from "./components/counter";

const initialState = {
    count: 10,
    fiboArray: Array.from({length: 10}, (value: number, index: number) => Functions.fibonacci(index + 1)),
    activeIndex: 0
};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: Math.min(state.count + 1, 50),
                fiboArray: Array.from({length: Math.min(state.count + 1, 50)}, (value: number, index: number) => Functions.fibonacci(index + 1))
            };
        case 'decrement':
            return {
                ...state,
                count: Math.max(state.count - 1, 10),
                fiboArray: Array.from({length: Math.max(state.count - 1, 10)}, (value: number, index: number) => Functions.fibonacci(index + 1))
            };
        case  "change-index":
            return {...state, activeIndex: action.value}
        default:
            throw new Error();
    }
}


interface State {
    count: number;
    fiboArray: number[];
    activeIndex:number;
}

function App() {


    const commonBoxClasses = "min-w-[120px] min-h-[120px] snap-always snap-center rounded rounded-md shadow-md flex items-center justify-center hover:mb-4  ";

    const [state, dispatch] = useReducer<(state: State, action: any) => void, State>(reducer, initialState);
    const scrollRef = useRef<HTMLDivElement>(null);

    function translate(key: string): string {
        return t[key]
    }

    function increase() {
        dispatch({
            type: "increment"
        })
    }

    function decrease() {
        dispatch({
            type: "decrement"
        })
    }

    function handleScroll() {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const containerWidth = scrollRef.current.clientWidth;

            const newActiveIndex = Math.floor(scrollLeft / 120) + 3;
            dispatch({type: "change-index", value: Math.min(newActiveIndex, state.fiboArray.length - 1)});
        }
    }

    return (
        <main className=" w-screen h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-[60vw] flex flex-col items-center justify-center gap-1">
                <div className="flex items-center justify-center gap-1">
                    {translate("number-text")}
                    <Counter count={state.count} increase={increase}
                             decrease={decrease}/>
                </div>
                <div
                    className=" snap-x snap-mandatory max-w-[60vw] h-[180px] scroll-container whitespace-nowrap bg-white cursor-pointer rounded rounded-sm overflow-x-scroll scroll-p-4 flex items-center justify-center center p-2  gap-4  "
                    ref={scrollRef}
                    onScroll={handleScroll}>
                    <div className="flex items-center w-full gap-4 whitespace-nowrap px-4 scroll-mr-2">
                        {state.fiboArray.map((num: number, index: number) => (
                            <div
                                onClick={() => dispatch({type: "change-index", value: index})}
                                className={index !== state.activeIndex ? commonBoxClasses : commonBoxClasses + "bg-green-600 text-white"}>{num}</div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default App
