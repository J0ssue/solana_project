import { Layout, Space, Table, Typography } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { getTransactions, Transaction } from "../utils";
import "./App.less";

const searchAddress = "rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt";
const { Header, Content } = Layout;
const { Text } = Typography;

const keys = [
  "signature",
  "fee",
  // "logs",
  "status",
  "time",
  "transactionNumber",
];

function App() {
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const maxTransactions = 10;

  const cols = keys.map((entry) => ({
    title: entry,
    dataIndex: entry,
    key: entry,
  }));

  useEffect(() => {
    async function init() {
      const parsedTransaction = await getTransactions(
        searchAddress,
        maxTransactions
      );
      setTransaction(parsedTransaction);
    }
    init();
  }, []);

  return (
    <Layout
      style={{
        height: "100%",
      }}
      className="App"
    >
      {" "}
      <Header className="App__header">
        <Text strong>Transactions</Text>
      </Header>
      <Content>
        <Space className="App__content">
          <Table
            dataSource={transaction}
            columns={cols}
            className="App__table"
          />
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
