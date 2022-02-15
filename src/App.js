import './App.css';

import {useEffect,useState} from 'react';
import Palette from './components/Palette';
import {init, subscribe} from "./socketApi";

function App() {

  const [activeColor, setActiveColor] = useState('#282c34'); //backend'e varsayılan olarak verilen rengin aynısı..
  useEffect(()=>{
    init();

    subscribe((color)=>{
      setActiveColor(color);
    }); //abonelik işlemini başlattık..bu subscribe metoduna her başka renk düştüğünde;
    // rengin değiştirilmesi gerekiyor..bunu yapmak için state'e ihtiyaç var...

  }, []);
  return (
    <div className="App" style={{backgroundColor:activeColor}}>
     <Palette activeColor={activeColor}/>
    </div>
  );
}

export default App;
