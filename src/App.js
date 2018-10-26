import React, { Component, useMemo, useState, useCallback } from "react"
import styled from "styled-components"

const Box = styled.div`
  padding: 1em;
`
const Label = styled.span`
  font-weight: bold;
`
const concat = (first, second) => `${first}|||${second}`
const WithoutMemo = ({ first, second }) => {
  const str = concat(first, second)
  return <div>{str}</div>
}
const UseMemo = ({ first, second }) => {
  const str = useMemo(() => concat(first, second), [first, second])

  return <div>{str}</div>
}

const UseFirstOnlyMemo = ({ first, second }) => {
  const str = useMemo(() => concat(first, second), [first])
  return <div>{str}</div>
}
const UseSecondOnlyMemo = ({ first, second }) => {
  const str = useMemo(() => concat(first, second), [second])
  return <div>{str}</div>
}

const UseNoRevokeMemo = ({ first, second }) => {
  const str = useMemo(() => concat(first, second), [])
  return <div>{str}</div>
}

const Inputs = () => {
  const [first, setFirst] = useState("first")
  const [second, setSecond] = useState("second")
  return (
    <div>
      <Box>
        <div>
          First:
          <input
            onChange={(e) => {
              setFirst(e.target.value)
            }}
            value={first}
          />
        </div>
        <div>
          Second:
          <input onChange={(e) => setSecond(e.target.value)} value={second} />
        </div>
      </Box>
      <Box>
        <Label>Memoナシ:</Label> <WithoutMemo first={first} second={second} />
      </Box>
      <Box>
        <Label>useMemo(..., [first,second]):</Label>{" "}
        <UseMemo first={first} second={second} />
      </Box>
      <Box>
        <Label>useMemo(..., [first])</Label>
        <UseFirstOnlyMemo first={first} second={second} />
      </Box>
      <Box>
        <Label> useMemo(..., [second]):</Label>

        <UseSecondOnlyMemo first={first} second={second} />
      </Box>
      <Box>
        <Label> useMemo(..., []):</Label>
        <UseNoRevokeMemo first={first} second={second} />
      </Box>
    </div>
  )
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Inputs />
      </div>
    )
  }
}

export default App
