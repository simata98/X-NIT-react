import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import Header from './Header';
import Main from './Main';
import Product from './Product';
import NotFound from './NotFound';
import UseEffectTest from './CountUp';
import Counter from './reducer_counter';

const App = () => {
	return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/product/:productId' element={<Product />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/counting/' element={<UseEffectTest />}></Route>
          <Route path='/reducer_counter/' element={<Counter initialCount={0}/>}></Route> 
        </Routes>
      </BrowserRouter>
		</div>
	);
}

const rootElement = document.getElementById("root");
const root = rootElement ? ReactDOM.createRoot(rootElement) : null;

if (root) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
    
  );
}

export default App;