const fs = require('fs')

function TuringMachine () {
  const machineHead = {
    currentState: 0,
    currentPosition: 0
  }

  const fileContent = fs.readFileSync('entry.txt').toString()
  const fileLines = fileContent.split('\n')
  const machineInfo = fileLines.slice(0, 4)
  const machineEntry = fileLines.slice(-1).join()

  function start () {
    machineHead.currentState = machineInfo[1].split(' ')[0]

    machineHead.currentPosition = machineEntry[0]

    readTransitionFunctions()
  }

  function readTransitionFunctions () {
    const machineTransitionFunctions = fileLines.filter(line => line.includes('('))

    machineTransitionFunctions.forEach(transitionFunction => {
      const [condition, result] = transitionFunction.split('=')
      const [state, entry] = condition.replace('(', '').replace(')', '').split(',')

      if (!machineInfo[1].includes(state)) {
        throw new Error('Invalid parameter')
      }

      if (!machineInfo[3].includes(entry)) {
        throw new Error('Invalid parameter')
      }

      // if (machineHead.currentState === state && machineEntry[machineHead.currentPosition] === entry) {
      //   const [nextState, nextEntry, nextPosition] = result.replace('(', '').replace(')', '').split(',')
      // }
    })
  }

  return {
    start
  }
}

module.exports = TuringMachine
