import { useState } from "react";

// ランダムな値を配列から選ぶ関数
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// ポンドをストーンに変換する関数
function poundsToStones(pounds) {
  return Math.round(pounds / 14);
}

// 華氏を摂氏に変換する関数
function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export default function App() {
  const [customName, setCustomName] = useState(""); // カスタム名
  const [xItem, setXItem] = useState("");
  const [yItem, setYItem] = useState("");
  const [zItem, setZItem] = useState("");
  const [showStory, setShowStory] = useState(false);
  const [ukus, setUkus] = useState("us"); // ラジオボタンの状態

  const storyElements = {
    xItems: ["Willy the Goblin", "Big Daddy", "Father Christmas"],
    yItems: ["the soup kitchen", "Disneyland", "the White House"],
    zItems: [
      "spontaneously combusted",
      "melted into a puddle on the sidewalk",
      "turned into a slug and crawled away",
    ],
  };

  // ボタンが押されたときの処理
  function generateStory() {
    const randomXItem = randomValueFromArray(storyElements.xItems);
    const randomYItem = randomValueFromArray(storyElements.yItems);
    const randomZItem = randomValueFromArray(storyElements.zItems);

    setXItem(randomXItem);
    setYItem(randomYItem);
    setZItem(randomZItem);
    setShowStory(true);
  }

  // 重さと温度を設定
  const weight = ukus === "uk" ? poundsToStones(300) : 300; // 重さの設定
  const temperature = fahrenheitToCelsius(94); // 温度の設定

  return (
    <>
      <div>
        <label htmlFor="customname">Enter custom name:</label>
        <input
          type="text"
          placeholder=""
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="us">US</label>
        <input
          type="radio"
          value="us"
          checked={ukus === "us"}
          onChange={() => setUkus("us")}
        />
        <label htmlFor="uk">UK</label>
        <input
          type="radio"
          value="uk"
          checked={ukus === "uk"}
          onChange={() => setUkus("uk")}
        />
      </div>
      <div>
        <button onClick={generateStory}>Generate random story</button>
      </div>
      {showStory && (
        <p>
          It was {temperature} degrees Celsius outside, so {xItem} went for a walk. When they
          got to {yItem}, they stared in horror for a few moments, then {zItem}.
          {customName || "Bob"} saw the whole thing, but was not surprised — {xItem} weighs {weight} {ukus === "uk" ? "stones" : "pounds"}, and it was a hot day.
        </p>
      )}
    </>
  );
}
