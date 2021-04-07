import namor from 'namor'
import { useGetAllGameQuery } from '../../generated/graphql'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newEntry = () => {
  //const statusChance = Math.random()
  const [{data}] = useGetAllGameQuery();
  const gameData = data
  console.log(gameData)


  // return {
  //   rank: Math.floor(Math.random() * 30),
  //   userName: gameData[0].username,
  //   entryDate: gameData[0].startTime,
  //   timeTaken: gameData[0].score,
  //   /*
  //   status:
  //     statusChance > 0.66
  //       ? 'relationship'
  //       : statusChance > 0.33
  //       ? 'complicated'
  //       : 'single',*/
  // }

  return {
    rank: Math.floor(Math.random() * 30),
    userName: namor.generate({ words: 1, numbers: 0 }),
    entryDate: Math.floor(Math.random() * 100),
    timeTaken: Math.floor(Math.random() * 100),
    /*
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',*/
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
