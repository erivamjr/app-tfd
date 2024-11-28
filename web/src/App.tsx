import { DataProvider } from './Components/Context/DataContext'
import AppRouter from './Router'
import './index.css'

function App() {
  return (
    <div className="">
      <DataProvider>
        <AppRouter />
      </DataProvider>
    </div>
  )
}

export default App
