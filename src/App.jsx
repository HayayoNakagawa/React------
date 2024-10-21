import { useState } from "react";

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

// 温度と体重を計算する関数
function calculateTemperatureAndWeight(unitSystem) {
    const initialTemperature = 94; // 初期の華氏温度
    const initialWeight = 300; // 初期のポンド体重

    let newTemperature = initialTemperature;
    let newWeight = initialWeight;
    let tempType = "Fahrenheit";
    let weightType = "pounds";

    if (unitSystem === "uk") {
        newTemperature = Math.round((initialTemperature - 32) * (5 / 9)); // 華氏 → 摂氏
        newWeight = Math.round(initialWeight / 14); // ポンド → キログラム
        tempType = "Celsius";
        weightType = "kilograms";
    }

    return { newTemperature, newWeight, tempType, weightType };
}

export default function App() {
    const [showStory, setShowStory] = useState(false);
    const [inputName, setInputName] = useState("Bob");
    const [name, setName] = useState("Bob");
    const [unitSystem, setUnitSystem] = useState("us");
    const [temperature, setTemperature] = useState(94);
    const [tempType, setTempType] = useState("Fahrenheit");
    const [weight, setWeight] = useState(300);
    const [weightType, setWeightType] = useState("pounds");
    const [xItem, setXItem] = useState("");
    const [yItem, setYItem] = useState("");
    const [zItem, setZItem] = useState("");

    const xItems = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
    const yItems = ["the soup kitchen", "Disneyland", "the White House"];
    const zItems = [
        "spontaneously combusted",
        "melted into a puddle on the sidewalk",
        "turned into a slug and crawled away"
    ];

    function generateStory(event) {
        event.preventDefault();

        const newXItem = randomValueFromArray(xItems);
        const newYItem = randomValueFromArray(yItems);
        const newZItem = randomValueFromArray(zItems);

        setXItem(newXItem);
        setYItem(newYItem);
        setZItem(newZItem);

        const { newTemperature, newWeight, tempType, weightType } =
            calculateTemperatureAndWeight(unitSystem);

        setTemperature(newTemperature);
        setTempType(tempType);
        setWeight(newWeight);
        setWeightType(weightType);
        setName(inputName);
        setShowStory(true);
    }

    return (
        <>
            <div>
                <label htmlFor="customname">Enter custom name:</label>
                <input
                    type="text"
                    placeholder=""
                    onChange={(event) => setInputName(event.target.value || "Bob")}
                />
            </div>
            <div>
                <label htmlFor="us">US</label>
                <input
                    type="radio"
                    id="us"
                    value="us"
                    checked={unitSystem === "us"}
                    onChange={() => setUnitSystem("us")}
                />
                <label htmlFor="uk">UK</label>
                <input
                    type="radio"
                    id="uk"
                    value="uk"
                    checked={unitSystem === "uk"}
                    onChange={() => setUnitSystem("uk")}
                />
            </div>
            <div>
                <button onClick={generateStory}>Generate random story</button>
            </div>
            {showStory && (
                <p>
                    It was {temperature} degrees {tempType} outside, 
                    so {xItem} went for a walk. When they got to {yItem}, 
                    they stared in horror for a few moments, then {zItem}. 
                    {name} saw the whole thing, but was not surprised — 
                    {xItem} weighs {weight} {weightType}, and it was a hot day.
                </p>
            )}
        </>
    );
}
