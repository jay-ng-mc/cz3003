import namor from 'namor'

const range = len => {  
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newEntry = () => {
  return {
    userName: namor.generate({ words: 1, numbers: 0 }),
    masteryScore: Math.floor(Math.random() * 100),
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newEntry(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}