import Header from './components/Header'
import React from 'react'
import MyComponent from './components/MyComponent';
// function App() {
//
//   return (
//     <div className="container">
//     <Header />
//
//     </div>
//
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MyComponent title="React" />
      </div>
    );
  }
}

export default App;
