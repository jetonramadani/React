import { useCallback, useEffect, useState } from "react";
import AddTimes from "./AddTimes";
import "./App.css";
import Time from "./Time";

function App() {
  const [allTimes, setAllTimes] = useState([]);
  const [deletedTimes, setDeletedTimes] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchMoviesHandler = async (json) => {
    const response = await fetch(
      `https://git-apps-14570-default-rtdb.firebaseio.com/${json}.json`
    );

    const data = await response.json();

    const loadedPredavana = [];

    for (const key in data) {
      loadedPredavana.push({
        id: key,
        minutes: data[key].minutes,
        seconds: data[key].seconds,
        hours: data[key].hours,
        lecNumber: data[key].lecNumber,
        itemId: data[key].itemId,
      });
    }
    if (json === "allTimes") {
      setAllTimes(loadedPredavana);
    } else {
      setDeletedTimes(loadedPredavana);
    }
    console.log(loadedPredavana, json);
  };

  useEffect(() => {
    fetchMoviesHandler("allTimes");
    fetchMoviesHandler("deletedTimes");
  }, []);

  useEffect(() => {
    let tot = 0;
    allTimes
      .filter(
        (time) => !deletedTimes.some((delTime) => delTime.itemId === time.id)
      )
      .forEach((time) => {
        tot += +time.hours * 3600 + +time.minutes * 60 + +time.seconds;
      });
    setTotal(tot);
  }, [allTimes.length, deletedTimes.length]);
  return (
    <div style={{ paddingTop: "4rem" }}>
      <AddTimes onTimeAdded={() => fetchMoviesHandler("allTimes")} />
      {allTimes
        .filter(
          (time) => !deletedTimes.some((delTime) => delTime.itemId === time.id)
        )
        .map((time) => (
          <Time
            {...time}
            key={time.id}
            onRemoveTime={() => fetchMoviesHandler("deletedTimes")}
          />
        ))}
      <div>
        Total left{" "}
        {`${Math.floor(total / 3600)}h:${Math.floor((total % 3600) / 60)}min:${total -
          Math.floor(total / 3600) * 3600 -
          Math.floor((total % 3600) / 60) * 60
          } sec`}
      </div>
    </div>
  );
}

export default App;
