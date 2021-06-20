import { memo } from 'react'

const Container = props => {
  const { main, sidebar } = props

  return (
    <main className="md:grid md:grid-cols-10">
      <div className="md:col-span-6 md:col-start-1 p-5">
        {main}
      </div>
      <div className="md:col-span-4 md:col-start-7 p-5">
        {sidebar}
      </div>
    </main>
  )
}

export default memo(Container)