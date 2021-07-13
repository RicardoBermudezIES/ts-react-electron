import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import fs from 'fs';
import paths from 'path';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme/Theme';
import { router } from './router';
import DataProvider from './context/Context';


// const Hello = () => {
//   return (
//     <div>
//       <Box className="Hello">
//         <img width="200px" alt="icon" src={icon} />
//       </Box>
//       <h1>electron-react-boilerplate</h1>
//       <div className="Hello">
//         <Button
//           variant="contained"
//           color="primary"
//           type="button"
//           onClick={() => {
//             let archivo = fs.readFileSync(
//               paths.resolve(__dirname, './config.json'),
//               'utf-8'
//             );
//             console.log(JSON.parse(archivo));
//             console.log(
//               'Esto se muestra después de haber leído el achivo2.txt por el readFileSync'
//             );
//           }}
//         >
//           <span role="img" aria-label="books">
//             📚
//           </span>
//           Read our docs
//         </Button>
//         <button type="button">
//           <span role="img" aria-label="books">
//             🙏
//           </span>
//           Donate
//         </button>
//       </div>
//     </div>
//   );
// };

export default function App() {

  return (
    <DataProvider>
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          {router.map((route, i) => (
            <Route key={i} path={route.path}  component={route.component} />
          ))}
        </Switch>
      </ThemeProvider>
    </Router>
    </DataProvider>
  );
}
