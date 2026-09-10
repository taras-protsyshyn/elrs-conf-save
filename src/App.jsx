import { useState } from "react";
import "./App.css";
import { DownloadConfLib } from "./containers";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <DownloadConfLib onDownload={(models) => console.log(models)} />
    </div>
  );
}

export default App;
