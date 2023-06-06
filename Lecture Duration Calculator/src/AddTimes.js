import React, { useState } from "react";

const AddTimes = (props) => {
  const [formData, setFormData] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    lecNumber: 0,
  });
  async function addTimeHandler(movie) {
    const response = await fetch(
      "https://git-apps-14570-default-rtdb.firebaseio.com/allTimes.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    props.onTimeAdded();
  }
  const onChange = (event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: +event.target.value,
      };
    });
  };
  return (
    <div>
      Lecutre number
      <input
        type="number"
        name="lecNumber"
        onChange={onChange}
        value={formData.lecNumber}
      />
      Hours
      <input
        type="number"
        name="hours"
        onChange={onChange}
        value={formData.hours}
      />
      Minutes
      <input
        type="number"
        name="minutes"
        onChange={onChange}
        value={formData.minutes}
      />
      Seconds
      <input
        type="number"
        name="seconds"
        onChange={onChange}
        value={formData.seconds}
      />
      <button
        onClick={() => {
          addTimeHandler(formData);
          setFormData({
            hours: 0,
            minutes: 0,
            seconds: 0,
            lecNumber: 0,
          });
        }}
      >
        Add lecture time
      </button>
    </div>
  );
};

export default AddTimes;
