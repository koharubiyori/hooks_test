import { Dispatch, SetStateAction, useState } from 'react'
import useStateWithRef from '../useStateWithRef'

export type InfinityListStatus = 'error' | 'initial' | 'loading' | 'success' | 'allLoaded' | 'empty'

export type InfinityListDataGenerator<ListItem = any, LoadNextArgs = any> = 
  (nextPage: number, loadNextArgs?: LoadNextArgs) => Promise<{ 
    list: ListItem[],   // 一次加载的数据，这个数据将会被添加在原有数据的后面
    currentPage: number,  // 当前页数
    totalPage: number   // 总页数
  }>

export interface InfinityListDataController<ListItem = any, LoadNextArgs = any> {
  list: ListItem[]
  status: InfinityListStatus
  currentPage: number
  totalPage: number
  loadNext(args?: LoadNextArgs): Promise<void>
  setList: Dispatch<SetStateAction<ListItem[]>>
  clearList(): void
}

export interface InfinityListDataOptions {
  defaultPage: number
  incrementPageNumber: number
}

// export default function useInfinityListData<ListItem = any, LoadNextArgs = any>(
//   dataGenerator: InfinityListDataGenerator,
//   options: InfinityListDataOptions
// ): InfinityListDataGenerator<ListItem, LoadNextArgs> {
//   const [list, setList, listRef] = useStateWithRef<ListItem[]>([])
//   const [status, setStatus, statusRef] = useStateWithRef<InfinityListStatus>('initial')
//   const [currentPage, setCurrentPage, currentPageRef] = useStateWithRef(options.defaultPage || 0)
//   const [totalPage, setTotalPage, totalPageRef] = useStateWithRef(0)

//   const incrementPageNumber = options.incrementPageNumber || 1

//   function loadNext(args?: LoadNextArgs): Promise<void> {
//     if (['allLoaded', 'empty'].includes(statusRef.current)) return Promise.resolve()

//     setStatus('loading')
    
//     const nextPage = currentPage + incrementPageNumber
//     return dataGenerator(nextPage, args)
//       .then(data => {
//         setTotalPage(data.totalPage)
//         setCurrentPage(data.currentPage)

//         let nextStatus: InfinityListStatus = 'success'
//         if (data.list.length === 0 && listRef.current.length === 0) {
//           nextStatus = 'empty'
//         } else if ((data.currentPage >= data.totalPage)) {
//           nextStatus = 'allLoaded'
//         }

//         setList(prevVal => prevVal.concat(data.list))
//         setStatus(nextStatus)
//       })
//       .catch(e => {
//         setStatus('error')
//         throw e
//       })
//   }

//   function clear() {
//     setList([])
//     setStatus('initial')
//   }
// }