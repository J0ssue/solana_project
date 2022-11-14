import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useEffect } from "react";
import "./App.css";
import { getTransactions } from "./utils";

const searchAddress = "rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt";

function App() {
  useEffect(() => {
    getTransactions(searchAddress, 3);
  }, []);

  return <div className="App">hello wolrld</div>;
}

export default App;
