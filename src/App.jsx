import { Box, Button, Grid, GridItem} from '@chakra-ui/react';
import './App.css';
import { useState } from 'react';

function App() {
  let [data1, setData1] = useState("");
  let [data2, setData2] = useState("");
  let [operator, setOperator] = useState("");
  let [finalAmount, setFinalAmount] = useState(0);
  let [history, setHistory] = useState([]);
  let [showHistory, setShowHistory] = useState(false);

  const handleOperation = (value) => {
    if (value === "C") {
      setData1("");
      setData2("");
      setOperator("");
      setFinalAmount(0);
      setHistory([]);
    } else if (value === "%") {
      setData2(+data1);
      setOperator("%");
      setData1("");
    } else if (value === "/") {
      setOperator("/");
      setData2(+data1);
      setData1("");
    } else if (value === "X") {
      setOperator("X");
      setData2(+data1);
      setData1("");
    } else if (value === "-") {
      setOperator("-");
      setData2(+data1);
      setData1("");
    } else if (value === "+") {
      setOperator("+");
      setData2(+data1);
      setData1("");
    } else if (value === ".") {
      if (!data1.includes(".")) {
        setData1(data1 + value);
      }
    } else if (value === "=") {
      let result;
      switch (operator) {
        case "%":
          result = data2 % +data1;
          break;
        case "/":
          result = data2 / +data1;
          break;
        case "X":
          result = data2 * +data1;
          break;
        case "-":
          result = data2 - +data1;
          break;
        case "+":
          result = data2 + +data1;
          break;
        default:
          return;
      }
      setFinalAmount(result);
      setData1(result.toString());
      setHistory((prevHistory) => [...prevHistory, data1, operator, data2, "=", result.toString()]);
      setData2("");
      setOperator("");    
    } else {
      setData1(data1 + value);
    }
    if (value !== "C" && value !== "=" && value !== ".") {
      setHistory((prevHistory) => [...prevHistory, value]);
    }
  };
  

  return (
    <Box className='container'>
      { showHistory === true ? 
        <Box w="96%" m="5px 5px 5px 5px" pt="30px" h="80px" backgroundColor={'whiteAlpha.400'}>
          <span className="screen">{history.join(" ")}</span>
        </Box> : <Box></Box>
      }
      <Box w="96%" m="5px 5px 5px 5px" pt="30px" h="80px" backgroundColor={'whiteAlpha.400'}>
        <span className="screen">{finalAmount}</span>
      </Box>
      <Box>
        <Grid templateRows="repeat(6,1fr)" w="90%" gap={6} textAlign="center" m="30px 25px 20px 25px">
          <GridItem w='100%'>
              <Grid templateColumns="repeat(4,1fr)" gap={6}>
                <GridItem className="boxes" onClick={() => handleOperation("C")}>C</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("+/-")}>+/-</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("%")}>%</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("/")}>/</GridItem>
              </Grid>
          </GridItem>
          <GridItem w='100%'>
              <Grid templateColumns="repeat(4,1fr)" gap={6}>
                <GridItem className="boxes" onClick={() => handleOperation("7")}>7</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("8")}>8</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("9")}>9</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("X")}>X</GridItem>
              </Grid>
          </GridItem>
          <GridItem w='100%'>
              <Grid templateColumns="repeat(4,1fr)" gap={6}>
              <GridItem className="boxes" onClick={() => handleOperation("4")}>4</GridItem>
              <GridItem className="boxes" onClick={() => handleOperation("5")}>5</GridItem>
              <GridItem className="boxes" onClick={() => handleOperation("6")}>6</GridItem> 
              <GridItem className="boxes" onClick={() => handleOperation("-")}>-</GridItem>
           </Grid>
          </GridItem>
          <GridItem w='100%'>
              <Grid templateColumns="repeat(4,1fr)" gap={6}>
                <GridItem className="boxes" onClick={() => handleOperation("1")}>1</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("2")}>2</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("3")}>3</GridItem>
                <GridItem className="boxes" onClick={() => handleOperation("+")}>+</GridItem>
              </Grid>
          </GridItem>
          <GridItem w='100%'>
              <Grid templateColumns="repeat(4,1fr)" gap={6}>
              <GridItem colSpan={2} backgroundColor="black" color="white" borderRadius={'30%'} pt="10px" textAlign="start" pl="20px" onClick={() => handleOperation("0")}>0</GridItem>
              <GridItem className="boxes" onClick={() => handleOperation(".")}>.</GridItem>
              <GridItem className="boxes" onClick={() => handleOperation("=")}>=</GridItem>
          </Grid>
          </GridItem>
          <GridItem>
            <Button color="white" backgroundColor="black" mb="30px" onClick={() => setShowHistory(!showHistory)}>History</Button>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
