import React from "react";

const Time = ({ lecNumber, hours, minutes, seconds, id, onRemoveTime }) => {
  async function remoItem(movie) {
    await fetch(
      "https://git-apps-14570-default-rtdb.firebaseio.com/deletedTimes.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    onRemoveTime();
  }
  const total = hours * 3600 + minutes * 60 + seconds;
  return (
    <div>
      <div>Lecture {lecNumber}</div>
      <div>
        <span style={{ minWidth: "300px" }}>
          {("0" + hours).slice(-2) + ":"}
          {("0" + minutes).slice(-2) + ":"}
          {("0" + seconds).slice(-2) + "=" + total + "sec"}
        </span>
        <button
          style={{ marginLeft: "20px" }}
          onClick={() => {
            remoItem({
              itemId: id,
            });
          }}
        >
          MARK AS DONE
        </button>
      </div>
    </div>
  );
};

export default Time;
